import React, { useEffect,useState} from 'react';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import './App.css';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

// Import Swiper styles
const styles = {
  slideContainer: {
    height: '100vh'
  },
  slide: {
    // padding: 15,
    margin:"auto",
    height: "100%",
    // verticalAlign: "middle"
    // marginBottom:"25%",
    // minHeight: '80%',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#E3DC4B',
  },
  scroll: {
    height: 100,
    overflow: 'scroll',
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10% 0 10% 0',
    height:'100%',
    width: '100%'
  }
}));



function App() {
  const classes = useStyles();
  const [images, setImage] = useState([]);
  const [imageWidth, setImageWidth] = useState(400);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`http://res.cloudinary.com/keepup/image/list/swipeup.json`);
      console.log(response)
      let imageDataList = response.data.resources
      setImage([...imageDataList])
      setIsLoading(false)

    }
    fetchData();
  }, [])
  

  useEffect(() => {
    function handleResize() {
      setImageWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize);
    handleResize()
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChangeIndex = (index) => {
    setIndex(index+1);
  };

  function slideRenderer(params) {
    const { index, key } = params;

        if (index < 0){
            return (<div></div>)
        }

        return (
        
            <div key={index} className="imageCard">
            <Image cloudName="keepup" publicId={images[index].public_id}
            responsive
            width={imageWidth.toString()}
            crop="scale"
            responsiveUseBreakpoints="true"
            styles={styles.slide}
            />
            </div>
    )
   
    }
  
    
  

  

  return (
        <div>
        {!isLoading && (
        <VirtualizeSwipeableViews
          index={index}
          onChangeIndex={handleChangeIndex}
          slideRenderer={slideRenderer}
          enableMouseEvents
          overscanSlideBefore={0}
          axis="y"
          animateHeight
          containerStyle={styles.slideContainer}
        />)
        }

        {
            isLoading && <p>Loading...</p>
        }
        </div>

    

  );
}
<CloudinaryContext cloudName="keepup">

 </CloudinaryContext>



{/* <Swiper
onSlideChange={() => console.log('slide change')}
pagination={{el: '.swiper-pagination', clickable: true }}

onSwiper={(swiper) => console.log(swiper)}
direction={'vertical'}
>
{
images.map((item) => 
<SwiperSlide >
<Image key={item.public_id} cloudName="keepup" publicId={item.public_id} 
    dpr="auto"
    responsive
    width="auto"
    crop="scale"
    responsiveUseBreakpoints="true"
    className="swipeup-card"
    />
</SwiperSlide>
)
}
<div className="swiper-pagination"></div>


</Swiper> */}
export default App;
