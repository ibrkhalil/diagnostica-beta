import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const SymptomsList = (props) => {
    return (
        <ul>
            {props.dataArray.map(symptom => <li key={uuidv4()}>{symptom.itemName + ": " + (symptom.itemDescription ? (symptom.itemDescription) : symptom.itemValue)}</li>)}
        </ul>
    )
}

export default SymptomsList
