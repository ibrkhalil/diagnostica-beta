import React from 'react'

const DiseasesList = (props) => {



    return <ul className="wrapper">

        {props.diseasesList.map(item => Object.keys(item).map((key, i) => {
            return <li className="SymList" key={key}>
                <div ><p>{key + " " + (item[key] * 100).toFixed(2) + "%"}</p></div>
                {/* {props.diseasesList[key]} */}
            </li>
        }))
        }
    </ul>
}
export default DiseasesList

