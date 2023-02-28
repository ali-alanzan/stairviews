import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useMediaQuery} from '@mui/material';
import Typography from '@mui/material/Typography';
import AddModeratorIcon from '@mui/icons-material/AddModerator';

import usersShare from "../../../assets/users-share.png";
import multiAccounts from "../../../assets/bg-multi-accounts.png";
import { useTheme } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

export default function MultiAccountSection({documentLoading}) {
  
  
  const { t } = useTranslation('home');

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  

  return (
        <Grid container
          direction={matchesSM ? 'column' : undefined}
          sx={{
            
          }}
        >
          <Grid item container
            direction="column"
            sx={{
              justifyContent: 'space-around',
              alignItems: 'center',
              color: '#5d7e8a',
              maxWidth: matchesSM ? '100%':'50%',
              padding: matchesSM ? '3rem 1rem': undefined,
              boxShadow: matchesSM ? undefined: '0px 1px 2px #333, 0px 2px 3px #333 inset'
            }}
          >
              <Grid item>
                  <Typography variant="h1"
                          sx={{
                              fontSize: "3rem",
                              fontWeight: 600,

                          }}
                          >
                          
                  </Typography>
              </Grid>
              {documentLoading ? <> 
                  <Skeleton width={matchesSM ? '100%' : "32%"} height='10vh' sx={{backgroundColor: '#313c5c'}} />
                  <Skeleton width={matchesSM ? '100%' : "32%"} height='30vh' sx={{backgroundColor: '#313c5c'}} />
                  <Skeleton width={matchesSM ? '100%' : "32%"} height='10vh' sx={{backgroundColor: '#313c5c'}} />
                </> :<><Grid item>
                <Typography variant="h1"
                        sx={{
                            fontSize: "3rem",
                            fontWeight: 600,
                            textAlign: matchesSM ? 'center' : undefined,
                        }}
                        >
                        {t('multiaccounts_title')}
                </Typography>
            </Grid>
            
            <Grid item container 
              sx={{
                backgroundImage: `url('${multiAccounts.src}')`,
                backgroundSize: 'cover',
                height: '220px',
                width: '220px',
                alignContent: 'center',
                justifyContent: 'center'
              }}
            
            >
              <AddModeratorIcon sx={{fontSize: '5.8rem'}} />
            </Grid>

            <Grid item>
                <Typography variant="h3"
                        sx={{
                            fontWeight: 600,
                            textAlign: matchesSM ? 'center' : undefined,
                        }}
                        >
                        {t('multiaccounts_slug')}
                </Typography>
            </Grid>
            </> }
              
                  
          </Grid>

          <Grid item container
            sx={{
              maxWidth: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: matchesSM ? '4rem': '4rem 1rem',
              boxShadow: '-1px 0px 3px #333'
            }}
          >
              <Grid item>
                {documentLoading ? <>
                  <Skeleton width={matchesSM ? '80vw' : "32%"} height={matchesSM ? '50vh' : "60vh"} sx={{backgroundColor: '#313c5c'}} />
                
                </>: 
                
                <Image 
                  src={usersShare.src}
                  width="300"
                  height="270"
                  loading="lazy"
                /> }
              </Grid>
          </Grid>
        </Grid>
  );
}
