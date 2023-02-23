import React, {useState, useEffect} from 'react';
import axios from 'axios';

import CoursesCardsSection from '../components/cards/CoursesCardsSection';

const Courses = ({courses}) => {


    

    return <CoursesCardsSection courses={courses} />

};

export async function getServerSideProps() {
    const {data} = await axios.get(`${process.env.API}/courses`);
    return {
        props: {
            courses: data,
        },
    }
}

export default Courses;