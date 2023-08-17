/* Custom hook to create an object we can use in <CardForm/> for initialize state.
*
*  We define a dictionary that we use when creating our object. The dictionary
*  translates FormInput fields into key-value pairs.
*
*  We sometimes need the card object to populate the form with current saved values.
*/

const useFields = (fieldArr, card={}) => {

    const fieldDictionary = {
        'FoilSelectField' : {
            name: 'foil',
            value: card.usd_price ? 'No' : card.usd_foil_price ? 'Yes' : 'Etched',
        },
        'QualitySelectField' : {
            name: 'quality',
            value: 'Lightly Played',
        },
        'QuantitySelectField' : {
            name: 'quantity',
            value: card.quantity || 1,
        },
        'ForTradeField' : {
            name: 'forTrade',
            value: card.for_trade || false,
        },
    };


    if(fieldArr && fieldArr.length > 0){
        return fieldArr.reduce((object, field) => {
            if(fieldDictionary[field.FIELD_NAME]){
                const {name, value} = fieldDictionary[field.FIELD_NAME];
                object[name] = value;
            }
            return object;
        }, {});
    } else {
        return {};
    };
};

export default useFields;