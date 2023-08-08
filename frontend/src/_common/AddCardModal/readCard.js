import { createWorker } from 'tesseract.js';

/* We are using tesseract.js for Optical Character Recognition.
*  Docs: https://github.com/naptha/tesseract.js#tesseractjs
*/


/* parseSymbolResults takes an array of symbol data from Tesseract results
*  and returns a string based on the words associated with that symbol.
*  [{word: {text: 'Example'}, confidence: 98}, {word: {text: 'Input'}, confidence: 98},]
*     ==> 'Example Input 
*/
const parseSymbolResults = symbols => {
    // If there are no symbols, return message
    if(symbols.length < 1) return 'Unable to read text from photo';

    // wordSet is a container for unique words found in the text,
    // kept in insertion order.
    const wordSet = new Set();

    // We want to track when we find the start of a confident series
    // of symbols, and when we find the end
    let foundStart = false;
    let foundEnd = false;

    // loop ends when we found the end of a series of confident symbols
    // or when we loop through all symbols
    for (let i = 0; !foundEnd && i < symbols.length; i++) {
        let currentSymbol = symbols[i]
        // if tesserace is 96% confident in the symbol result
        if (currentSymbol.confidence >= 96) {
            // we check if the set has the word already
            if (!wordSet.has(currentSymbol.word.text.trim())) {
                // add the word tesseract associates with that symbol to wordSet
                // trim off any whitespace tesseract may have misread
                wordSet.add(currentSymbol.word.text.trim());
            }
            // set found start
            if (!foundStart) foundStart = true;
        } else if (foundStart && currentSymbol.confidence < 96) {
            foundEnd = true;
        }
    }

    const fullString = [];

    wordSet.forEach((value)=> fullString.push(value));

    return fullString.join(' ');
}

const readCard = async (image) => {
    const worker = await createWorker({
        // langPath is for traineddata, could train it on magic font
    })
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
        tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 '
    });
    let result = await worker.recognize(image);
    await worker.terminate();
    return parseSymbolResults(result.data.symbols);
}

export default readCard;