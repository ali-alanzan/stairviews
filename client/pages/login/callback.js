import {useContext, useEffect, useState} from 'react';
import {Context} from '../../context';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { Router } from 'next/router';
import {useRouter} from 'next/router';


const LoginCallback = () => {

    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(async () => {
        const { access_token } = Object.fromEntries(
          new URLSearchParams(window.location.hash.substring(1))
        );

        console.log(access_token);
    
        if (access_token) {
          const res = await fetch("/api/logingoogle", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ access_token }),
          });
          if (res.ok) {
            window.location.replace(window.location.origin);
          } else {
            setError(`Failed ${res.status} ${res.statusText}`);
          }
        }
        // const res = await fetch("/api/logingoogle", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify({ access_token }),
        // });
        // console.log(res)
        // if (res.ok) {
        //   window.location.replace(window.location.origin);
        // } else {
        //   setError(`Failed ${res.status} ${res.statusText}`);
        // }
        // location.replace("/");
      });
      

    return (
        <Box
            sx={{ height: '100vh !important',            
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "inherit",
            }}
            >
              {error == "" ? <CircularProgress /> : error}
        </Box>
    )
};

export default LoginCallback;