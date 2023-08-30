import { createWorker } from 'tesseract.js';

/* parseSymbolResults takes an array of symbol data from Tesseract results
*  and returns a string based on the words associated with that symbol.
*
*  If tesseract did not find any symbols, we return 'Unable to read text from photo'
*
*  Using a new Set, we collect the words tesseract has found that are associated with
*  symbols that have a confidence rating of 96 or above.
*
*  When we find the first confident symbol in our data, we set a boolean to true and start
*  adding words into our wordSet. When we reach a symbol with low confidence, we end the loop
*  and the words in our set will make up our card name.
*
*  We then take wordSet, and use .forEach to create an array of the words found by Tesseract,
*  and use that array to build our string
*
*  ex:
*  [{symbol: 'C', word: {text: 'Cat'}, confidence: 98},
*   {symbol: 'a', word: {text: 'Cat'}, confidence: 98},
*   {symbol: 't', word: {text: 'Cat'}, confidence: 98}, 
*   {symbol: 'H', word: {text: 'Hat'}, confidence: 98},
*   {symbol: 'a', word: {text: 'Hat'}, confidence: 98},
*   {symbol: 't', word: {text: 'Hat'}, confidence: 98},
*   {symbol: 'F', word: {text: 'Fvrr'}, confidence: 30}]
*     ==> 'Cat Hat'
*/

const parseSymbolResults = symbols => {
    // If there are no symbols, return message
    if (symbols.length < 1) return 'Unable to read text from photo';

    const wordSet = new Set();
    let foundStart = false;
    let foundEnd = false;

    for (let i = 0; !foundEnd && i < symbols.length; i++) {
        let currentSymbol = symbols[i]
        if (currentSymbol.confidence >= 96) {
            if (!wordSet.has(currentSymbol.word.text.trim())) {
                wordSet.add(currentSymbol.word.text.trim());
            }
            if (!foundStart) foundStart = true;
        } else if (foundStart && currentSymbol.confidence < 96) {
            foundEnd = true;
        }
    }

    const fullString = [];

    wordSet.forEach((value) => fullString.push(value));

    return fullString.join(' ');
}

/* We are using tesseract.js for Optical Character Recognition.
*  Check docs for explanation of createWorker/worker
*  Docs: https://github.com/naptha/tesseract.js#tesseractjs
*/
const readCard = async (image) => {
    const worker = await createWorker({
        // langPath is for traineddata, could train it on magic font
    })
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
        // Only return the characters in this string, including spaces, hypens, and apostrophes
        tessedit_char_whitelist: `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-' `
    });
    let result = await worker.recognize(image);
    await worker.terminate();
    return parseSymbolResults(result.data.symbols);
}

export default readCard;