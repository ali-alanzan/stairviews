import { useState, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
import AddVideoForm from '../../components/forms/AddVideoForm';
import axios from 'axios';
import { useTheme } from '@mui/styles';
import MyVideoCard from "../../components/cards/MyVideoCard";


const Videos = ({account, handleEventUnSubscribeApi, handleEventSubscribeApi}) => {
    const router = useRouter();
    const [values, setValues] = useState({});    
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [myVideos, setMyVideos] = useState([]);
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleChange = (e) => {
       
        setValues({ ...values, [e.target.name]: e.target.value })
    };






    const updateVideoCards = () => {
        
    }


    


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
                <AddVideoForm 
                    values={values} setValues={setValues} 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    image={image}
                    account={account}
                    updateVideoCards={updateVideoCards}
                    myVideos={myVideos}
                    setMyVideos={setMyVideos}
                    handleEventUnSubscribeApi={handleEventUnSubscribeApi}
                    handleEventSubscribeApi={handleEventSubscribeApi}
                />
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
                {
            //     "_id": "642845ad55c44cd38ec0b845",
            //     "title": "Node.js Express Paytm Payment Gateway Integration Full Tutorial with Source Code 2020",
            //     "slug": "node.js-express-paytm-payment-gateway-integration-full-tutorial-with-source-code-2020",
            //     "videoId": "HQsKYj8OOGk",
            //     "url": "https://www.youtube.com/watch?v=HQsKYj8OOGk",
            //     "duration": "718",
            //     "user": "642844fb55c44cd38ec0b828",
            //     "published": false,
            //     "createdAt": "2023-04-01T14:54:37.012Z",
            //     "updatedAt": "2023-04-01T14:54:37.012Z",
            //     "__v": 0
                // 
                // JSON.stringify([myVideo])
            }
                    {myVideos.map((myVideo) => (
                        <Grid item key={myVideo._id} 
                            sx={{
                                flexGrow: 1,
                                width: "100%",
                                backgroundColor: "#ddd",
                                padding: "10px",
                                margin: "3px auto"
                            }}
                        >
                            <MyVideoCard video={myVideo} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Videos;