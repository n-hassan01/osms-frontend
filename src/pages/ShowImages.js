/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-key */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable global-require */
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const ShowImages = () => {
//   const [imageList, setImageList] = useState([]);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:5001/images/files');
//       console.log('Complete Response from backend:', response);

//       // Check if response.data.rows is an array containing image data
//       if (Array.isArray(response.data.rows)) {
//         const images = response.data.rows.map(image => ({
//           ...image,
//           file_data: `data:${image.mimetype};base64,${image.file_data.data}`
//         }));
//         setImageList(images);
//       } else {
//         console.error('Invalid data received from backend:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Image Gallery</h2>
//       <div className="image-container">
//         {imageList.map(image => (
//           <div key={image.id} className="image-item">
//             <p>{image.originalname}</p>
//             <img src={image.file_data} alt={image.originalname} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShowImages;

// // import React from 'react';

// // import { Button, MobileStepper, Paper, Typography, useTheme } from '@mui/material';
// // import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// // import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

// // // Collection of images with their labels and paths
// // const MyCollection = [
// //   {
// //     label: 'First Picture',
// //     imgPath: 'https://media.geeksforgeeks.org/wp-content/uploads/20210208000010/1.png',
// //   },
// //   {
// //     label: 'Second Picture',
// //     imgPath: 'https://media.geeksforgeeks.org/wp-content/uploads/20210208000009/2.png',
// //   },
// //   {
// //     label: 'Third Picture',
// //     imgPath: 'https://media.geeksforgeeks.org/wp-content/uploads/20210208000008/3.png',
// //   },
// // ];

// // const ShowImages = () => {
// //   const CollectionSize = MyCollection.length;
// //   const theme = useTheme();
// //   const [index, setActiveStep] = React.useState(0);

// //   // Function to go to the next picture
// //   const goToNextPicture = () => {
// //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
// //   };

// //   return (
// //     <div
// //       style={{
// //         marginLeft: '40%',
// //       }}
// //     >
// //       <h2>How to Create Image Slider in ReactJS?</h2>
// //       <div
// //         style={{
// //           maxWidth: 400,
// //           flexGrow: 1,
// //         }}
// //       >
// //         <Paper
// //           square
// //           elevation={0}
// //           style={{
// //             height: 50,
// //             display: 'flex',
// //             paddingLeft: theme.spacing(4),
// //             backgroundColor: theme.palette.background.default,
// //             alignItems: 'center',
// //           }}
// //         >
// //           <Typography>{MyCollection[index].label}</Typography>
// //         </Paper>
// //         <img
// //           src={MyCollection[index].imgPath}
// //           style={{
// //             height: 255,
// //             width: '100%',
// //             maxWidth: 400,
// //             display: 'block',
// //             overflow: 'hidden',
// //           }}
// //           alt={MyCollection[index].label}
// //         />
// //         <MobileStepper
// //           variant="text"
// //           position="static"
// //           index={index}
// //           steps={CollectionSize}
// //           nextButton={
// //             <Button size="small" onClick={goToNextPicture} disabled={index === CollectionSize - 1}>
// //               Next
// //               {theme.direction !== 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
// //             </Button>
// //           }
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShowImages;

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { getImageService } from '../Services/ApiServices';
import { useUser } from '../context/UserContext';
// Import the images at the beginning of your file

const ShowImages = () => {
  const { user } = useUser();
  console.log(user);
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(user);
        if (user) {
          const images = await getImageService(user);
          console.log(images.data);
          setImageList(images.data);
          console.log(images);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [user]);

  console.log(imageList);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      <div className="image-container">
        <Slider {...sliderSettings}>
          {/* {imageList.length > 0 ? ( */}
          {
            imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  src={require(`../../../../../OSMS/osms-frontend/osms-frontend/src/resources/img/${image}`)}
                  alt={'Promotion'}
                />
              </div>
            ))
            // ) : (
            //   <div className="image-item">
            //     <img src={image1} alt="" />
            //   </div>
            // )}
          }
        </Slider>
      </div>
    </div>
  );
};

export default ShowImages;
