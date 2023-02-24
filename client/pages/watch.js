import Hero from "../components/ui/Hero"
import React, { useEffect, useState } from 'react';
import UserRoute from '../components/routes/UserRoute';
import {Context} from '../context';
import {useRouter} from 'next/router';

import axios from 'axios';
import {toast} from 'react-toastify';

import YTVideo from "../components/cards/YTVideo";
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Grid } from "@mui/material";
import Script from 'next/script'


const useStyles = (theme) => {
    return {
        sendButton: {
            ...theme.typography.estimate,
            borderRadius: 50,
            height: 45,
            width: 245,
            fontSize: "1rem",
            backgroundColor: theme.palette.common.orange,
            "&:hover": {
                backgroundColor: theme.palette.secondary.light
            },
             md: {
                height: 40,
                width: 225
            }
        }
    }
};




export default function Register(props) {
    
    const theme = useTheme();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    
    const classes = useStyles(theme);

    const router = useRouter();    



    const  {state, dispatch} = React.useContext(Context);
    const {user} = state;

    const [current, setCurrent] = useState(0);
    const [videos, setVideos] = useState([
        {videoId: "2g811Eo7K8U"},
        {videoId: "c7ZZ04Yo7lw"},
        {videoId: "cgk1VJM_Bj8"}
    ]);
    const [players, setPlayers] = useState([]);

    const listenToScrollArea = () => {
        var area = document.querySelector("#slider-container-scrollarea");
        area.setAttribute("current-watch", 0);
        area.setAttribute("current-scroll", 0);
        area.onscroll = function () {
            var 
            area = document.querySelector("#slider-container-scrollarea"),
            c = Math.floor(area.scrollTop / area.children[1].clientHeight);
            area.setAttribute("current-watch", c);
            setCurrent(c);
        }
    }
    useEffect(() => {
        listenToScrollArea();
    }, []);

    const style = `
        * {
            overflow: hidden;
        }

        /* Track */
        *::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #fff; 
          border-radius: 10px;
        }
         
        /* Handle */
        *::-webkit-scrollbar-thumb {
          background: #fff; 
          border-radius: 10px;
        }
        
        /* Handle on hover */
        *::-webkit-scrollbar-thumb:hover {
          background: #fff; 
        }

        .youtube-card-container, .youtube-card-container * {
            width: 100%;
            height: 90%;
        }

        .gyt-cont {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
        }
    `;

    return(
        <UserRoute>
          <Script src="http://apis.google.com/js/platform.js"/>
                <style>{style}</style>
        <Grid container
            // slider container
                sx={{
                    width: "100%",
                    height: "100vh",
                    marginTop: "10px !important",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                    scrollBehavior: "smooth",
                    overflowStyle: "none"    
                }}
                id="slider-container-scrollarea"
            > 
            

                {videos.map((video, i) => (
                    <Grid container 
                        key={i}
                        sx={{
                            height: "100%",
                            width: "100%",
                            margin: "0 auto",
                            scrollSnapAlign: "start",
                            position: "relative",
                            border: "1px solid transparent",
                        }}
                    >
                        <Grid sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            width:"100%",
                            height: "100%",
                            }}
                        >
                            <YTVideo videoId={video.videoId} loop={i} players={players} setPlayers={setPlayers} current={current} setCurrent={setCurrent} />
                        </Grid>
                    </Grid>
                ))}
               
            </Grid>

        </UserRoute>
    )
}
