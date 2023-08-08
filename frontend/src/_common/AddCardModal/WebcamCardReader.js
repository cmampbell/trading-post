import React, { useRef, useState, useCallback, useEffect } from 'react';
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
*  The user can take a photo of their card by finding it with the camera and clicking the
*  capture photo button. Once the photo has been saved in state as imgSrc,
*  our useEffect callback runs.
*
*  We use Tesseract.recognize to scan the card for any english words it can find. For now,
*  we assume that the user has the card facing upright and the title of the card will be the
*  first thing read, because Tesseract will read left-> right, top -> bottom.
*
*  With this assumption we take the resulting array of found words, and find the first word
*  with a confidence score over 89, and the last word with a confidence score over 89,
*  and pass the string of results into getCardWithCamera(), which sends the card name guess
*  back to the searchBar component.
*
*/

const preProcessImage = async (imageSource) => {

    const image = await Image.load(imageSource);

    // might want to resize to give tesseract more to read
    const cropped = image.crop({ x: 80, y: 73, width: 460, height: 146 });
    // const resized = cropped.resize({ width: 820, height: 272 });
    const resized = cropped.resize({ width: 1380, height: 438 });
    const multiplied = resized.multiply(1.7);
    let grey = multiplied.grey();
    let blur = grey.gaussianFilter({ radius: 1 });
    let mask = blur.mask({ threshold: 0.48 });

    // return cropped.toDataURL();
    return mask.toDataURL();
}

const WebcamCardReader = ({ getCardWithCamera, closeCameraModal, setSearchInput }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    // add peice of state that tracks if webcam is loading or not
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (webcamRef.current) {
            setIsLoading(() => false);
        }
    }, [webcamRef])

    const capture = useCallback(async () => {
        const photo = webcamRef.current.getScreenshot({ height: 1280, width: 720 });
        const processedPhoto = await preProcessImage(photo);
        setImgSrc(()=> processedPhoto);
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
                videoConstraints={{
                    height: 1920,
                    width: 1080,
                }}
            />
            {!imgSrc && <>
                <Grid container spacing={8} sx={{ position: 'absolute', bottom: '0%' }}>
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
                </Grid>
            </>}

            {/* <img src={imgSrc} alt='card-scan-result' /> */}
        </Box >
    )
}



export default WebcamCardReader;