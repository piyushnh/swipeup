import React, { useEffect,useState} from 'react';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  slideContainer: {
    height: '100vh',
    // marginTop: '25%'
  },
  slide: {
    // padding: 15,
    marginTop:"10vh",
    marginBottom:"10vh",
    minHeight: '80vh',
    color: '#fff',
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


function App() {

  const [images, setImage] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`http://res.cloudinary.com/keepup/image/list/test.json`);
      console.log(response)
      let imageList = response.data.resources
      setImage([...imageList])
    }
    fetchData();
  }, [])

  return (
    <SwipeableViews containerStyle={styles.slideContainer} axis="y" enableMouseEvents resistance>
 
     <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
    <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
    <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
  {/* <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div> */}
  </SwipeableViews>
  );
}
{/* <div>
<CloudinaryContext cloudName="keepup">
<SwipeableViews containerStyle={styles.slideContainer} axis="y" enableMouseEvents>
    {images.map((item) => 
         <Image publicId={item.public_id} style={Object.assign({}, styles.slide, styles.slide1)} />
         )
       } 
    <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
<div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
 <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
 </SwipeableViews>
 </CloudinaryContext>
</div> */}
export default App;
