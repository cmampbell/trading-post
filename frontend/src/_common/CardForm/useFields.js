// we want to take an array of field components
// return an initial state for those fields
// we will need to define an object
// that will translate our fields into initial state

const useFields = (fieldArr, card={}) => {

    const fieldDictionary = {
        'FoilSelectField' : {
            name: 'foil',
            value: card.usd_price ? 'No' : card.usd_foil_price ? 'Yes' : 'Etched'
        },
        'QualitySelectField' : {
            name: 'quality',
            value: 'Lightly Played'
        },
        'QuantitySelectField' : {
            name: 'quantity',
            value: card.quantity || 1
        },
        'ForTradeField' : {
            name: 'forTrade',
            value: card.for_trade || false
        },
    }


    if(fieldArr && fieldArr.length > 0){
        return fieldArr.reduce((object, field) => {
            if(fieldDictionary[field.FIELD_NAME]){
                const {name, value} = fieldDictionary[field.name]
                object[name] = value
            }
            return object;
        }, {})
    } else {
        return {}
    }
}

export default useFields;