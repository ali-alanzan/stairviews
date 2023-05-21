import * as React from 'react';
import { useRouter } from 'next/router';
import { FormGroup, TextField, Grid, Avatar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import YTChannelCard from '../cards/YTChannelCard';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import PreviewIcon from '@mui/icons-material/Preview';
import {toast} from 'react-toastify';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import ClearIcon from '@mui/icons-material/Clear';
import Script from 'next/script';
import { getStoredUser } from '../utills/helpers';
import CircularProgress from '@mui/material/CircularProgress';
// import NotUserChannel from '../models/NotUserChannel';
const Input = styled('input')({
    display: 'none',
});
  
const MyAccountForm = ({}) => { 
    
    const [addedVideoId, setAddedVideoId] = useState("");
    const [addedVideoURL, setAddedVideoURL] = useState("");
    const [addedVideoBtn, setAddedVideoBtn] = useState(false);
    const [errorText, setErrorText] = useState("Un valid youtube channel link");
    const [error, setError] = useState(false);
    const playerBase = {getCurrentTime: function() {return 0;}, getDuration: function() {return 0;}};
    const [player, setPlayer] = React.useState(playerBase);
    const [videoTitle, setVideoTitle] = React.useState("");
    const [duration, setDuration] = React.useState(0);
    const [videoAdded, setVideoAdded] = React.useState({});
    const [videoError, setVideoError] = React.useState(0);
    const [channelId, setChannelId] = React.useState("");
    const [passedLink, setPassedLink] = React.useState("");
    const [channelIdError, setChannelIdError] = React.useState("");
    const [myChannels, setMyChannels] = useState([]);
    const [channelAdded, setChannelAdded] = useState(false);
    const [channelObj, setChannelObj] = useState({});
    const [controlChannelBtns, setControlChannelBtns] = useState(false);
    const [controlChannelBtnsLoad, setControlChannelBtnsLoad] = useState(false);
    

    const router = useRouter();
    
    useEffect(function () {
        // if( Object.keys(account).length > 0 && account.email != undefined  ) {
        //     const {data} = await axios.get(`/api/myvideos`);

        //     if(Object.keys(data).length > 0) {
        //         setMyVideos(data);
        //     }
        // }
    }, []);



    const getApiChannelObj = async () => {
        try {
            await gapi.client.youtube.channels.list({
                "part": [
                "snippet,contentDetails,statistics"
                ],
                "id": [
                channelId
                ]
            })
            .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log("Result", response.result.pageInfo.totalResults);
                const result = response.result.pageInfo.totalResults;
                if(response.result.pageInfo.totalResults>0) {
                    handleStoreChannelToUser(response.result.items[0]);
                } else {
                    toast.error("Channel is not valid");
                    return null;
                }
            },
            function(err) { 
                console.error("Execute error", err); 
                toast.error("Channel is not valid");
            }
            );
        } catch(err) {
            console.log(err)
            toast.error("Err!, Please login and try again");
        }
    }

    const handleStoreChannelToUser = async (channelObj) => {
        console.log(channelObj);
        if(Object.keys(channelObj).length <= 0) {
            return null;
        }

        const preview = document.getElementById("iframe-preview-channel").contentWindow.document.body.innerHTML;
        const form_data = {
            channelId,
            account: getStoredUser(),
            preview: preview,
            review: channelObj
        };

         
        await axios.post('/api/add-channel', form_data).then(response => {
            // setChannelAdded(response.data);
            // const myPrevChs = myChannels;
            // setMyChannels([response.data, ...myPrevChs]);
            // toast.success('Video added successfully');
            // setChannelAdded(true);
            // console.log(response);
            // console.log(response.ok.data.ok);
            if(typeof(response.data.ok) == "boolean" && response.data.ok) {
                router.push("/in/my");
            }
        }).catch(error => {
            console.log(error)
            // statusChangedByField();
            // setVideoError(videoError+1);
            // if(videoError >= 9) {
            //     setVideoAdded({0:1});
            // }
            toast.error(error.response.data);
        });;
        
        // updateVideoCards();
        // console.log("channel link");
    }

    const handleChangeYoutubeVideoForm = async () => {
        await getApiChannelObj();

    }
    const statusChangedByField = (event) => {
        
        setAddedVideoId("");
        setAddedVideoURL("");
        setAddedVideoBtn(false);
        setError(false);
        setPlayer(playerBase);
        setVideoTitle("");
        setDuration(0);
        setVideoAdded({});
        document.querySelector("#videourl").value = "";
    }

    const handleLinkToChannel = (event) => {
        const input = event.target.value,
        slices = input.split("youtube.com/channel/");
        setChannelId("");
        setPassedLink("");
        setControlChannelBtns(false);
        if(input == "") {
            setChannelIdError("");
            return null;
        }

        if(slices.length < 2) {
            setChannelIdError("Youtube channel URL is invalid");
            return null;
        }
        if(slices[0] != "https://" && !slices[0].endsWith("www.")) {
            setChannelIdError("Youtube channel URL is invalid");
            return null;
        }
        setChannelIdError("");
        const channelIdSlice = slices[1],
        channelIdString = channelIdSlice.replaceAll("/", "");
        setChannelId(channelIdString);
        setPassedLink(input);
        setControlChannelBtnsLoad(true);
        setTimeout(function () {
            setControlChannelBtns(true);
            setControlChannelBtnsLoad(false);
        }, 10000);
        // console.log(channelId);
    }

