
// js
import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { Grid } from "@mui/material";
import SubscriberForm from '../forms/SubscriberForm';


const YTVideo = ({
  videoId, current, 
  loop, players, setPlayers,
  handleEventUnSubscribeApi,
  handleEventSubscribeApi
}) => {
  const [player, setPlayer] = React.useState({getCurrentTime: function() {return 0;}});
  const [time, setTime] = React.useState(0);

  const listenToScrollArea = function(player, current) {
    var area = document.querySelector("#slider-container-scrollarea");
    area.getAttribute("current-watch", 0);
    area.setAttribute("current-scroll", 0);
    area.setAttribute("prev-player", 0);
    area.onscroll = function () {
      checkMediaPlayer(player, current)
    };
    console.log(players);
    if( players.length > 0 && players[0] != undefined && typeof(players[0].playVideo) == "function" ) {
      // document.querySelector('.currentPlay[value="true"]').parentElement().querySelector("iframe");
        players[0].playVideo();
    }
    
}

    function checkMediaPlayer(player, current) {
      if(player == undefined) {
        return;
      }

      var area = document.querySelector("#slider-container-scrollarea"),
      prev = area.getAttribute("prev-player"),
      c = Math.floor(area.scrollTop / area.children[1].clientHeight),
      currentArea = c >= 0 ? c : 0;

      if( typeof(players[prev].pauseVideo) == "function" ) {
        // document.querySelector('.currentPlay[value="true"]').parentElement().querySelector("iframe");
        players[prev].pauseVideo();
      }
      area.setAttribute("current-watch", c);
      // console.log("11", currentArea, area.children[c].querySelector(".currentLoop")); 
      document.querySelectorAll(".currentPlay").forEach(function (v, i) {
        v.value = false;
      });
      
      console.log("currentArea", currentArea);
      console.log(area.children[currentArea]);
      area.children[currentArea].querySelector(".currentPlay").value = "true";
      // console.log(currentArea, players,  players[currentArea], player);
      // players[currentArea].playVideo();
      // console.log(typeof(players[currentArea].playVideo) == "function");
      // console.log(typeof(players[currentArea].playVideo))
      if( typeof(players[currentArea].playVideo) != undefined && typeof(players[currentArea].playVideo) == "function" ) {
      // document.querySelector('.currentPlay[value="true"]').parentElement().querySelector("iframe");
        players[currentArea].playVideo();
      }
      area.setAttribute("prev-player", currentArea);
    }
    useEffect(() => {
      var newPlayers = [...players];
      newPlayers[loop] = player;
      setPlayers(newPlayers);
      listenToScrollArea(player, current);
      // console.log("current", current);
      setTime(player.getCurrentTime());
      // console.log(time);

    }, [player])
    
    
    const  videoOnReady = (event) => {
      setPlayer(event.target);

      const player = player;
      // access to player in all event handlers via event.target
      // event.target.pauseVideo();
      if( loop == 0 ) {
        event.target.playVideo();
      }
      //  player.seekTo(50)
      //  console.log("state", this.state);
      //  console.log("ready", player);
      //  console.log(event);

    }

    const videoOnPlay = (event) => {
      const player = event.target;
      // console.log(player);
      // console.log("play", player);
    }

    const videoOnStateChange = (event) => {
      const player = event.target;
      // console.log("state", player.getCurrentTime());
      // console.log(player);
      // var currentTimeInterval = event.target.closest(".youtube-card-container").querySelector(".currentTimeInterval");
      // if( Number(currentTimeInterval.value) <= 0 ) {
      //   currentTimeInterval.value = setInterval(function () {
      //     // console.log("interval", player.getCurrentTime());
      //     // console.log("interval", player);
      //   }, 1000, player, currentTimeInterval);
      // }

    }



    // componentWillUnmount(event) {
    //   // console.log(player);
    //   // console.log(player.getCurrentTime());
    // }

    const opts = {
      // height: '390',
      // width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    
    // .video {
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    // }
    
    // .video-content {
    //   padding: 10px;
    //   position: relative;
    //   top: 85%;
    //   color: #fff;
    // }
    
    return (
      <Grid container sx={{
        flexDirection: "column",
        height: "100%",
        scrollSnapAlign: "start",
        position: "relative",
        border: "1px solid transparent",
        position: "relative"
      }}>
        <Grid item sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "90%",
        }}
        className="youtube-card-container">
          <input type="hidden" className="currentTimeInterval" value="0" />
          <input type="hidden" className="currentPlay" value="false" />
          <YouTube 
            videoId={videoId} 
            opts={opts} 
            onReady={videoOnReady} 
            onPlay={videoOnPlay} 
            onStateChange={videoOnStateChange} 
            sx={{
              width: "100%",
              height: "100%"
            }}
            props={{
              shoInfo: 0
            }}
          />
          {/* UC_x5XG1OV2P6uZZ5FSM9Ttw */}
          
        </Grid>
        <Grid item
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "-10px"
          }}
        >
          <SubscriberForm id="UCHQKmIg-hMxC_fgvmHucphQ" handleEventUnSubscribeApi={handleEventUnSubscribeApi} handleEventSubscribeApi={handleEventSubscribeApi} />
        </Grid>
        
      </Grid>
    );
}

//clientID: 854452941545-f2nmavdc2l2pkgetv76dsvhtdr8o0hne.apps.googleusercontent.com
//clientID: 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
//clientID: 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



export default YTVideo;
