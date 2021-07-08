import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
const SymptomsList = (props) => {
    return (
        <ul className="wrapper">
            {/* {console.log(props.dataArray)} */}
            {props.dataArray.map(symptom => <li className="SymList" key={symptom.itemId}>{symptom.itemName + ": " + (symptom.itemDescription ? (symptom.itemDescription) : symptom.itemValue)} <FontAwesomeIcon className="faIcon" onClick={() => props.handleDelete(symptom)} icon={faTimesCircle} /> </li>)}
            {/* { props.dataArray = null} */}
        </ul>
    )
}



export default SymptomsList


