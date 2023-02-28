import React, {useState} from 'react';
import { styled, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import engineering from '../../../assets/engineering.jpg';
import computerScience from '../../../assets/computer-science.jpg';
import health from '../../../assets/health.jpg';
import design from '../../../assets/design.jpg';
import carMecanic from '../../../assets/car-mechanic.jpg';
import leadership from '../../../assets/leadership.webp';
import { useTheme } from '@mui/styles';
import { Grid } from '@mui/material';
  
const images = [
  {
    url: engineering.src,
    title: 'Engineering',
    width: '50%',
  },
  { 
    url: computerScience.src,
    title: 'Computer Science and IT    ',
    width: '50%',
  },
  {
    url: design.src,
    title: 'Design',
    width: '40%',
  },
  {
    url: health.src,
    title: 'Health',
    width: '60%',
  },
  {
    url: carMecanic.src,
    title: 'Automotive Truck & mechanics ',
    width: '60%',
  },
  {
    url: leadership.src,
    title: 'Business And Leadership',
    width: '40%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 240,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#1d0a2b',
  opacity: 0.6,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function SubjectsCardsSection({}) {

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [subjects, setSubject] = useState(images)
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {subjects && subjects.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: '50%',
            height: matchesSM ? '220px' : undefined
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}
