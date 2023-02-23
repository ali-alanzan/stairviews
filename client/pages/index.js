import React from 'react';
import axios from 'axios';

import HomeHero from '../components/ui/HomeSection/HomeHero';
import Footer from '../components/ui/Footer';



const Index = ({courses, documentLoading}) => {

    console.log(documentLoading)
    
    return (
    <>

        <HomeHero              documentLoading={documentLoading} />
        
        

        <Footer />
    </>
    )
};

export async function getServerSideProps() {
    const {data} = await axios.get(`${process.env.API}/courses`);
    return {
        props: {
            courses: data,
        },
    }
}

export default Index;