import {useState} from 'react';
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';

import HeroImageSideBackground from '../../../assets/rocket-hero-side-bg.jpg'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Stairs from '../../../assets/walking-man-in-stairs.svg'
import { useTheme } from '@mui/styles';
import Image from 'next/image'
import ContinueToAccount from './ContinueToAccount';

import YTRaise from  '../../../assets/sprout-social-social-youtube-monetization.svg';

const handeGoBottom = (e) => {
    let offsetGo = 0;
    if(window.innerHeight > 0) {
        offsetGo = (window.scrollY+window.innerHeight)-50
    } else {
        offsetGo = window.innerHeight-50
    }
    window.scrollTo({
        top: offsetGo,
        left: '',
        behavior: 'smooth'
    });
    e.target.style.position = 'relative';
}

const HomeHero = ({   
    documentLoading 
    }) => {

        const [values, setValues] = useState({
            title: 'Learning..: How to Learn, By Learn',
        });

   
        const theme = useTheme();
        const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

        const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid container
            sx={{
                flexGrow: 1,
                width: '100%',
                height: '100%',
                padding:  matchesSM ? '2.5rem 1rem' : matchesMD ? "1rem 3rem" : "1rem 7rem",/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#20053a+0,170920+50,20053a+100 */
                background: "-moz-linear-gradient(45deg,  rgba(23,9,32,1) 0%, rgba(23,9,32,0.89) 0%, rgba(28,11,39,0.87) 68%, rgba(35,13,48,0.87) 81%, rgba(44,17,60,1) 99%, rgba(44,17,61,1) 100%)",
                background: "-webkit-linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                background: "linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#170920', endColorstr='#2c113d',GradientType=1 )",
                flexDirection: matchesSM ? 'column' : "row"
            }}
        >
            
        
                <Grid item >
                    <ContinueToAccount  />
                </Grid>
                <Grid item>
                    <Image 
                        src={Stairs.src}
                        width="343"
                        height="343"
                        alt={values.title}
                        loading="lazy"
                    />
                </Grid>
                
                <Grid item>
                    <Image 
                        src={YTRaise.src}
                        width="343"
                        height="343"
                        alt={values.title}
                        loading="lazy"
                    />
                </Grid>
        </Grid>
    )
}

export default HomeHero;