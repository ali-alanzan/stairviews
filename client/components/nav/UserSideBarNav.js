import Link from 'next/link';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/styles';
import {Box, useMediaQuery} from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MuiDrawer from '@mui/material/Drawer';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';


const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));
let drawerWidth = 300;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
     
    }),
);
const openedMixin = (theme) => {
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return {
        width: matchesSM  ? '100%' : drawerWidth,        
        transition: matchesSM ? theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }): theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',

        top: '80px',
        height: matchesSM  ? '80vh' : undefined,
    }
};

const closedMixin = (theme) => {
    
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return {
        transition: matchesSM ? theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }) : theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: matchesSM  ? '100%' : `calc(${theme.spacing(7)} + 10px)`,        
     
        top: '80px',
        
        height: matchesSM  ? '56px' : undefined,
        
    }
};



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const UserSideBarNav = ({menuItems, documentLoading}) => {
    const [active, setActive] = React.useState(1);
    const activeBg = '#bab1d6';

    const [current, setCurrent] = React.useState("");
    const theme = useTheme();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const [open, setOpen] = React.useState(false);
   
    React.useEffect(() => {
       
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    
   
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <Drawer variant={"permanent"} open={open} anchor={matchesSM ? 'top' : 'left'}>
                <DrawerHeader>
                {(matchesSM || (!matchesSM && open)) && <Typography sx={{
                    flexGrow: 1, whiteSpace: 'pre-wrap' 
                    }} variant="h5" align="center">
                <Link href={`/user}`} passHref>
                    <a>
                    Dashboard
                    </a>
                </Link>
                    </Typography>}
                <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                    {!open ? <MenuOpenIcon /> : theme.direction === 'rtl' ? <ChevronRightIcon />: <ChevronLeftIcon />}
                </IconButton>
                </DrawerHeader>
                <List sx={{
                    paddingTop: matchesSM ? 0 : undefined 
                }}>
                
                { documentLoading ? <>
                    <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                    <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                    <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                    <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                </> : menuItems.map((item, index) => (
                    <ListItem className="iles0-brs" button key={index} 
                        onClick={() => {
                            setClicked(index); 
                            setLoadingVideo(true); 
                            markAsWatching(index); 
                            if(matchesSM) {
                                setOpen(!open)
                            };
                        }}
                    >
                    <ListItemIcon>
                        <Tooltip title={<Typography variant="h6">{item.title}</Typography>} arrow placement="right">
                            <Avatar>{item.avatar}</Avatar>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={item.title} disableTypography={true} sx={{
                        whiteSpace: open ? 'initial' : undefined
                    }} />
                        <ListItemIcon>
                            {/* {completed.includes(lesson._id) ? <CheckCircleOutlineIcon color="success" /> : <RemoveCircleOutlineIcon className="uncompleted-lesson" color="warning" />} */}
                        </ListItemIcon>
                    </ListItem>
                    
                ))}

                
                </List>
            </Drawer>
        </Box>
    )
}

export default UserSideBarNav;