import React, { useEffect } from 'react';

import {useGoogleApi } from 'react-gapi'


const SubscriberForm = () => {
   
    const gapi = useGoogleApi({
        scopes: [
          'profile',
        ],
      });
      console.log(gapi);
    
      const auth = gapi?.auth2.getAuthInstance()

      // gapi.auth.authorize(
      //   {
      //     'client_id': process.env.CLIENT_ID,
      //     'scope': SOMESCOPE,
      //     'authuser': -1,
      //     'prompt': 'select_account'
      //   },
      //   function (authResult) {
      //       console.log(authResult);
      //   }
      // )
      // gapi.auth.authorize({
      //   'client_id': 'myID',
      //   scope: 'email', immediate: true
      // },getAuthStatus);
      // gapi.client.Myendpoint.MyEndpointMethod().execute(function (resp) {
      //   console.log(resp);
      // });
      return <div>{
          !auth
            ? <span>Loading...</span>
            : auth?.isSignedIn.get()
              ? `Logged in as "${auth.currentUser.get().getBasicProfile().getName()}"`
              : <button onClick={() => auth.signIn()}>Login</button>
        }</div>
}




export default SubscriberForm;