// channelId
// channelIdError

    return (<Grid container>
        <Grid item
            sx={{
                padding: "10px 20px",
                textAlign: "left",
                flexGrow: 1
            }}
        >   



            <Typography gutterBottom variant="h5"
                sx={{
                    color: '#1c27c0'
                }}
            >
                Add youtube Channel URL
            </Typography>
            <Typography gutterBottom variant="body1"
                sx={{
                    
                }}
            >
                                How to got your channel URL <a target='_blank' href="https://www.youtube.com/watch?v=PdcCFs5yCas"> Guides </a>
<br/><br/>
Example of Channel URL: <a target="_blank" href="https://www.youtube.com/channel/UCMV5InJthjFMMd08o5DVRfQ">https://www.youtube.com/channel/UCMV5InJthjFMMd08o5DVRfQ</a>
                <br/>
            
            </Typography>
            <form 
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 0px",
                    height: "24vh",
                    justifyContent: "space-around"
                }}
                onSubmit={(e) => {e.preventDefault(); return false}}
            >
                <FormGroup sx={{margin: "0"}}>
                    <TextField id="channel_url" label="Youtube Channel URL" 
                        name="videourl" 
                        variant="filled" 
                        onChange={handleLinkToChannel}
                        onBlur={handleLinkToChannel}
                        onFocus={handleLinkToChannel}
                        onKeyDown={handleLinkToChannel}
                        onKeyUp={handleLinkToChannel}
                        sx={{
                            color: !channelIdError ? undefined: "#f00"
                        }}
                        helperText={!channelIdError ? undefined : channelIdError}
                        error={!channelIdError ? undefined : true}
                        disabled={!channelIdError && channelId.length > 0}
                        />
                </FormGroup>
                {channelId && <>
                    
                </>}

                <Button variant="contained" component="span" 
                    startIcon={<PersonAddAltIcon />}
                    sx={{
                        backgroundColor: !channelIdError && channelId.length ? "green" : "#9c27b0",
                        width: '80%',
                        margin: "0 10px"
                    }}
                    onClick={handleChangeYoutubeVideoForm}
                    disabled={!channelIdError && channelId.length > 0}
                    >
                        
                    Preview Channel
                </Button> 
                
            </form>
        </Grid>
        {!channelIdError && channelId.length > 0 && <Grid item container sx={{
                flexDirection: 'row'
            }}>
            <Grid item
                sx={{
                    padding: "0 20px"
                }}
            >
                <iframe src={"/frame-channel/?channelId="+channelId+"&watchChannelPreview=1"}
                    style={{
                        pointerEvents: "none"
                    }}
                    id="iframe-preview-channel"
                ></iframe>
            </Grid>
            <Grid item>
                <Grid container sx={{
                    flexDirection: 'column',
                    alignItems: "space-around",
                    justifyContent: "space-around",
                    height: "75%"
                }}>
                    {controlChannelBtnsLoad && <>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </>}
                    {controlChannelBtns && <>
                        <Grid item>
                            <Button
                                sx={{
                                    color: "green"
                                }}
                                onClick={handleChangeYoutubeVideoForm}
                            > 
                                <DomainVerificationIcon sx={{
                                    fontSize: "2.5em",
                                }} /> Add 
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                sx={{
                                    color: "#f00"
                                }}
                                onClick={() => {
                                    setChannelId("");
                                    setChannelIdError("");
                                    setControlChannelBtns(false);
                                    document.querySelector("#channel_url").value = "";
                                }}
                            > 
                                <ClearIcon sx={{
                                    fontSize: "2.5em",
                                }}/> Cancel
                            </Button>
                        </Grid>
                    </> }
                    
                </Grid>
            </Grid>
        </Grid>}
        
        {/* <NotUserChannel open={notuserchannel} /> */}
    </Grid>);

}

export default MyAccountForm;