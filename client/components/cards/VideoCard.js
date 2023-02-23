
// js
import React, { useEffect } from 'react';
import YouTube from 'react-youtube';


const VideoCard = ({videoId}) => {
  const [player, setPlayer] = React.useState({getCurrentTime: function() {return 0;}});
  const [time, setTime] = React.useState(0);
    useEffect(() => {
      setTime(player.getCurrentTime());
      console.log(time);
    }, [player, player.getCurrentTime()])
    
    
    const  videoOnReady = (event) => {
      setPlayer(event.target);

      const player = player;
      // access to player in all event handlers via event.target
      // event.target.pauseVideo();
       // event.target.playVideoAt(50); 50
      //  player.seekTo(50)
      //  console.log("state", this.state);
       console.log("ready", player);
      //  console.log(event);

    }

    const videoOnPlay = (event) => {
      const player = event.target;
      console.log("play", player);
    }

    const videoOnStateChange = (event) => {
      const player = event.target;
      console.log("state", player.getCurrentTime());
      console.log(time);
      var currentTimeInterval = document.querySelector("#currentTimeInterval");
      if( Number(currentTimeInterval.value) <= 0 ) {
        currentTimeInterval.value = setInterval(function () {
          console.log("interval", player.getCurrentTime());
        }, 1000, player, currentTimeInterval);
      }

    }



    // componentWillUnmount(event) {
    //   // console.log(player);
    //   // console.log(player.getCurrentTime());
    // }

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    
    return (
      <>
        <input type="hidden" id="currentTimeInterval" value="0" />
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onReady={videoOnReady} 
          onPlay={videoOnPlay} 
          onStateChange={videoOnStateChange} 
        />
      </>
    );
}

export default VideoCard;
