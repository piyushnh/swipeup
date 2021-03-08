import React, { useEffect,useState} from 'react';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import './App.css';
import SwiperCore, { Pagination } from 'swiper';
import ReactGA from 'react-ga';

import SwipeAnimation from './components/SwipeAnimation';
// import { makeStyles } from '@material-ui/core/styles';

SwiperCore.use([Pagination]);

// Import Swiper styles
const styles = {
  slideContainer: {
    height: '100vh',
  },
  slide: {
    // padding: 15,
    // margin:"auto",
    height: "100vh",
    // verticalAlign: "middle"
    // marginBottom:"25%",
    // minHeight: '80%',
  },
  
};





function App() {
  // const classes = useStyles();
  const [images, setImage] = useState([]);
  const [imageWidth, setImageWidth] = useState(400);
  const [swipeCount, setSwipeCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let responseFirst = await axios.get(`https://res.cloudinary.com/snackapp/image/list/first.json`);
      let responseRest = await axios.get(`https://res.cloudinary.com/snackapp/image/list/swipeup.json`);
      let firstData = responseFirst.data.resources
      let restData = responseRest.data.resources
      let imageDataList = firstData.concat(restData)
      setImage([...imageDataList])

    }
    fetchData();
  }, [])

  useEffect(() => {
    function handleResize() {
      let windowWidth = window.innerWidth;
      if (windowWidth <= 1000){
        setImageWidth(windowWidth)
      }
      else{
        setImageWidth(900)
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize()
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onSwipe = () => {
    let updatedCount = swipeCount + 1;
    setSwipeCount(updatedCount)

    ReactGA.event({
      category: 'User',
      action: 'Swiped',
    });
  }

  

  return (
    <SwipeableViews containerStyle={styles.slideContainer} slideStyle={styles.slide}
      onChangeIndex = {onSwipe}
     axis="y" enableMouseEvents resistance >
    {images.map((item, index) => 
    <div>
    <div className="imageCard">
      <Image cloudName="snackapp" secure publicId={item.public_id}
      dpr="auto"
      responsive
      width={imageWidth.toString()}
      responsiveUseBreakpoints="true"
      quality="100"
      />
      
    </div>
    {index == 0 && <SwipeAnimation />}
    </div>
         )
       } 

 </SwipeableViews>
  );
}



export default App;
