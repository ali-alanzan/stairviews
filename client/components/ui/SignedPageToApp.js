import * as React from 'react'; 
import { Grid, Typography } from "@mui/material";
import HomeHero from './HomeSection/HomeHero';
import MyAccountForm from '../forms/MyAccountForm';

const SignedPageToApp = ({signedApp, setSignedApp}) => {
    const [addedChannelId, setaddedChannelId] =React.useState("");

    const authenticate =() => {

        return gapi.auth2.getAuthInstance()
                .signIn({
                    scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
                })
                .then(function () {
                    console.log("sign in successful");
                    setSignedState(true);
                    
                }, function (err) {
                    
                });
                loadClient();
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



    // console.log(process.env.CLIENT_GOOGLE_ID);
    const loadWindowCheck = () => {
        // console.log(typeof(window), window);
        // window.onload = function() {
            // console.log("loaded");
        // }
        // if(typeof(window) != {} && window != {}) {
            // gapi.load();
            // console.log("asd", gapi);

        // }
        if(window != {}) {
            setTimeout(function () {
                // console.log("load",  window.document, window.location);
                loadClientAuth2Client1();
            }, 1000);
        }
    }
    
    const loadClientAuth2Client1 = () => {
        gapi.load("client:auth2", function () {
            gapi.auth2.init({
                client_id: process.env.CLIENT_ID
            })
        })
    }



    const handleAddYoutubeChannelSubscribe = () => {
        if( !addedChannelId.length > 0 ) {
            setError(true);
            return;
        }
        // console.log(addedChannelId, gapi);
        // return false;
        gapi.client.setApiKey(process.env.API_KEY);

        return gapi.client.youtube.subscriptions.insert({
            part: 'snippet',
            resource: {
                snippet: {
                    resourceId: {
                        kind: "youtube#channel",
                        channelId: addedChannelId
                    }
                }
            }
        })
        .then(function(response) {
            console.log(response)
        }, function (err) {
            console.log(err)
        });
         
    }


    
    return (
        <>
            {!signedApp ? <>
                <HomeHero setSignedApp={setSignedApp} authenticate={authenticate} loadClient={loadClient} loadWindowCheck={loadWindowCheck} loadClientAuth2Client1={loadClientAuth2Client1} />
            </> : <>
                <MyAccountForm addedChannelId={addedChannelId} setaddedChannelId={setaddedChannelId}  handleAddYoutubeChannelSubscribe={handleAddYoutubeChannelSubscribe} />
            </>}
        </>
    )
}



export default SignedPageToApp;