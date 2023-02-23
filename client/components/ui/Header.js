import React, {useContext} from 'react';
import Link from 'next/link';
import { Context } from '../../context';
import axios from 'axios';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';




import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/styles';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import logo from '../../assets/Logo-v1edu.png';


import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { Paper } from '@mui/material';

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    }); 
}


const useStyles = (theme) => {

    return {
        toolbarMargin: {
            ...theme.mixins.toolbar,
            // marginBottom: "40px",
            height: '56px'
        },
    
        
        tabContainer: {
            marginLeft: 'auto'
        },
        tab: {
            ...theme.typography.tab,
            minWidth: 10,
            marginLeft: "25px",
            
        },
        button: {
            ...theme.typography.estimate,
            borderRadius: '50px',
            marginLeft: "25px",
            marginRight: "25px",
            height: "45px",
            "&:hover": {
                backgroundColor: theme.palette.secondary.light
            }
        },
        menu: {
            backgroundColor: theme.palette.common.blue,
            color: 'white',
            borderRadius: 0
        },
        menuItem: {
            ...theme.typography.tab,
            color: "inherit",
            opacity: .7,
            
        },
        drawer: {
            backgroundColor: theme.palette.common.blue
        },
        drawerItem: {
            ...theme.typography.tab,
            color: '#1d0a2b',
            opacity: .7
        },
        drawerItemSelected: {
            "& .MuiListItemText-root": {
                opacity: 1
            }
    
        },
        drawerItemEstimate: {
            backgroundColor: theme.palette.common.orange,
            marginTop: '10px'
        },
    }
};


