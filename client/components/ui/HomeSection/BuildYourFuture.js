import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import learningMethodolgies from "../../../assets/learning-methodolgies.png";

import { useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

const BuildYourFuture = ({}) => {
  const { t } = useTranslation('home');

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  

  const titles = [
    t('strategies_topics_1'),
    t('strategies_topics_2'),
    t('strategies_topics_3'),
    t('strategies_topics_4'),
  ]

  return (
        <Grid container
          direction={matchesSM ? 'column-reverse' : undefined}
        >

            <Grid item container
                sx={{
                    maxWidth: matchesSM ? '100%': '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: matchesSM ? '2rem 3rem' : matchesMD ? '1.5rem' :'3rem',
                    boxShadow: matchesSM ? undefined :  '1px 0px 3px #333'
                }}
            >
                <Grid item sx={{}}>
                  <Image 
                    src={learningMethodolgies.src}
                    alt=""
                    width={matchesSM ? 280 : 320}
                    height={matchesSM ? 280 : 320}
                    loading="lazy"
                  />
                    
                </Grid>
            </Grid>

          <Grid item container
            direction="column"
            sx={{
              justifyContent: 'space-around',
              alignItems: 'center',
              color: '#5d7e8a',
              maxWidth: '50%',
              paddingTop: matchesSM ? '3rem' : undefined,
              boxShadow: matchesSM ? undefined : '0px 0px 1px #333, 0px 1px 3px #333 inset'
            }}
          >
           
           
              

              <Grid item container 
              sx={{flexGrow: 1, padding: '0 3rem', 
              alignItems: 'center', 
              justifyContent: 'space-around', 
              textAlign: 'center'
              }}>
                  <Typography variant="h2">
                    {t('strategies_title')}
                  </Typography>

                  {titles && titles.map((title, index) => (
                  <Typography key={index} variant="h4"
                    sx={{
                      margin: '1.2rem auto'
                    }}
                  >
                    {title}
                  </Typography>
                  ))}
                
              </Grid>
                  
          </Grid>


        </Grid>
  );
}



export default BuildYourFuture;