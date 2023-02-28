import React from 'react';
import axios from 'axios';
import HomeHeroCards from '../components/cards/HomeHeroCards';
import VrSectionStory from '../components/ui/HomeSection/VrSectionStory';
import MultiAccountSection from '../components/ui/HomeSection/MultiAccountSection';
import BuildYourFuture from '../components/ui/HomeSection/BuildYourFuture';
import ContinueToAccount from '../components/ui/HomeSection/ContinueToAccount';
import JoinNowArea from '../components/ui/HomeSection/JoinNowArea';
import HomeHero from '../components/ui/HomeSection/HomeHero';
import Footer from '../components/ui/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';



const Index = ({courses, documentLoading}) => {

    console.log(documentLoading)
    
    return (
        <>

        <HomeHero              documentLoading={documentLoading} />
        
        <HomeHeroCards         />


        
        
        <VrSectionStory        />  
        <MultiAccountSection   />

        <BuildYourFuture />

        <JoinNowArea />


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