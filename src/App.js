import React, { useEffect,useState} from 'react';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import './App.css';
import SwiperCore, { Pagination } from 'swiper';
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
    height: "100%",
    // verticalAlign: "middle"
    // marginBottom:"25%",
    // minHeight: '80%',
  },
  
};





function App() {
  // const classes = useStyles();
  const [images, setImage] = useState([]);
  const [imageWidth, setImageWidth] = useState(400);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`https://res.cloudinary.com/keepup/image/list/swipeup.json`);
      console.log(response)
      let imageDataList = response.data.resources
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

  

  return (
    <SwipeableViews animateHeight containerStyle={styles.slideContainer} slideStyle={styles.slide}
     axis="y" enableMouseEvents resistance>
    {images.map((item) => 
    <div className="imageCard">
      <Image cloudName="keepup" secure publicId={item.public_id}
      responsive
      width={imageWidth.toString()}
      crop="scale"
      responsiveUseBreakpoints="true"
      styles={styles.slide}
      />
    </div>  
         )
       } 

 </SwipeableViews>
  );
}



export default App;
