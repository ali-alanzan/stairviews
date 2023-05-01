import * as React from 'react';
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
const Input = styled('input')({
    display: 'none',
});
  
const MyAccountForm = ({account, updateVideoCards, myVideos, setMyVideos}) => { 
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
    useEffect(function () {
        if(addedVideoId.length > 0) {
            setAddedVideoBtn(true);
        }
    }, [addedVideoId]);

    const handleChangeAddedVideoIdForm = (event) => {
        
        var value = document.querySelector("#videourl").value;
        // console.log(event, event.target);
        const url = value,
        checkURL = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(url),
        checkV = url.indexOf('?v='),
        uid = checkV < 13 ? url.indexOf('/shorts/') > 0 ? url.substr(url.indexOf('shorts/')+7, url.indexOf('?') > 0 ? url.indexOf('?') : undefined ) : false : url.substr(checkV+3, url.indexOf('&') > 0 ? url.indexOf('&') : url.length),
        uidfromshare = url.indexOf('youtu.be') > 5;
        if( !checkURL || (!uid && !uidfromshare) ) {
            setError(true);
        } else{
            setError(false);
            setAddedVideoURL(value);
            setAddedVideoId(uid);
        }
    }
    const handleAddAnotherVideo = () => {
        statusChangedByField();
    }
    const handleChangeYoutubeVideoForm = async () => {
        const form_data = {
            addedVideoURL,
            addedVideoId, 
            videoTitle, 
            duration, 
            account
        };

         
        await axios.post('/api/add-video', form_data).then(response => {
            setVideoAdded(response.data);
            const myPrevVideos = myVideos;
            setMyVideos([response.data, ...myPrevVideos]);
            toast.success('Video added successfully');
        }).catch(error => {
            // console.log()
            // statusChangedByField();
            setVideoError(videoError+1);
            if(videoError >= 9) {
                setVideoAdded({0:1});
            }
            toast.error(error.response.data);
        });;
        
        // updateVideoCards();
        // console.log(form_data, data);
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
                Add youtube video
            </Typography>
            <Typography gutterBottom variant="body1"
                sx={{
                    
                }}
            >
                                How to got your channel URL <a href="https://www.youtube.com/watch?v=PdcCFs5yCas"> Guides </a>
<br/><br/>
Example of Youtube video URL: <a target="_blank" href="https://www.youtube.com/channel/UCMV5InJthjFMMd08o5DVRfQ">https://www.youtube.com/channel/UCMV5InJthjFMMd08o5DVRfQ</a>
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
            >
                <FormGroup sx={{margin: "0"}}>
                    <TextField id="channel_url" label="Youtube Channel URL" 
                        name="videourl" 
                        variant="filled" 
                        />
                </FormGroup>

                { videoTitle == "" ? <Button variant="contained" component="span" 
                    startIcon={<PersonAddAltIcon />}
                    sx={{
                        backgroundColor: "#9c27b0",
                        width: '80%',
                        margin: "0 10px"
                    }}
                    onClick={handleChangeYoutubeVideoForm}
                    >
                        
                    Add My Channel
                </Button> : <Grid container sx={{
                    flexDirection: "row",
                    flexWrap: "nowrap"
                }}>
                    <Button variant="contained" component="span" 
                        startIcon={<EmergencyShareIcon />}
                        sx={{
                            backgroundColor: "#27b044",
                            width: '80%',
                            margin: "0 10px"
                        }}
                        onClick={handleVideoAddVideo}
                        disabled={Object.keys(videoAdded).length > 0}
                        >
                        Add video
                    </Button>
                    {Object.keys(videoAdded).length > 0 ? <Button variant="contained" component="span" 
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "#9c27b0",
                        width: '100%',
                        margin: "0 10px",
                        fontSize: "12px"
                    }}
                    onClick={handleAddAnotherVideo}
                    
                    >
                    Another video
                </Button> : ""}
                    
                </Grid>
                }
                
            </form>
        </Grid>

        <Grid item
            sx={{
                padding: "0 20px"
            }}
        >
            {/* <YTChannelCard /> */}
        </Grid>
    </Grid>);

}

export default MyAccountForm;