import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from "react-webcam";
import Tesseract from 'tesseract.js';
import { Image } from 'image-js';
import { Box } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

/* We are using tesseract.js for Optical Character Recognition. Docs: https://github.com/naptha/tesseract.js#tesseractjs
*  We are using react-webcam for webcam access. Docs: https://github.com/mozmorris/react-webcam
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

const WebcamCardReader = ({ getCardWithCamera, closeCameraModal, setSearchInput }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(async () => {
        const photo = webcamRef.current.getScreenshot({ height: 1280, width: 720 });
        const processedPhoto = await preProcessImage(photo)
        setImgSrc(processedPhoto);
    }, [webcamRef, setImgSrc]);

    useEffect(() => {
        if (imgSrc) {
            Tesseract.recognize(
                imgSrc, 'eng'
            ).catch(err => {
                console.error(err);
            }).then(result => {
                let words = result.data.words;
                console.log(result);
                // loop through words until we find a segment where confidence is above 90
                // start constructing string with first word where confidence is above 90
                // stop constructing string when element confidence is below 90

                let foundStart = false;
                let foundEnd = false
                const constructor = []
                for (let i = 0; !foundEnd && i < words.length; i++) {
                    let currentWord = words[i]
                    if (currentWord.confidence >= 89) {
                        constructor.push(currentWord.text);
                        if (!foundStart) foundStart = true;
                    } else if (foundStart && currentWord.confidence < 89) {
                        foundEnd = true;
                    }
                }
                const cardNameGuess = constructor.join(' ');
                if (cardNameGuess) setSearchInput(() => cardNameGuess)
                getCardWithCamera(cardNameGuess)
                closeCameraModal()
            })
        }
    }, [imgSrc])

    const preProcessImage = async (imageSource) => {

        const image = await Image.load(imageSource);

        // might want to resize to give tesseract more to read
        const cropped = image.crop({x: 80, y: 146, width: 460, height: 60})
        const resized = cropped.resize({width: 920, height: 120})

        let grey = resized.grey();
        let blur = grey.gaussianFilter({ radius: 1 });
        let mask = blur.mask({ threshold: 0.49 });

        console.log(mask.width)
        console.log(mask.height)

        // return cropped.toDataURL();
        return mask.toDataURL();
    }

    return (
        <>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '640px',
                width: '360px'
            }}>
                <Box sx={{
                    border: 'solid',
                    borderColor: 'red',
                    position: 'absolute',
                    height: '440px',
                    width: '304px',
                    top: '50px',
                    left: '30px',
                    zIndex: 2
                }}>
                </Box>
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
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat='image/png'
                    videoConstraints={{
                        height: 1920,
                        width: 1080,
                    }}
                    style={{ position: 'relative' }}
                />
                <button onClick={capture}>Capture photo</button>
                {/* <img src={imgSrc} /> */}
            </Box>
        </>
    )
}



export default WebcamCardReader;