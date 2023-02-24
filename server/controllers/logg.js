import { fetchJSON } from '../utills/helpers';


const client_id = process.env.CLIENT_ID;
const scope = "openid";

if (!client_id) {
  throw new Error("Must setup CLIENT_ID environment");
}


export const loginGoogleinfo = async (req, res) => {
    const { access_token } = req.signedCookies;

    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  
    res.json(userinfo);
};

export const loginGoogle = async (req, res) => {
    const { access_token } = req.body;
    res.cookie("access_token", access_token, { signed: true });
    res.sendStatus(200);  
};


export const logout = async (req, res) => {
    const logout = await fetchJSON('https://www.google.com/accounts/Logout');
    res.cookie("access_token", null, { signed: false });
    res.sendStatus(200);
};