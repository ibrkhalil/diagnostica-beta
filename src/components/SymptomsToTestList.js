import React from 'react'

const SymptomsToTestList = (props) => {
    return (
        <ul>
            {props.suggestedFeatures.map(symptomToTestArr => <li key={symptomToTestArr[3]}>{symptomToTestArr[1]}</li>)}
        </ul>
    )
}

export default SymptomsToTestList
