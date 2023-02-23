import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Badge from '@mui/material/Badge';

import Link from "next/link";

import { currencyFormatter } from "../../../server/utills/helpers";
import { useTheme } from '@mui/styles';
import { useMediaQuery} from '@mui/material';

import Image from 'next/image'



const CourseCard = ({course}) => {
    const { title, instructor, price, image, slug, paid, category, description} = course;


    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    
    return <Link href={"/course/"+slug}>
        <a>
        <Card sx={{ 
            maxWidth: '100%', 
            height: '100%', 
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            padding: matchesSM ? '1rem 0' : '1rem 0',
            backgroundColor: 'rgb(190 211 222 / 71%)'
        }}>
            <CardActionArea>
                
                    <Image 
                        src={image && image.Location ? image.Location  : '/course.png'}
                        height={222}
                        width={420}
                        alt={title}
                        loading="lazy"
                    />
                <CardContent>
                <Typography gutterBottom variant="h5"
                    sx={{
                        color: '#1c27c0'
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description.substring(0, 109)+(description.length > 109 ? "..." : '')}
                    
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{
                    color: '#03a9f4',
                    padding: 0,
                    paddingLeft: '1rem',
                }}
                >
             
                <Button size="large">
                <Badge color="primary" badgeContent={paid ? currencyFormatter({
                            amount: price,
                            currency: 'usd'
                        }) : 'Free'}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    sx={{ margin: matchesSM ? '0' : undefined ,  "& .MuiBadge-badge": {  backgroundColor: '#8356bf',fontSize: '1rem', height: 30, padding: '10px' } }}
                ></Badge>
                </Button>

                <Button size="small">
                    <Typography gutterBottom variant="h5"
                        sx={{
                            margin: 0,
                        }}
                    >
                        {category}
                    </Typography>
                </Button>

            </CardActions>
        </Card>

        </a>
    </Link>
}

export default CourseCard;