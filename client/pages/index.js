import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import HomeHeroCards from '../components/cards/HomeHeroCards';
import VrSectionStory from '../components/ui/HomeSection/VrSectionStory';
import MultiAccountSection from '../components/ui/HomeSection/MultiAccountSection';
import BuildYourFuture from '../components/ui/HomeSection/BuildYourFuture';
import ContinueToAccount from '../components/ui/HomeSection/ContinueToAccount';
import JoinNowArea from '../components/ui/HomeSection/JoinNowArea';
import HomeHero from '../components/ui/HomeSection/HomeHero';
import Footer from '../components/ui/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import * as serviceWorker from '../components/newints/serviceWorker';
import watchComponent from '../components/newints/watchComponent';
import SignedComponent from '../components/newints/SignedComponent';
import { Context } from '../context';
import { toast } from 'react-toastify';

const Index = ({account, signed, stage, setSigned, setStage, setSession, session}) => {
    const router = useRouter();
    const [loaded, setLoaded] = React.useState(false);
    const insertGapiScript = () => {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = async () => {
        await initializeGoogleSignIn()
      }
      document.body.appendChild(script)
    }
    
    const initializeGoogleSignIn = async () => {
      await window.gapi.load("client:auth2", function () {
        window.gapi.auth2.init({
            client_id: "854452941545-f2nmavdc2l2pkgetv76dsvhtdr8o0hne.apps.googleusercontent.com",
            scope: "email",
            plugin_name: "Stv"
            // client_secret: "",
            // API_KEY: ""

        })
      });
    }

   

    const handleEventSubscribeApi = async (event) => {
        // make a simple request to api
        var channelId = event.target.getAttribute("data-channelid");
        console.log("channelId", channelId);
        // return null;
        return gapi.client.youtube.subscriptions
          .insert({
              part: 'snippet',
              resource: {
                  snippet: {
                      resourceId: {
                          kind: 'youtube#channel',
                          channelId: channelId
                      }
                  }
              }
          })
          .then(function (response) {
              console.log(response);

              toast.success(`You are successfully subscribed to ${response.result.snippet.title}`);
          }, function (err) {
              console.log(err);
          });
      }
    
      const handleEventUnSubscribeApi = async(event) => {
        var channelId = event.target.getAttribute("data-channelid");
    
        return gapi.client.youtube.subscriptions.delete({
            'id': channelId
        })
        .then(function (response) {
            setSubscribed(false);
            toast("You are successfully Unsubscribed to channel");
            setChannel({})
        }, function (err) {
            console.log(err)
        });
      }
        

 
    // const  {state, dispatch} =  React.useContext(Context);
    React.useEffect(async () => {
      if(window != undefined && window != {} && window != null && typeof(window.document) && window.document != undefined) {
          setLoaded(true);
      } else {
        return <></>;
      }
      insertGapiScript();
    
    }, []);



    if(signed) {
       
    }
    
    return (
        <>
        
        {signed ? <SignedComponent 
            handleEventUnSubscribeApi={handleEventUnSubscribeApi}
            handleEventSubscribeApi={handleEventSubscribeApi}
            signed={signed} 
            stage={stage} 
            setSigned={setSigned} 
            setStage={setStage}
            session={session}
        /> : <>
            <HomeHero setSession={setSession} setStage={setStage} setSigned={setSigned} />
            <HomeHeroCards />
        </>}

        {/* <HomeHero setStage={setStage} setSigned={setSigned} /> */}
        {/* <HomeHeroCards /> */}
        <Footer />
        
        </>
    )
};




// export async function getServerSideProps() {
//     const {data} = await axios.get(`${process.env.API}/courses`);
//     return {
//         props: {
//             courses: data,
//         },
//     }
// }


export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['home']))
    }
});

export default Index;