const Header = (props) => {
    
    
    const theme = useTheme();
    const classes = useStyles(theme);
    const iOS =
      typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);


    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));


    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const [value, setValue] = [props.value, props.setValue];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = [props.selectedIndex, props.setSelectedIndex];


    const  {state, dispatch} = useContext(Context);
    const { user } = state;

    const logout = async () => {
        dispatch({
            type: 'LOGOUT'
        });
        window.localStorage.removeItem('user');
        const {data} = await axios.get("/api/logout");

        toast(data.message);
        router.push('/login')
    }

    
    const router = useRouter();

    
    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    }



    const handleClose = (e) => {
        setAnchorEl(null)
        setOpenMenu(false)
    }


    let userActiveIndex = 0
    const routes = [
        {name: "Home", link: "/", activeIndex: userActiveIndex},
        // {
        //     name: "Services", link: "/services", activeIndex: 1,
        //     ariaOwns: anchorEl ? "simple-menu" : undefined,
        //     ariaPopup: anchorEl ? "true" : undefined,
        //     mouseOver: event => handleClick(event)
        // },
        
    ];

    const userSubMenuOptions = [
        // {
        //     name: "Services",
        //     link: "/services",
        //     activeIndex: 1,
        //     selectedIndex: 0
        // },


    ];

    routes.push(
        {name: "Courses", link: "/courses", activeIndex: ++userActiveIndex},
    );

    if( user && user.role && user.role.includes("Instructor") ) {
        routes.push(
            {name: "Create Course", link: "/instructor/course/create", activeIndex: ++userActiveIndex},

            {name: "Instructor", link: "/instructor", activeIndex: ++userActiveIndex},
        );

        userSubMenuOptions.push({
            name: "Dashboard",
            link: "/instructor/courses",
            activeIndex: ++userActiveIndex,
            selectedIndex: 0
        });
    } else {
        routes.push(
            {name: "About us", link: "/about-us", activeIndex: ++userActiveIndex},
        );
        
        if(user != null) {
            if(matchesSM) {
                routes.push(
                    {name: "Dashboard", link: "/user", activeIndex: ++userActiveIndex, 
                    selectedIndex: 0
                
                    },
                );
            } else {
                userSubMenuOptions.push(        {
                    name: "Dashboard",
                    link: "/user",
                    activeIndex: ++userActiveIndex,
                    selectedIndex: 0
                });
            }
        }


    }




 


    if ( user != null) {
        
        routes.push(
            {
                name: user && user.name, link: "#logout", activeIndex: ++userActiveIndex,
                ariaOwns: anchorEl ? "logout-submenu" : undefined,
                ariaPopup: anchorEl ? "true" : undefined,
                mouseOver: event => handleClick(event),
                click: event => handleClick(event),
                icon: <LocalCafeOutlinedIcon fontSize="small" />
            }
        );

    } else {
        routes.push(
            {name: "Login", link: "/login", activeIndex: ++userActiveIndex},
            {name: "Register", link: "/register", activeIndex: ++userActiveIndex},
        )
    }


    React.useEffect(() => {
        const pathName = window.location.pathname;
        
        [...userSubMenuOptions, ...routes].forEach(route => {
            switch(pathName) {
                case `${route.link}`:
                    if( value !== route.activeIndex) {
                        setValue(route.activeIndex)
                        if(route.selectedIndex && route.selectedIndex !==  selectedIndex) {
                            setSelectedIndex(route.selectedIndex);
                            
                        }
                    }
                    break;
                case '/freetrial':
                    setValue(userSubMenuOptions.length+1);
                    break;
                default:
                    break;
            }
        })
    }, [value, selectedIndex,userSubMenuOptions, routes]);



    const tabs = (
        <React.Fragment>
            <Tabs
            value={value} 
            onChange={handleChange} 
            indicatorColor="secondary"
            textColor="inherit"
            sx={{
                ...classes.tabContainer,
                marginRight: "2rem",
            }}
            >                
                {
                    routes.map((route, index) => (
                        <Link href={route.link}
                        key={`${route.link}-${index}`}
                        passHref
                        >
                            <Tab 
                            sx={{...classes.tab}}
                            label={route.name}
                            aria-owns={route.ariaOwns}
                            aria-haspopup={route.ariaPopup}
                            onMouseOver={route.mouseOver}
                            onClick={matchesSM ? route.click : undefined}
                            icon={route.icon ? route.icon : undefined}
                            iconPosition={route.icon ? "start" : undefined}
                            />
                        </Link>
                        ))
                }
            </Tabs>

         
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer 
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS} open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            sx={{...classes.drawer}}
            >
            <List disablePadding>

                {
                    routes.map((route, index) => (
                        route.link == '#logout' ? <div
                        key={route.link+'-'+index}>
                        {userSubMenuOptions.map((option, i) => (
                            <ListItemButton
                            key={option.link+'-'+i}
                            onClick={() => {setOpenDrawer(false); setValue(route.activeIndex)}} 
                            divider button="true"
                            selected={value === route.activeIndex}
                            sx={{...classes.drawerItemSelected}}
                            >
                            <Link href={option.link} passHref>
                                <a>
                                {
                                    option.icon ? <ListItemIcon> {option.icon} </ListItemIcon> : undefined
                                }
                                <ListItemText  
                                sx={{...classes.drawerItem}}
                                disableTypography
                                >
                                    {option.name}                             
                                </ListItemText>
                                </a>
                            </Link>
                            
                        </ListItemButton>
                        ))}
                        <ListItemButton
                            onClick={logout} 
                            divider button="true"
                            selected={value === route.activeIndex}
                            sx={{...classes.drawerItemSelected}}
                            >
                            
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                            
                        </ListItemButton>
                      
                        </div> : <ListItemButton
                            key={`${route}${index}`}
                            onClick={() => {setOpenDrawer(false); setValue(route.activeIndex)}} 
                            divider button="true"
                            selected={value === route.activeIndex}
                            sx={{...classes.drawerItemSelected}}
                            >
                            <Link href={route.link} passHref>
                                <a>
                                {
                                    route.icon ? <ListItemIcon> {route.icon} </ListItemIcon> : undefined
                                }
                                <ListItemText  
                                sx={{...classes.drawerItem}}
                                disableTypography
                                >
                                    {route.name}                             
                                </ListItemText>
                                </a>
                            </Link>
                            
                        </ListItemButton>
                        

                    ))
                }

                
            </List>
            </SwipeableDrawer>

            <IconButton 
            sx={{
                marginLeft: "auto",
                marginRight: '2rem'
            }}
            onClick={() => setOpenDrawer(!openDrawer)}
            disableRipple
            >
                <MenuIcon sx={{
                    height: "50px",
                    width: "50px",
                    color: '#e2e2e2'
                }} />
            </IconButton>

        </React.Fragment>
    )
             
    return (

        <React.Fragment>
            {/* Your component tree. Now you can override MUI's styles. */}
            <ElevationScroll>
            <AppBar position="fixed" 
                sx={{
                    backgroundColor: '#1d0a2b',
                    height: '80px'
                }}
            >
                <Toolbar disableGutters>
                    <Button sx={{
                        padding: 0,
                        margin: 0,
                        "&:hover": {
                            backgroundColor: "transparent"
                        }
                    }}
                    onClick={() => setValue(0)}
                    disableRipple
                    >
                        <Link href="/" passHref>
                            <img alt="Stairviews logo" style={{
                                maxWidth: matchesSM ? "160px" :"160px",
                                maxHeight: "80px",
                                marginLeft: matchesSM ? '2rem' : '5rem',
                                padding: '1rem'
                            }} src="https://stairviews.com/wp-content/themes/st/assets/img/logo.png" />
                        </Link>
                    </Button>

                    <Menu
                        id="logout-submenu" anchorEl={anchorEl} open={openMenu}
                        onClose={handleClose}
                        MenuListProps={{onMouseLeave: handleClose}}
                        sx={{...classes.menu}}
                        elevation={0}
                        style={{zIndex: 1302}}
                        keepMounted
                    >
                        {
                            userSubMenuOptions.map((option, i) => (
                                <MenuItem 
                                    key={option.link+'-'+i}
                                    onClick={(event) => {
                                        handleMenuItemClick(event, i)
                                        setValue(1);
                                        handleClose();
                                    }} 
                                    selected={i === selectedIndex && value === 1}
                                    sx={{
                                        ...classes.menuItem,
                                    }}
                                    >
                                    <Link href={option.link} passHref>
                                        <a>
                                            {option.name}
                                        </a>
                                    </Link>
                                </MenuItem>
                            ))
                        }
                                <MenuItem 
                                    onClick={logout} 
                                    sx={{...classes.menuItem}}
                                    >
                                    <ListItemIcon>
                                        <ExitToAppIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
        
                    </Menu>

                    {matchesMD ? drawer : tabs}
                    
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Paper sx={{...classes.toolbarMargin}} />
        </React.Fragment>
    )
}
export default Header;