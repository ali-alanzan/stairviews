import { useState, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
import MyAccountForm from '../../../components/forms/MyAccountForm';
import axios from 'axios';
import { useTheme } from '@mui/styles';
import MyReportCard from "../../../components/cards/MyReportCard";
import {GoogleApiProvider} from 'react-gapi'
import SubscriberForm from '../../../components/forms/SubscriberForm';
import { getStoredUser } from '../../../components/utills/helpers';
import {Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SubscriberRoute from '../../../components/routes/SubscriberRoute';
import Link from 'next/link';
const Add = (props) => {
    const router = useRouter();
    const [values, setValues] = useState({});
    const account = props.account;
    const [image, setImage] = useState({});
    const [userReports, setUserReports] = useState({});
    
    const [preview, setPreview] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [myVideos, setMyVideos] = useState([]);
    const [myChannel, setMyChannel] = useState({});
    const [channelLoaded, setChannelLoaded] = useState(false);
    
    
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

   
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        try {

            const {data} = await axios.post('/api/course', {
                ...values, image,
            });
            

            toast('Great! Now you can start adding lessons');
            router.push('/instructor');
        } catch(err) {
            toast(err.response.data);
        }
    };

    useEffect(async () => {
        if(!account.signed) {
            return null;
        }
        const {data} = await axios.get(`/api/my-channel`, {params: {account: getStoredUser()}});
        if(Object.keys(data).length > 0) {
            setMyChannel(data);
        } else {
            router.push("/in/my/add");
        }
        setChannelLoaded(true);
    },  [account]);
    if(!channelLoaded) {
        return (
            <SubscriberRoute account={account}>
                <Grid container
                      sx={{
                        alignItems: "center",
                        justifyContent:"center",
                        paddingTop: "20%"
                      }}
                >
                    <CircularProgress />
                </Grid> 
            </SubscriberRoute>
        )
    }
    if(channelLoaded && Object.keys(myChannel).length > 0) {
        return (
            <SubscriberRoute account={account}>
                <Typography variant="h1" gutterBottom sx={{
                    paddingTop: "10%"
                }}>
                    You are currently have one  
                        <Link href="/in/my">
                             channel
                        </Link>
                </Typography>
            </SubscriberRoute>
        )
    }

    return (
        <SubscriberRoute account={account}>
            <Grid  container
                sx={{
                    marginTop: "40px"
                }}
            >
                <Grid item sx={{
                    width: "40%"
                }}>
                    <MyAccountForm />
                </Grid>
                <Grid item sx={{
                    maxWidth: "60%",
                    padding: "0 4%",
                    marginBottom: "20px"
                }}>
                    <Grid container 
                        sx={{
                            flexDirection: "column"
                        }}
                    >
            
                        {userReports.length > 0 && userReports.map((report, i) => (
                            <Grid item key={i} 
                                sx={{
                                    flexGrow: 1,
                                    width: "100%",
                                    backgroundColor: "#ddd",
                                    padding: "10px",
                                    margin: "3px auto"
                                }}
                            >
                                <MyReportCard report={report} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </SubscriberRoute>
    )
}

export default Add;