import createTheme from '@mui/material/styles';

const aliBlue = "#0B72B9"
const aliOrange = "#FFBA60"
const  aliGrey = "#868686";

const ThemeCustom = () => {
    return  
        createTheme({
                palette: {
                    common: {
                        blue: aliBlue,
                        orange: aliOrange
                    },
                    primary: {
                        main: `${aliBlue}`
                    },
                    secondary: {
                        main: `${aliOrange}`
                    },
                    danger: {
                        light: '#ffcccb'
                    },
                    success: {
                        main: '#4caf50'
                    },
                    linearHomeHeroBg: {
                        background: "-moz-linear-gradient(45deg,  rgba(23,9,32,1) 0%, rgba(23,9,32,0.89) 0%, rgba(28,11,39,0.87) 68%, rgba(35,13,48,0.87) 81%, rgba(44,17,60,1) 99%, rgba(44,17,61,1) 100%)",
                        background: "-webkit-linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                        background: "linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#170920', endColorstr='#2c113d',GradientType=1 )",
                    
                    },
                },
               
                typography: {
                    tab: {
                        // fontFamily: 'Raleway',
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem'
                    },
                    estimate: {
                        fontFamily: "Pacifico",
                        fontSize: "1rem",
                        textTransform: "none",
                        color: 'white'
                    },
                    h2: {
                        // fontFamily: 'Raleway',
                        fontWeight: 700,
                        fontSize: "2.5rem",
                        color: aliBlue,
                        lineHeight: 1.5
                    },
                    h3: {
                        fontFamily: "Pacifico",
                        fontSize: "2.5rem",
                        color: aliBlue
                    },
                    h4: {
                        // fontFamily: 'Raleway',
                        fontSize: "1.75rem",
                        color: aliBlue,
                        fontWeight: 700
                    },
                    subtitle1: {
                        fontSize: "1.25rem",
                        fontWeight: 300,
                        color:  aliGrey,
                    },
                    subtitle2: {
                        color: "white",
                        fontSize: "1.25rem",
                        fontWeight: 300
                    },
                    body1: {
                        fontSize: "1.25rem",
                        color:  aliGrey,
                        fontWeight: 300
                    },
                    caption: {
                        fontSize: "1rem",
                        fontWeight: 300,
                        color:  aliGrey
                    },
                    learnButton: {
                        borderColor: aliBlue,
                        color: aliBlue,
                        borderWidth: 2,
                        textTransform: "none",
                        borderRadius: 50,
                        fontFamily: "Roboto",
                        fontWeight: "bold"
                    },
                    sendButton: {
                        fontFamily: "Pacifico",
                        fontSize: "1rem",
                        textTransform: "none",
                        color: 'white',
                        borderRadius: 50,
                        height: 45,
                        width: 245,
                        fontSize: "1rem",
                        backgroundColor: theme.palette.common.orange,
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.light
                        },
                         md: {
                            height: 40,
                            width: 225
                        }
                    }
                },
                components: {
                    MuiInputLabel: {
                        styleOverrides: {
                            root: {
                                color: aliBlue,
                                fontSize: "1rem"
                            }
                        }
                    },
                    MuiInput: {
                        styleOverrides: {
                            root: {
                                color: aliGrey,
                                fontWeight: 300
                            },
                            underline: {
                                "&:before": {
                                    borderBottom: `2px solid ${aliBlue}`
                                },
                                "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
                                    borderBottom: `2px solid ${aliBlue}`
                                }
                            }
                        }
                    }
                }
        })
};

export default ThemeCustom;