import { fetchJSON, randomString } from '../../client/components/utills/helpers';
// import axios from 'axios';
import User from '../models/user';
import { hashPassword, comparePassword } from '../utills/auth';

const client_id = process.env.CLIENT_ID;
const scope = "openid";

if (!client_id) {
  throw new Error("Must setup CLIENT_ID environment");
}

export const joinGoogle = async (req, res) => {
  const client_url = process.env.CLIENT_URL;
  // console.log(process.env.CLIENT_URL);
  const parameters = {
    response_type: "token",
    client_id,
    scope: "email profile https://www.googleapis.com/auth/youtube",
    redirect_uri: client_url + "/login/callback",
  };
  // https://www.googleapis.com/auth/youtube.force-ssl
  // console.log(authorization_endpoint, parameters);
  res.json(parameters);
}

export const loginGoogleinfo = async (req, res) => {
    const access_token  = req.query.token.trim();
    let userinfo = {};
    const userinfo_endpoints = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const userinfo_endpoint = userinfo_endpoints.data.userinfo_endpoint;
    // console.log(access_token);

    if(access_token) {
      try {
        await fetchJSON(userinfo_endpoint, {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          if(response.data != undefined) {
            userinfo = response.data;
          }
        });

        console.log(userinfo);
        if(userinfo.email != undefined) {
          let hashedPassword="";
          let password="";
          try {

                //  console.log(req.body);
                  const { name, email, sub } = userinfo;
                  password = sub+access_token+randomString(50)+String(Date());
                  let userExist = await User.findOne({email}).exec();
                  
                  // hash password
                  hashedPassword = await hashPassword(password);

                  console.log("userExist", userExist)
                  if(userExist === null) {            
                    // register 
                    const user = new User({
                      name, email, password: hashedPassword, userinfo
                    });
                    await user.save();
                  } else {
                    // update password
                    // userExist
                      const user = User.findOneAndUpdate({
                        email
                    }, {
                        password: hashedPassword
                    }).exec();
                  }
              } catch(err) {
                 console.log(err);
              }

          const userExistToResponse = await User.findOne({email: userinfo.email}).exec();
          userinfo = {...userinfo, password, id: userExistToResponse._id}
        }
      } catch(err) {
        userinfo = {}
        console.log("err", err);
      }
    }

    res.json(userinfo);
};

export const loginGoogle = async (req, res) => {
    const { access_token } = req.body;
    console.log(access_token);
    res.cookie("access_token", access_token);
    res.sendStatus(200);  
};


export const logout = async (req, res) => {
    const logout = await fetchJSON('https://www.google.com/accounts/Logout');
    res.cookie("access_token", null, { signed: false });
    res.sendStatus(200);
};


export const subscriptionInsert = async (req, res) => {
  const access_token  = req.body.token.trim();
  let responseInfo = {};
  const subscribe_endpoint = "https://youtube.googleapis.com/youtube/v3/subscriptions";
  const options = {
    
  };
  // console.log(access_token);

  if(access_token) {
    try {
      await fetchJSON(subscribe_endpoint, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
        parameters: {
          key: process.env.API_KEY,
          part: ["id","snippet"],
          channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
          access_token: access_token
        }
      })
      .then((response) => {
        if(response.data != undefined) {
          responseInfo = response.data;
        }
        console.log("then response "+response);
      });

   
    } catch(err) {
      responseInfo = err;//{}
      console.log(err);
      // console.log("err", err);
    }
  }

  res.json(responseInfo);
};