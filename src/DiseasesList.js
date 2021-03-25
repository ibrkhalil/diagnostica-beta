import React from 'react'

const DiseasesList = (props) => {

    return <ul className="wrapper">

        {props.diseasesList.map(item => Object.keys(item).map((key, i) => {
            return <li>
                <div key={key}><p>{key + " " + item[key]}</p></div>
                {/* {props.diseasesList[key]} */}
            </li>
        }))
        }
    </ul>
}
export default DiseasesList