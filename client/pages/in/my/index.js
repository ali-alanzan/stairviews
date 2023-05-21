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
import SubscriberRoute from '../../../components/routes/SubscriberRoute';
import CircularProgress from '@mui/material/CircularProgress';
import { getStoredUser } from '../../../components/utills/helpers';
const Index = (props) => {
    const router = useRouter();
    const [values, setValues] = useState({});
    const account = props.account;
    const [image, setImage] = useState({});
    const [userReports, setUserReports] = useState({});
    const [myChannel, setMyChannel] = useState({});
    const [channelLoaded, setChannelLoaded] = useState(false);
    
    
    const [preview, setPreview] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    // const [myVideos, setMyVideos] = useState([]);
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(async () => {
        if(!account.signed) {
            return null;
        }
        const {data} = await axios.get(`/api/my-channel`, {params: {account: getStoredUser()}});
        setChannelLoaded(false);
        if(Object.keys(data).length > 0) {
            setMyChannel(data);
        } else {
            router.push("/in/my/add");
        }
        setChannelLoaded(true);
    },  [account]);    

    return (
        <SubscriberRoute account={account}>
            <Grid  container
                sx={{
                    marginTop: "40px"
                }}
            >
                <pre>
                    {JSON.stringify(myChannel)}
                </pre>
            </Grid>
        </SubscriberRoute>
    )
}

export default Index;

 {/* _id
title
customUrl
channelId
published
subscriberCount
viewCount
subscribedCount
subscribers
preview */}