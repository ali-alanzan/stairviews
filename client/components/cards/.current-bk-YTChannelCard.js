
// js
import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { Grid } from "@mui/material";
import Script from 'next/script';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
// import { MyDriveComponent } from '../forms/MyDriveComponent.js'
import SubscriberForm from '../forms/SubscriberForm.js';




const YTChannelCard = ({ channelId }) => {

    useEffect(() => {
       
    }, []);
    
    const  videoOnReady = (event) => {
      setPlayer(event.target);

      // const player = player;
      // access to player in all event handlers via event.target
      // event.target.pauseVideo();
      //  player.seekTo(50)
      //  console.log("state", this.state);
      //  console.log("ready", player);
      //  console.log(event);

    }

    const videoOnStateChange = (event) => {
      const player = event.target;
      console.log("state", player.getDuration());
      console.log(player.videoTitle);
      if(!player.videoTitle) {
        setError(true);
      }
    }

    const handleOnClickSubscribe = () => {

    }

    const opts = {
      height: '190',
      width: '440',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
      origin: "https://www.youtube.com"
    };
  


    return (
      <Grid container>
        <Script src="http://apis.google.com/js/platform.js"/>
        <Grid item sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
        }}
        className="youtube-card-container">
        </Grid>
        <Grid item>
        <Typography gutterBottom variant="h5"
          sx={{
              margin: 0,
          }}
        >
          Please be sure this is your channel
        </Typography> 
          <div className="g-ytsubscribe" data-channel="GoogleDevelopers" data-layout="full" data-count="default"></div>
        </Grid>
      </Grid>
    );
}

//clientID: 854452941545-f2nmavdc2l2pkgetv76dsvhtdr8o0hne.apps.googleusercontent.com
//clientID: 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
//clientID: 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



export default YTChannelCard;
