import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from "react-webcam";
import Tesseract from 'tesseract.js';
import Api from './Api'

const WebcamCardReader = ( { getCardWithCamera, closeCameraModal }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const photo = webcamRef.current.getScreenshot();
        setImgSrc(photo);
    }, [webcamRef, setImgSrc]);

    useEffect(() => {
        if (imgSrc) {
            Tesseract.recognize(
                imgSrc, 'eng', {
                logger: message => console.log(message)
            }
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
                const constructor =[]
                for (let i = 0; !foundEnd && i < words.length; i++) {
                    let currentWord = words[i]
                    if (currentWord.confidence > 89) {
                        constructor.push(currentWord.text);
                        if (!foundStart) foundStart = true;
                    } else if (foundStart && currentWord.confidence < 89) {
                        foundEnd = true;
                    }
                }
                const cardNameGuess = constructor.join(' ');
                console.log(cardNameGuess)
                // if (cardNameGuess) setSearchInput(()=> cardNameGuess) 
                getCardWithCamera(cardNameGuess)
                closeCameraModal()
            })
        }
    }, [imgSrc])

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/png'
            />
            <button onClick={capture}>Capture photo</button>
        </>
    )
}



export default WebcamCardReader;