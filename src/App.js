import React, { useEffect,useState} from 'react';
import {Image} from 'cloudinary-react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import SwiperCore, { Pagination } from 'swiper';
import ReactGA from 'react-ga';
import { Mixpanel } from './MixPanel';

import './App.css';


// import {
//   FacebookIcon,
//   RedditIcon,
//   TelegramIcon,
//   TwitterIcon,
//   WhatsappIcon,
// } from "react-share";

// import {
//   RedditShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   FacebookShareButton
// } from "react-share";

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
  const url = 'https://snackapp.in/';
  const [images, setImage] = useState([]);
  const [imageWidth, setImageWidth] = useState(400);
  // const [swipeCount, setSwipeCount] = useState(0);
  console.log(process.env.NODE_ENV);

  useEffect(() => {
    async function fetchData() {
      let responseFirst = await axios.get(`https://res.cloudinary.com/snackapp/image/list/first.json`);
      let firstData = responseFirst.data.resources
      setImage([...firstData])
      
      let responseRest = await axios.get(`https://res.cloudinary.com/snackapp/image/list/swipeup.json`);
      let restData = responseRest.data.resources
      let imageDataList = firstData.concat(restData)
      await new Promise(resolve => setTimeout(resolve, 4000));
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

    Mixpanel.track('Swiped');

    ReactGA.event({
      category: 'User',
      action: 'Swiped',
    });
  }

  const normalImage = (item) => (
    <div className="imageCard"> 
      <Image cloudName="snackapp" secure publicId={item.public_id}
      dpr="auto"
      responsive
      width={imageWidth.toString()}
      responsiveUseBreakpoints="true"
      quality="100"
      key={item.public_id}
      />
    </div>

  )
  
  const lazyImage = (item) => (
    <div className="imageCard"> 
      <Image cloudName="snackapp" secure publicId={item.public_id}
      dpr="auto"
      responsive
      width={imageWidth.toString()}
      responsiveUseBreakpoints="true"
      quality="100"
      loading="lazy"
      />
    </div>

  )
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  async function waitTimer(){
    let res = await  new Promise(resolve => setTimeout(resolve, 1000));
    return <div></div>
  }

  

  return (
    <SwipeableViews containerStyle={styles.slideContainer} slideStyle={styles.slide}
      onChangeIndex = {onSwipe}
     axis="y" enableMouseEvents resistance >
    {images.map((item, index) => 
    <div>
    
    {normalImage(item)}

    <SwipeAnimation />
    </div>
         )
      } 

 </SwipeableViews>
  );
}



export default App;
