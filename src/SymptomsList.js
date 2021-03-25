import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
const SymptomsList = (props) => {
    return (
        <ul>
            {/* {console.log(props.dataArray)} */}
            {props.dataArray.map(symptom => <li key={symptom.itemId}>{symptom.itemName + ": " + (symptom.itemDescription ? (symptom.itemDescription) : symptom.itemValue)} <FontAwesomeIcon onClick={() => props.handleDelete(symptom)} icon={faTimesCircle} /> </li>)}
        </ul>
    )
}



export default SymptomsList


