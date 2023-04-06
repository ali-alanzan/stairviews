
// js
import { Typography} from '@mui/material';
import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { Grid } from "@mui/material";
import Script from 'next/script'

const YTAddVideoCard = ({
  videoId, error, errorText, account, setError,
  player,
  setPlayer,
  videoTitle,
  setVideoTitle,
  duration,
  setDuration,
  setAddedVideoBtn,
  videos
}) => {

    useEffect(() => {
      // console.log(player, player.videoTitle, player.getCurrentTime(), player.getDuration());
      
      // setVideoTitle(player.videoTitle);
      // setDuration(player.getDuration());
      // console.log(videoTitle, duration);
      if(player.videoTitle == undefined || player.videoTitle.length > 0 || Number(player.getDuration()) > 0 ) {
        setError(true);
      } else {
        setDuration(player.getDuration());
        setVideoTitle(player.videoTitle);
      }
    }, [player]);
    
    const addVideoToST = (account) => {
      // account
      var data = {videoTitle, duration, videoId, account}
    }
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


    const opts = {
      height: '190',
      width: '440',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
      origin: "https://www.youtube.com"
    };
    if( videoId.length == 0 ) {
      return <>
        <Typography variant="h5"
                sx={{

                }}
                >
              Please add Youtube video URL
        </Typography>
      </>
    }
    if( error && (player.videoTitle == undefined)   ) {
      console.log(player);
      return <>
        <Typography variant="h5"
                sx={{

                }}
                >
              {/* {JSON.stringify(player)} */}
              {errorText}
        </Typography>
      </>
    } else {
      setDuration(player.getDuration());
      setVideoTitle(player.videoTitle);
      setAddedVideoBtn(true);
    }

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
          
          {videoId.length > 3 ? <>
            <YouTube 
              videoId={videoId} 
              opts={opts} 
              onReady={videoOnReady} 
              onStateChange={videoOnStateChange} 
              props={{
                shoInfo: 0
              }}
            />
          </>: <></>}
          
        
        </Grid>
        <Grid item>
          <Typography variant="body2"
                  sx={{

                  }}
                  >
                  Title: {videoTitle}
          </Typography>
          <Typography variant="body2"
                  sx={{

                  }}
                  >
                  Duration: {duration}
          </Typography>
        </Grid>
      </Grid>
    );
}

//clientID: 854452941545-f2nmavdc2l2pkgetv76dsvhtdr8o0hne.apps.googleusercontent.com
//clientID: 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
//clientID: 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



export default YTAddVideoCard;
