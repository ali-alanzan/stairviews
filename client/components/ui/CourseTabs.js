import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery} from '@mui/material';

import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TimelapseIcon from '@mui/icons-material/Timelapse';



function CourseTabs(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CourseTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({completed, course, clicked, handleRePlay, handleNext, handlePrevious}) {
  

  const [value, setValue] = React.useState(0);
 
  const [currentLessonTime, setCurrentLessonTime] = React.useState('');

  React.useEffect(() => {
    setCurrentLessonTime('00:00:00')
  }, [clicked]);

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };





  

  return (
    <Box sx={{ bgcolor: '#48ab7c', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="course tabs"
        >
          <Tab label="Content" {...a11yProps(0)} />
          {/* <Tab aria-label="previous"  icon={<SkipPreviousIcon onClick={handlePrevious} />}  {...a11yProps(0)} />
          <Tab aria-label="reply"   icon={<SkipNextIcon handleNext={handleNext} />} {...a11yProps(0)} />
          <Tab aria-label="next"   icon={<ReplayIcon handleRePlay={handleRePlay} />} {...a11yProps(0)} /> */}
          <Tab label="Progress" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
            backgroundColor: '#e2e2e2'
        }}
      >

        <CourseTabs value={value} index={0} dir={theme.direction}>
         {course.lessons[clicked].content}   
        </CourseTabs>
        <CourseTabs value={value} index={1} dir={theme.direction}>
            {/* {content} */}
            <Box sx={{display: 'flex'}}>
                <Box>
                    <Box sx={{display: 'flex'}}>
                        <RadioButtonCheckedIcon/>
                        <Typography sx={{margin: '0 10px'}}>
                            {completed.length + ' of ' + course.lessons.length} lessons  Completed
                        </Typography>
                    </Box>
                </Box>

                {/* <Box>
                    <Box sx={{display: 'flex'}}>
                        <TimelapseIcon/>
                        <Typography sx={{margin: '0 10px'}}>
                            {currentLessonTime} 
                        </Typography>
                    </Box>
                </Box> */}
            </Box>
        </CourseTabs>

      </SwipeableViews>
    </Box>
  );
}
