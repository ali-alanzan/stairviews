import React, { useEffect } from 'react';
// import {useGoogleApi } from 'react-gapi'
import Script from 'next/script';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';


const SubscriberForm = () => {
  

      const authenticate =() => {

          return gapi.auth2.getAuthInstance()
                  .signIn({
                      scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
                  })
                  .then(function () {
                      console.log("sign in successful");
                      
                  }, function (err) {
                      console.log(err)
                  });
      }

      const loadClient = () => {
          gapi.client.setApiKey(process.env.API_KEY);

          return gapi
              .client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                  .then(function () {
                      console.log("GAPI client loaded successfully"); // -- done
                  }, function (err) {
                      console.log(err);
                  });
          
      }


      return (<>
        <Script src="https://apis.google.com/js/api.js" />
        <Button size="small"
          onClick={() => authenticate().then(loadClient)}
        >
            <Typography gutterBottom variant="h5"
                sx={{
                    margin: 0,
                }}
            >
                Check
            </Typography>
        </Button>
      </>)
}




export default SubscriberForm;