import * as React from 'react';
import WatchComponent from './watchComponent';


const SignedComponent = ({
    handleEventUnSubscribeApi,
    handleEventSubscribeApi,
    stage,
    session
}) => {
    console.log(session);
    if(stage == "watch") {
        return <WatchComponent 
            handleEventUnSubscribeApi={handleEventUnSubscribeApi}
            handleEventSubscribeApi={handleEventSubscribeApi}
            session={session}
        />
    } else if(stage == "catalog") {

    } else {

    }


}

export default SignedComponent;