import { Grid, useMediaQuery } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Typography from '@mui/material/Typography';
import {displayDurationFromVideo} from '../../components/utills/helpers';

        // {/* {JSON.stringify(video)} */}

const MyVideoCard = ({video}) => {
    return <Grid container sx={{
                flexDirection: "row"
            }}>

                <Grid item>
                    <PlayCircleOutlineIcon />
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h5"
                        sx={{
                            fontSize: "1em",
                            color: '#1c27c0',
                            maxWidth: "94%",
                            paddingLeft: "10px"
                        }}
                    >
                        <a target="_blank" href={video.url}>
                            {video.title}
                        </a>
                    </Typography>
                </Grid>
                <Grid container 
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}
                >
                    <Typography gutterBottom variant="body1"
                            sx={{
                                fontSize: "1em"
                            }}
                        >
                        <strong>Duration:</strong> {displayDurationFromVideo(video.duration)}
                    </Typography>
                    
                    
                    <Typography gutterBottom variant="body1"
                        sx={{
                            fontSize: "1em"
                        }}
                    >
                        <strong>Views:</strong> {!video.views ? 0 : video.views}
                    </Typography>
                    <Typography gutterBottom variant="body1"
                        sx={{
                            fontSize: "1em"
                        }}
                    >
                        <strong>Users:</strong> {video.watchers.length > 0 ? video.watchers.length : 0}
                    </Typography>
                    <Typography gutterBottom variant="body1"
                        sx={{
                            fontSize: "1em"
                        }}
                    >
                        <strong>Watched:</strong> {video.watchedDuration > 0 ? video.watchedDuration.length : 0}
                    </Typography>
                </Grid>
            </Grid>
}

export default MyVideoCard;