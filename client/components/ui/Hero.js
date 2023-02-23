import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/styles';

const Hero = (props) => {

    const title = props.title;
    


    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    // console.log(props, theme);

    return (
        <Paper
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            marginTop: -1,
            marginBottom: 3,
            maxWidth: '100%'
        }}
        >
            <Typography variant="h1"
                sx={{
                    height: "100%",
                    color: "#fff",
                    width: "100%",
                    padding: matchesSM ? "3rem 1rem": "3rem 2rem",
                    fontSize: matchesSM ? '4rem': undefined,
                    background: "-moz-linear-gradient(45deg,  rgba(23,9,32,1) 0%, rgba(23,9,32,0.89) 0%, rgba(28,11,39,0.87) 68%, rgba(35,13,48,0.87) 81%, rgba(44,17,60,1) 99%, rgba(44,17,61,1) 100%)",
                    background: "-webkit-linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                    background: "linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#170920', endColorstr='#2c113d',GradientType=1 )",

                }}
                align="center">
                {title}
            </Typography>
        </Paper>
    )
}

export default Hero;