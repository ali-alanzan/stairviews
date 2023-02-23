import { Grid, Typography } from "@mui/material";


const Footer = () => {
    return (
        <Grid container 
            sx={{
                padding: '2rem 0',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#314048',
                color: '#e2e2e2'
            }}
        >
            <Grid item>
                <Typography variant="body2">
                © Copyright  2023 Stairviews .
                </Typography>
            </Grid>
        </Grid>
    )
}



export default Footer;