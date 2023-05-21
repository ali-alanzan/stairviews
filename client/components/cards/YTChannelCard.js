import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useScript from 'react-script-hook';
import { CircularProgress } from '@mui/material';


const gapiYt =  {
  ytsubscribe: {
    container: "",
    parameters: {'channel': "", 'layout': ""}
  }
}

const styled = `
#main-app-bar-header {
  display: none !important;
}
* {
  background-color: rgba(0, 0, 0, 0.87) !important;
}
.css-yrf2vu-MuiPaper-root {
  min-height: 30px;
}

.g-ytsubscribe {
  z-index:99999;
}
`;

const YTChannelCard = observer(({ youtubeChannel }) => {
    const [gapiLoading, gapiError] = useScript({ src: 'https://apis.google.com/js/platform.js'});

    useEffect(() => {
        if (!youtubeChannel) {
            return;
        }
        
        if (gapiLoading || gapiError) {
            return;
        }  
    }, [youtubeChannel, gapiLoading, gapiError]);

    return (
        <>
          <style>{styled}</style>
          <div 
            className="g-ytsubscribe"
            data-channelid={youtubeChannel}
            data-layout="full"
            data-theme="dark"
            data-count="default">
            <CircularProgress />
        </div>
        </>
    );
});

export default YTChannelCard;