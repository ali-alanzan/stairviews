import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';

import { Grid } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';

const PreviewModal = ({
    previewClicked, setPreviewClicked,
    showModal, course, setShowModal,
    preview, previewTitle, lessons, 
    setPreview, setPreviewTitle
    }) => {
    
    const [prevProcess, setPrevProcess] = useState(false);
    
 
    let freeLessons = [];
    lessons.map(lesson => {
        if(lesson.free_preview == true) {
            freeLessons.push(lesson);
        }
    });


    useEffect(() => {
        


        loadVideoPlayer();

    }, [previewClicked]);
    
    
    const loadVideoPlayer = async () => {

        const loadingCheck = await new Promise((res) => {
            setTimeout(function () {
                res(true);
            }, 100);
        });
        
        if( previewClicked == -1 || showModal == false) return;
        setPreview( typeof(freeLessons[previewClicked].video.Location) != undefined ? freeLessons[previewClicked].video.Location : '' );
        setPreviewTitle( typeof(freeLessons[previewClicked].title) != undefined ? freeLessons[previewClicked].title : '' );
    }



    return (
        <Dialog
            open={showModal}
            onClose={() => {
                setShowModal(!showModal); setPreviewClicked(-1);
            }}
            aria-labelledby="responsive-dialog-title"
            // fullWidth={true}
            maxWidth={"md"}
            >
            <DialogTitle id="responsive-dialog-title">
                {previewClicked == -1 ? '' : freeLessons[previewClicked].title}
                <IconButton
                    aria-label="close"
                    onClick={() => setShowModal(!showModal)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", minWidth: '40rem'}}>
            <Grid container sx={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            
            <Player 
                src={preview}
                poster={course.image && course.image.Location ? course.image.Location : '/course.png'}
                playsInline
            >
                <BigPlayButton position="center" />
                <LoadingSpinner />
            </Player>

            
            </Grid>
                
            
                
                <Grid container sx={{flexGrow: 1}}>
                    <Grid item container direction="column">
                        <List>
                            {freeLessons && freeLessons.map((item, index) => (
                                <ListItem
                                    key={item.slug+'-'+index}
                                    secondaryAction= {item.video && item.video.Location !== undefined && item.free_preview && (
                                        <Button id={`ppr_item_${index}`} onClick={() => {
                                                // setPreview(item.video.Location);
                                                // setPreviewTitle(item.title);

                                                setPreviewClicked(index)
                                        }}
                                            startIcon={<VisibilityIcon color="primary" />}
                                            disabled={prevProcess}
                                            >
                                        Preview
                                        </Button>
                                        )}
                                >
                                <ListItemAvatar>
                                    <Avatar>
                                        {index+1}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title}
                                />
                            
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
            {/* <DialogActions>
            <Button autoFocus sx={{color: "#8499d5"}} onClick={() => setShowModal(!showModal)}>
                Cancel
            </Button>
            </DialogActions> */}
        </Dialog>
    )
};

export default PreviewModal;