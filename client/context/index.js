import {useReducer, createContext, useEffect} from 'react';


import { useRouter } from 'next/router';

const initialState = {
    user: null
};


// create context
const Context = createContext();



// root reducer
function rootReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

// context providor
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    
    const router = useRouter();
    
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem('user')),
        });
        // console.log('login');
    }, []);
    
    // axios.interceptors.response.use(function (response) {
    //     // any status code that like within the range 2xx cause this function to trigger
    //     return response;
    // }, function (error)  {
    //     // any status code that false outside the range of 2xx cause this function to trigger
    //     let res = error.response;
    //     if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    //         return new Promise((resolve, reject) => {
    //             axios.get('/api/logout')
    //             .then( (data) => {
    //                 // 
    //                 // console.log('401 error > logout');
    //                 dispatch({type: "LOGOUT"});
    //                 window.localStorage.removeItem('user');
                    
    //                 // router.push('/login');
    //                 window.location.replace(window.location.origin+'/login?redirect_url='+window.location.href)
    //             })
    //             .catch( err => {
    //                 // console.log('AXIOS INRTERCEPTORS ERR', err);
    //                 reject(error);
    //             });
    //         });
    //     }

    //     return  Promise.reject(error);
    // });


    useEffect(() => {
        const getCsrfToken = async () => {
            // const {data} = await axios.get('/api/csrf-token');
            // console.log('CSRF', data);
            // axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
            // console.log('CSRF', axios);
        }
        getCsrfToken();
    }, []);
    

    return (
        <Context.Provider value={({state, dispatch})}>{children}</Context.Provider>
    )
}

export { Context, Provider}