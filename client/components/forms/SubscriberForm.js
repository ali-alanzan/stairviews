import React, { useEffect } from 'react';
import axios from 'axios';
import {useGoogleApi } from 'react-gapi'

import { Button } from '@mui/material';
import { fetchJSON , getCookie} from '../utills/helpers';

const SubscriberForm = () => {
  const token = getCookie("access_token");
  const handleEventSubscribeApi = async () => {
    console.log(getCookie("access_token"));
    const form_data = {
      token
    };

    await axios.post('/api/subscription-insert', form_data).then(response => {
      console.log("response", response);
    }).catch(error => {
      console.log("error", error);
    });
    
  }


  return (<>
    <Button variant="contained" component="span" 
        sx={{
            backgroundColor: "#27b044",
            width: '80%',
            margin: "0 10px"
        }}
        onClick={handleEventSubscribeApi}
        >
        Add video
    </Button>
  </>);
}




export default SubscriberForm;