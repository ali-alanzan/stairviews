import Hero from "../components/ui/Hero"

import React, { useEffect } from 'react';
import {Context} from '../context';
import {useRouter} from 'next/router';

import axios from 'axios';
import {toast} from 'react-toastify';

import Link from 'next/link';
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import TextField from '@mui/material/TextField';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


import airplane from '../assets/send.svg';
import CircularProgress from '@mui/material/CircularProgress';



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


    const [name, setName] = React.useState("");
    const [nameHelper, setNameHelper] = React.useState("");

    const [email, setEmail] = React.useState("");
    const [emailHelper, setEmailHelper] = React.useState("");

    const [password, setPassword] = React.useState("");
    const [passwordHelper, setPasswordHelper] = React.useState("");


    const [passwordConf, setPasswordConf] = React.useState("");
    const [passwordHelperConf, setPasswordHelperConf] = React.useState("");

    const [open, setOpen] = React.useState(false);
    
    const [loading, setLoading] = React.useState(false);


    const router = useRouter();    

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConf, setShowPasswordConf] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordConf = () => {
        setShowPasswordConf(!showPasswordConf);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onChange = event => {
        let valid, valid1, valid2, valid3;
        
        switch(event.target.id) {
            case 'email':
                setEmail(event.target.value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
                if(!valid) {
                    setEmailHelper("Invalid E-mail");
                } else {
                    setEmailHelper("");
                }
                break;
            case 'password':
                setPassword(event.target.value);
                console.log(password, event.target.value)

                valid = /[A-Z]/g.test(event.target.value);
                valid1 = /[a-z]/g.test(event.target.value);
                valid2 = /[0-9]/g.test(event.target.value);
                valid3 = /[^A-z0-9]/g.test(event.target.value);
                
          //      console.log(value, valid, valid1, valid2, valid3)
                if(!valid || !valid1) {
                    setPasswordHelper("Your password must include more one characters ( A-z )");
                }  else if(!valid2) {
                    setPasswordHelper("Your password must include a number");
                }  else if(!valid3) {
                    setPasswordHelper("Your password must include unique character");
                } else {
                    setPasswordHelper("");
                }
                break;
            case 'password_conf':
                setPasswordConf(event.target.value);
                if(password !== event.target.value) {
                    setPasswordHelperConf("Password Confirmation does not match your password");
                } else {
                    setPasswordHelperConf("");
                }
                break;
            default:
                break;
        }
    }

    const onConfirm = () => {
        
    }



    const  {state, dispatch} = React.useContext(Context);
    const {user} = state;
    useEffect(() => {
        if (user !== null) {
            router.push("/");
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name.length < 1 || email.length < 1 || password.length < 1 || passwordConf.length < 1) {
            toast("Messing Required fields");
            return;
        }
        try {
        
            setLoading(true);

            const {data} = await axios.post('/api/register', {
                    name, email, password
            });
            // console.log("Register response", data);
            toast.success("Registration successful. Please login");
            setLoading(false);
        } catch (err) {
            toast(err.response.data);
            setLoading(false);
        }
    }

    return(
        <>
        <Hero title="Register" />
        <Grid item container direction="column" alignItems="center" 
            justifyContent="center" 
            style={{
                marginBottom: matchesMD ? "5em" : 0, 
                marginTop: matchesSM ? "1em" : matchesMD ? "5em" : '3rem',
            }}
            >

            <Grid item
                sx={{width: matchesSM ? '80%' : matchesMD ? '60%' : '22rem'}}
            >
                <Grid item container direction="column">
                <form onSubmit={handleSubmit}>
                    
                    <Grid item container direction="column" style={{maxWidth: matchesSM ? '100%' : "20em"}}>

                        <Grid item style={{marginBottom: ".5em"}}>
                            <TextField label="Name" fullWidth id="name" 
                                variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Grid>
                        <Grid item style={{marginBottom: ".5em"}}>
                            <TextField label="Email" error={emailHelper.length !== 0} 
                                helperText={emailHelper}
                                fullWidth id="email" variant="standard" value={email} 
                                onChange={onChange} />
                        </Grid>
                        <Grid item style={{marginBottom: ".5em"}}>
                            <TextField label="Password" id="password"
                            error={passwordHelper.length !== 0} 
                                helperText={passwordHelper}
                                fullWidth
                                type={showPassword ? 'text' : 'password'}  
                                variant="standard"  value={password} 
                                onChange={onChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                        </Grid>


                        <Grid item style={{marginBottom: ".5em"}}>
                            <TextField label="Password Confirmation" 
                            id="password_conf"
                            error={passwordHelperConf.length !== 0} 
                                helperText={passwordHelperConf}
                                fullWidth
                                type={showPasswordConf ? 'text' : 'password'}  
                                variant="standard"  value={passwordConf} 
                                onChange={onChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConf}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPasswordConf ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                        </Grid>
                    

                    </Grid>


                    <Grid item container justifyContent="center" style={{marginTop: "2em"}}>
                        <Button 
                            type="submit"
                            disabled={nameHelper.length !== 0  || emailHelper.length !== 0 || passwordHelper.length !== 0 }
                            variant="contained"
                            sx={{
                                ...classes.sendButton
                            }}>

                            {
                                loading ? <CircularProgress />
                                : <> 
                                Register <img src={airplane.src} alt="paper airplan" style={{marginLeft: "1em"}} />
                                </>
                            }
                        </Button>

                    </Grid>

                    <Grid item container justifyContent="center" style={{margin: "2em auto"}}>
                        <Typography variant="body1" align="center">
                            Already registered? <Link href="/login"> Login </Link>
                        </Typography>
                    </Grid>
                </form>


                </Grid>
            </Grid>

        </Grid>

               

        </>
    )
}
