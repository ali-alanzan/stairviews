import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import continueAccounts from '../../../assets/continue-accounts.jpg'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LoginIcon from '@mui/icons-material/Login';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import Link from 'next/link';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const JoinNowArea = () => {

    const color = '#6f3078';

    return (
        <Grid container
            sx={{
                flexGrow: 1,
                backgroundColor: '#39c1e1',
                justifyContent: 'center',
                padding: '2em 0'
            }}
        >
            <Grid item
                sx={{
                    flexGrow: 1,
                    maxWidth: '100%'
                }}
            >
                <Grid container
                    sx={{
                        justifyContent: "space-around"
                    }}
                >
                    <Grid item>
                        <Link href="/register" passHref>
                            <a>
                                <Grid
                                container
                                direction="column"
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    
                                    <HowToRegIcon sx={{fontSize: '10em', color}} />
                                    <Typography variant="h3" sx={{
                                        align: 'center',
                                        color
                                    }}>
                                        New Account
                                        <ArrowForwardIosIcon sx={{fontSize: '2rem'}} />
                                    </Typography>
                                        
                                </Grid>
                            </a>
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link href="/courses" passHref>
                            <a>
                                <Grid
                                container
                                direction="column"
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    
                                    <CastForEducationIcon sx={{fontSize: '10em', color}} />
                                    <Typography variant="h3"
                                        sx={{
                                            color
                                        }}
                                    >
                                        Explore Courses 
                                        <ArrowForwardIosIcon sx={{fontSize: '2rem'}} />
                                    </Typography>
                                        
                                </Grid>
                            </a>
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link href="/login" passHref>
                            <a>
                                <Grid
                                container
                                direction="column"
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    
                                    <LoginIcon sx={{fontSize: '10em', color}} />
                                    <Typography variant="h3"
                                        sx={{
                                            color
                                        }}
                                    >
                                        Login
                                        <ArrowForwardIosIcon sx={{fontSize: '2rem'}} />
                                    </Typography>
                                        
                                </Grid>
                            </a>
                        </Link>
                    </Grid>
        
                </Grid>
            </Grid>
        </Grid>
    )
}
export default JoinNowArea;