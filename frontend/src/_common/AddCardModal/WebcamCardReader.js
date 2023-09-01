import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import Webcam from "react-webcam";
import { Image } from 'image-js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import readCard from './readCard';

/* We are using react-webcam for webcam access. Docs: https://github.com/mozmorris/react-webcam
*  We are using image-js for image pre-processing. Docs: https://image-js.github.io/image-js/#image
*
*  This component opens if user clicks the camera button in <Searchbar/>.
*
*  Once <Webcam/> loads, the user can take a photo of a Magic card
*  by placing the card inside the displayed guide box, and clicking the
*  capture photo button. This captures a 1280px x 720px using <Webcam/>
*  
*  After the photo is captured, we call preProcessImage and pass the photo in
*  as the only argument. Using image-js Image class, we load a new image from the
*  photo. We use methods on the new Image class to crop the card image down to the
*  title area, then resize the cropped image for readability, brighten the image,
*  grayscale the image, blur to eliminate camera noise, and then normalize the pixels
*  to white or black based on a brightness threshold. This is all to help with
*  readability when we use Tesseractjs.
*
*  We then call readCard to use Tesseract, which returns a string with the
*  found card title. We pass that into getCardWithCamera, which is coming from
*  <Searchbar/> to make a request to the API for card results. Then we close the
*  <WebcamCardReader/> modal.
*
*  State:
*       imgSrc - where we store the captured photo. useful for testing so we can see
*                the photo captured or processed.
*       isLoading - boolean to track if <Webcam/> is loading or not.
*
*  Props:
*       getCardWithCamera - function we call when we have a result from readCard. Pass
*                           in result from Tesseract up to <Searchbar />
*       closeCameramodal - function to set <WebcamCardReader/> modal to close
*/

// Takes an image, and applies filters to prepare the photo to be read by Tesseractjs
const preProcessImage = async (imageSource) => {

    const image = await Image.load(imageSource);
    const cropped = image.crop({ x: 80, y: 73, width: 460, height: 146 });
    const resized = cropped.resize({ width: 1380, height: 438 });
    const grey = resized.grey();
    const blur = grey.gaussianFilter({ radius: 1 });
    const mask = blur.mask({ threshold: 0.51 });

    return mask.toDataURL();
}

const WebcamCardReader = ({ getCardWithCamera, closeCameraModal }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isMobile } = useOutletContext();

    // this is a temporary fix for a bug in react-webcam
    // on mobile, height and width are flipped.
    // issue is detailed here:
    // https://github.com/mozmorris/react-webcam/issues/299
    const videoConstraints = isMobile ? {
        height: 1080,
        width: 1920,
        facingMode: { exact: "environment" },
    } : {
        height: 1920,
        width: 1080,
        facingMode: 'user',
    };

    useEffect(() => {
        if (webcamRef.current) {
            setIsLoading(() => false);
        }
    }, [webcamRef]);

    const capture = useCallback(async () => {

        const photo = webcamRef.current.getScreenshot({ height: 1280, width: 720 });
        const processedPhoto = await preProcessImage(photo);

        setImgSrc(() => processedPhoto);
        const result = await readCard(processedPhoto);
        console.log(result);

        getCardWithCamera(result);
        closeCameraModal();
    }, [webcamRef, setImgSrc]);

    return (
        // the parent box gives the camera it's dimensions
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '640px',
                width: '360px',
                backgroundColor: 'white',
            }}>
            {isLoading && <Typography variant='subtitle1'> Loading camera...</Typography>}
            {/* This box provides card placement guide */}
            <Box
                sx={{
                    border: 'solid',
                    borderColor: '#d86409',
                    position: 'absolute',
                    height: '440px',
                    width: '304px',
                    top: '50px',
                    left: '30px',
                    zIndex: 2
                }}>
            </Box>
            {/* This box shows the cropped area of the photo, used for testing */}
            {/* <Box sx={{
                            border: 'solid',
                            borderColor: 'red',
                            position: 'absolute',
                            height: '30px',
                            width: '230px',
                            top: '73px',
                            left: '40px',
                            zIndex: 2
                        }}></Box> */}
            <Typography
                variant='h5'
                style={{ backgroundColor: 'white', textAlign: 'center' }}
            >
                Place card borders inside outline
            </Typography>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/png'
                videoConstraints={videoConstraints}
            />
            {!imgSrc && <>
                <Grid container spacing={8} sx={{ position: 'absolute', bottom: '10%' }}>
                <Grid item xs={6}>
                        <Button
                            onClick={closeCameraModal}
                            color='error'
                            variant='contained'
                            sx={{
                                width: '100%'
                            }}
                        >
                            Close Camera
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={capture}
                            color='primary'
                            variant='contained'
                            sx={{
                                width: '100%'
                            }}
                        >
                            Take Photo
                        </Button>
                    </Grid>

                </Grid>
            </>}
            {/* this <img/> will display imgSrc, used for manual testing */}
            {/* <img src={imgSrc} alt='card-scan-result' /> */}
        </Box >
    )
};

export default WebcamCardReader;