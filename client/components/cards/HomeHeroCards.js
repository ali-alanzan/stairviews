import {useState} from 'react';
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import RocketLaunch from '../../assets/person-rocket-launch.jpeg'
import VrpanoIcon from '@mui/icons-material/Vrpano';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import { useTheme } from '@mui/styles';

import { useTranslation } from 'next-i18next';


const stylesIcons = {
    fontSize: '4.44rem',
    color: '#e2e2e2'
}




const HomeHeroCards = ({
    
    }) => {
        const { t } = useTranslation('home');

        const theme = useTheme();
        const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
        const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
        const [values, setValues] = useState({
            title: 'Learning how to learn, Be A Top Learner',
            cards: [
                {
                    title: t('herocards_one'),
                    icon: <VrpanoIcon sx={{...stylesIcons}} />,
                },
                {
                    title: t('herocards_two'),
                    icon: <VolunteerActivismIcon sx={{...stylesIcons}} />,
                },
                {
                    title: t('herocards_three'),
                    icon: <CastForEducationIcon sx={{...stylesIcons}} />,
                }
            ]
        });
    
        
   

    return (
            <Paper
                sx={{
                flexGrow: 1,
                height: "100%",
                backgroundImage: `url('${RocketLaunch.src}')`,
                backgroundSize: 'cover',
                backgroundPosition: '0% 40%',
                backgroundAttachment: 'fixed',  
                marginTop: -1
                }}
            >
                <Grid container 
                        sx={{
                            justifyContent: 'space-around',
                            width: '100%',
                            height: '100%',
                            padding: matchesSM ? "4rem 1rem": "4rem 1rem",/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#20053a+0,170920+50,20053a+100 */
                            background: "-moz-linear-gradient(45deg,  rgba(23,9,32,1) 0%, rgba(23,9,32,0.89) 0%, rgba(28,11,39,0.87) 68%, rgba(35,13,48,0.87) 81%, rgba(44,17,60,1) 99%, rgba(44,17,61,1) 100%)",
                            background: "-webkit-linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                            background: "linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#170920', endColorstr='#2c113d',GradientType=1 )",
                        }}
                    >
                
                    
                   
                   {values.cards && values.cards.map((element, index) => (
                    <Grid item  key={index}
                        sx={{
                            width: matchesSM ? "100%"  : matchesMD ? '100%' : '31.5%',
                            backgroundColor: 'rgb(29 10 43 / 79%)',
                            padding: matchesSM ? "2rem 1rem": "3rem 1rem",
                            margin: matchesSM ? "1rem auto": undefined,
                            
                        }}
                    >
                        <Grid item container sx={{justifyContent: "center", alignItems: 'center'}}>
                            {element.icon}
                        </Grid>
                        <Typography variant="h3"
                                sx={{
                                    width: "100%",
                                    padding: "1rem 0",
                                    borderRadius: '8px',
                                    fontSize: "3rem",
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    color: "#e2e2e2",
                                }}
                                >
                                {element.title}
                        </Typography>
                    </Grid>

                   ))}


                  

                </Grid>

            </Paper>
    )
}

export default HomeHeroCards;