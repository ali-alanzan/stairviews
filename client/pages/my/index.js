import { useState, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
import MyAccountForm from '../../components/forms/MyAccountForm';
import axios from 'axios';
import { useTheme } from '@mui/styles';
import MyReportCard from "../../components/cards/MyReportCard";
import {GoogleApiProvider} from 'react-gapi'
import SubscriberForm from '../../components/forms/SubscriberForm';

const Index = (props) => {
    const router = useRouter();
    const [values, setValues] = useState({});
    const account = props.account;
    const [image, setImage] = useState({});
    const [userReports, setUserReports] = useState({});
    
    const [preview, setPreview] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [myVideos, setMyVideos] = useState([]);

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
        if( Object.keys(account).length > 0 && account.email != undefined  ) {
            const {data} = await axios.get(`/api/myvideos`, {
                params: {
                    account: {
                        email: account.email,
                        password: account.password
                    }
                }
            });

            if(Object.keys(data).length > 0) {
                setMyVideos(data);
            }
        }
    },  [account]);

    return (
        <Grid  container
            sx={{
                marginTop: "40px"
            }}
        >
            <Grid item sx={{
                width: "40%"
            }}>
                <MyAccountForm />
                <GoogleApiProvider clientId={process.env.CLIENT_ID}>
                    <SubscriberForm />
                </GoogleApiProvider>
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
    )
}

export default Index;