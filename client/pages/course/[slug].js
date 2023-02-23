import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import SingleCourseHero from "../../components/ui/SingleCourseHero";
import PreviewModal from "../../components/modals/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import {Context} from '../../context';
import {toast} from 'react-toastify';
import {loadStripe} from '@stripe/stripe-js';
import Link from 'next/link';
import { Grid, Paper, Typography, Button } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { currencyFormatter } from "../../../server/utills/helpers";

import { useTheme } from '@mui/styles';
import {useMediaQuery} from '@mui/material';
import "video-react/dist/video-react.css"; 


const SingleCourse = ({course}) => {


    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const [preview, setPreview] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [previewTitle, setPreviewTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [enrolled, setEnrolled] = useState({});
    const {lessons} = course;

    const [previewClicked, setPreviewClicked] = useState(-1);

    const {state: {user} } = useContext(Context);

    const checkEnrollment = async () => {
        const {data}  = await axios.get(`/api/check-enrollment/${course._id}`);

        setEnrolled(data);
        
    }

    useEffect(() => {
        // console.log(user)
        if(user && course) {
            checkEnrollment();
        };

    }, [user, course]);

    
    const router = useRouter();
    const { slug } = router.query;

    const handlePreviewDialog = (event) => {

        const lesson = event.target.getAttribute('data-free-lesson');

        setShowModal(!showModal);
        setPreviewClicked(lesson == null ? 0 : lesson);

    
    }

    const handlePaidEnrollment = async (e) => {
        // console.log('handle paid enrollment');
        e.preventDefault();

        try {
            setLoading(true);
            // check if the user is logged in
            if(!user) router.push('/login');

            // check if already enrolled
            if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`);

            const {data} = await axios.post(`/api/paid-enrollment/${course._id}`);
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
            
            stripe.redirectToCheckout({sessionId: data});
            
            setLoading(false);
        } catch(err) {
            toast('Enrollment failed. Try again');
            // console.log(err);
            setLoading(false);
        }
    }

    const handleFreeEnrollment = async (e) => {

        // console.log('handle free enrollment');
        e.preventDefault();

        try {
            // check if the user is logged in
            if(!user || user == null) window.location.href = '/login?redirect_url='+window.location.href;

            // check if already enrolled
            if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`);

            setLoading(true);

            const {data} = await axios.post(`/api/free-enrollment/${course._id}`);
            toast(data.message);
            setLoading(false);
            if(data.status) return router.push(`/user/course/${data.course.slug}`);
        } catch (err) {
            toast('Enrollment failed. Try again');
            setLoading(false);
        }
    
    }

    
    return (
        <>
          <Grid container>
            <SingleCourseHero course={course} showModal={showModal} setShowModal={setShowModal} 
                    preview={preview}
                    setPreviewTitle={setPreviewTitle}
                    setPreview={setPreview}
                    user={user}
                    loading={loading}
                    handlePaidEnrollment={handlePaidEnrollment}
                    handleFreeEnrollment={handleFreeEnrollment}
                    enrolled={enrolled}
                    setEnrolled={setEnrolled}
                    handlePreviewDialog={handlePreviewDialog}
                /> 
                <PreviewModal course={course} showModal={showModal} setShowModal={setShowModal} preview={preview} previewTitle={previewTitle}
                    setPreview={setPreview} setPreviewTitle={setPreviewTitle} lessons={lessons}
                    previewClicked={previewClicked} setPreviewClicked={setPreviewClicked}
                />
          </Grid>


           

            <Grid container direction={matchesSM ? 'column-reverse' : 'row'}
                sx={{
                    marginTop: 8

                }}
            >


                <Grid item
                    sx={{
                        flexGrow: 1,
                        maxWidth: matchesSM ? '100%': '70%',
                        paddingLeft: matchesSM ? '1rem': '3rem'
                    }}
                >
                {course.lessons && (
                    <SingleCourseLessons lessons={course.lessons} handlePreviewDialog={handlePreviewDialog}
                    />
                )}
                </Grid>




            </Grid>
        </>
        )
}


export async function getServerSideProps ({query}) {
    // console.log(query);
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`);
    return {
        props: {
            course: data,
        },
    }
};

export default SingleCourse;