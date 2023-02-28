import * as React from 'react';
import {Box, useMediaQuery} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/styles';

import vrRoom from '../../../assets/vr-room.jpg';
import vrCharacter from '../../../assets/vr-character.png';
import { Divider } from '@mui/material';


import { useTranslation } from 'next-i18next';


export default function VrSectionStory({}) {
    const { t } = useTranslation('home');


    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    
    const quotes = [
        -25,
        -20,
        -15,
        -10,
        -5,
        0
    ]

    
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      <Grid container
        id="vr-cn0gn-244"
        direction={matchesSM ? 'column-reverse': undefined}
        sx={{
            backgroundImage: `url(${vrRoom.src})`,
            position: 'relative',
            backgroundSize: '90%',
            backgroundPosition: '100% 78%',
            height: matchesSM ?  '100vh': '80vh',
            backgroundOrigin: 'center center',
            backgroundAttachment:'fixed'
        }}
      >
        <Grid item
            sx={{
                width: matchesSM ? '100%' : '50%',
                height: '100%',
                backgroundColor: 'rgb(42 44 59 / 87%)',
            }}
        >
            <Grid container 
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    height: "100%",
                    position: 'relative'
                }}
            >

                
                <img 
                    src={vrCharacter.src} 
                    style={{
                        maxWidth: '100%', 
                        position: 'absolute',
                        bottom: matchesSM ? '10px': matchesMD ? '-10px': '-38px',
                        left: 0
                
                    }}
                    alt={"Vr environment character"}
                />
                <Box sx={{
                    position: 'absolute',
                    height: '55px',
                    width: '100%',
                    bottom: 0,
                    backgroundColor: 'rgb(37 67 68)',
                    opacity: .5,
                    borderRadius: '35px 35px 0 0',
                }}></Box>

            </Grid>
        </Grid>

        <Grid item 
            sx={{
                width: matchesSM ? '100%': '50%',
            }}
        >
            <Grid container sx={{position: 'relative', height: '100%'}}>
                {quotes && quotes.map((element, index) => (
                    <Grid item
                        key={index}
                        sx={{
                            border: `10px solid rgb(${19  * (index+1)} ${20 * (index+1)} ${93  * (index+1)} / ${88 - (index+1)}%)`,
                            height: matchesSM ? '10rem' : '40%',
                            width: matchesSM ? '80%': matchesMD ? '65%' : '24rem',
                            top: matchesSM ? '7rem' : '33%',
                            left: matchesSM ? '10%' : '20%',
                            position: 'absolute',
                            transform: `rotate(${quotes[index]}deg)`,
                            zIndex: index,
                            backgroundColor: (index != quotes.length-1) ? undefined : 'rgb(42 44 59 / 87%)'
                        }}
                    >
                    
                    {(index != quotes.length-1) ? undefined : <Typography component="h4"

                        sx={{
                            fontSize: matchesMD ? '1.3rem': '1.8rem',
                            textAlign: 'center',
                            color: '#e2e2e2',
                            padding: '.7rem 1rem'
                        }}
                    >
                    {t('homevrstory_title_part1')}
                    <Divider />
                    {t('homevrstory_title_part2')}
                </Typography>}

                    </Grid>
                ))}
            </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
