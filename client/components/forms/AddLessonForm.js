import { useState, useEffect } from "react";
import Link from "next/link";
import { FormGroup, TextField, Grid, Avatar, FormControl, FormControlLabel } from '@mui/material';
import {  Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import MissedVideoCallIcon from '@mui/icons-material/MissedVideoCall';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AudioFile from '@mui/icons-material/AudioFile';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ReactPlayer from 'react-player';

const Input = styled('input')({
    display: 'none',
  });

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
const AddLessonForm = ({
    handleAddLesson, values, setValues, handleChange, uploadButtonText
    ,
    handleVideo, handleVideoRemove, preview, uploading, progress
    ,

    handleAudio, previewAudio, handleAudioRemove, uploadAudioButtonText

}) => { 
    // console.log(uploadAudioButtonText);

    // console.log(typeof uploading);
    // return <></>;

    return (
        <form onSubmit={handleAddLesson}>
            <FormGroup sx={{margin: "2rem auto", width: "30rem" }}>
                <TextField id="title" label="Lesson Title" 
                    name="title" 
                    value={values.title} 
                    onChange={handleChange} 
                    />
            </FormGroup>

            <FormGroup sx={{margin: "1rem auto"}}>
                <TextField id="content" multiline
                rows={4}
                cols={7}
                label="Content" 
                name="content" 
                value={values.content} 
                onChange={handleChange} 
                />
            </FormGroup>

            <FormGroup sx={{margin: "2rem auto",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                }}>

                <label htmlFor="video-upload-file" style={{flexGrow: 1, maxWidth: '75%'}}>
    


                    <Button variant="contained" component="span" 
                        startIcon={!preview ? <MissedVideoCallIcon /> : undefined}
                        sx={{
                            backgroundColor: !preview ? "#9c27b0" : "#101010",
                            margin: "0 10px",
                            width: '100%',
                            color: preview ? '#333' : undefined
                        }}
                        disabled={
                                preview || values.title.trim().length <= 0 ||
                                uploading 
                            }
                        >
                            
                        {uploadButtonText}
                    </Button>

                    <Input accept="video/*" name="video" id="video-upload-file" 
                        type="file"  onChange={handleVideo} 
                        disabled={preview}
                        />
                </label>
                {preview && values.video && values.video.Location && 
                    (<>
                 
                    <Badge badgeContent={"X"}  onClick={handleVideoRemove} 
                    color="error" 
                    >
                        <Avatar width={200} ><VideoCameraBackIcon /></Avatar>
                    </Badge> 
                    
                    <Link href={values.video.Location}>
                       <a target="_blank">
                       <Avatar sx={{
                            marginLeft: '10px',
                            backgroundColor: '#58117e'
                        }}><PlayArrowIcon /></Avatar>

                       </a>
                    </Link>
                    
                    </>)
                }
                
            </FormGroup>


            {progress > 0 && <FormGroup  sx={{margin: "2rem auto"}}>
                <LinearProgressWithLabel value={progress} />
            </FormGroup>}






            {/* AUDIO */}
            <FormGroup sx={{margin: "2rem auto",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                }}>

                <label htmlFor="audio-upload-file" style={{flexGrow: 1, maxWidth: '75%'}}>
    


                    <Button variant="contained" component="span" 
                        startIcon={!previewAudio ? <AudioFile /> : undefined}
                        sx={{
                            margin: "0 10px",
                            width: '100%',
                        }}
                        disabled={
                            previewAudio || values.title.trim().length <=  0 ||                            
                            uploading || (values && values.audio && values.audio.Location != undefined) ? true : false }
                        >
                            
                        {uploadAudioButtonText}
                    </Button>

                    <Input name="audio" id="audio-upload-file" 
                        type="file"  onChange={handleAudio} 
                        disabled={ uploading || (values && values.audio && values.audio.Location != undefined) ? true : false }
                        />
                </label>

                    
                {!uploading && values && values.audio && values.audio.Location && 
                    (
                    <>
                <Badge badgeContent={"X"}  onClick={handleAudioRemove} 
                    color="error" 
                    >
                    <Avatar width={200} ><GraphicEqIcon /></Avatar>
                </Badge> 
                
                <Link href={values.audio.Location}>
                    <a target="_blank">
                    <Avatar sx={{
                        marginLeft: '10px',
                        backgroundColor: '#58117e'
                    }}><PlayArrowIcon /></Avatar>

                    </a>
                </Link>
                <label style={{display: 'flex', flexGrow: 1,
                    width: '100%', height: "100%", padding: '2rem 0',
                    justifyContent: "center", alignItems: 'center'}}>

                 
                    <ReactPlayer 
                        url={values.audio.Location}
                        width="70%"
                        height="60px"
                        forceaudio="true"
                        controls
                    />
                
                </label>
                    </>)
                }
                
            </FormGroup>







            <FormGroup>
                <FormControlLabel
                    value="free_preview"
                    control={<Switch color="primary" onChange={(s) => setValues({...values, free_preview: s.target.checked})} />}
                    label="Preview"
                    labelPlacement="start"
                    sx={{justifyContent:"space-between"}}
                />
            </FormGroup>



            <FormGroup  sx={{margin: "2rem auto"}}>
                <Button 
                    onClick={handleAddLesson}
                    loading={uploading.toString()}
                    type="primary"
                    disabled={ uploading }
                    variant="contained"
                    sx={{
                        marginBottom: '3rem',
                        width: '100%',
                        borderRadius: '80px',
                    }}

                    >
                    
                    

                    {
                        uploading ? `Uploading...` : 'Save'
                    }
                </Button>
            </FormGroup>
        </form>
            )
}

export default AddLessonForm;