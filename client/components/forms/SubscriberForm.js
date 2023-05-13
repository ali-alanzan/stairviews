import React, { useEffect } from 'react';
import axios from 'axios';
import {useGoogleApi } from 'react-gapi'

import { Button } from '@mui/material';
import { fetchJSON , getCookie} from '../utills/helpers';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { toast } from 'react-toastify';


const SubscriberForm = ({id, handleEventUnSubscribeApi, handleEventSubscribeApi}) => {
  // const [subscribed, setSubscribed] = React.useState(!id ? false : true);
  const [subscribed, setSubscribed] = React.useState(true);



  if(!id) {
    return <></>;
  }

  return (<>
  {id}
    <Button variant="contained" component="button" 
        sx={{
            backgroundColor: subscribed ? "gray": "#FF0000",
            padding: "3px 25px",
            margin: "0 10px",
            borderRadius: "20px 0 0 20px"
        }}
        onClick={subscribed ? handleEventUnSubscribeApi : handleEventSubscribeApi}
        endIcon={<YouTubeIcon /> }
        id="channel-btn"
        data-channelid={id}
        >
          {}
        {subscribed ? "UnSubscribe" : "Subscribe"}
    </Button>
  </>);
}




export default SubscriberForm;