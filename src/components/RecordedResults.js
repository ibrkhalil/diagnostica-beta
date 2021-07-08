import React, { Component, useState, useEffect } from 'react';
import { Button, Collapse, ListGroupItem } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import { easeQuadInOut } from 'd3-ease';

// import "react-circular-progressbar/dist/styles.css";

// import AnimatedProgressProvider from "./AnimatedProgressProvider";

import 'react-circular-progressbar/dist/styles.css';
import '../App.css';



const RecordedResults = (props) => {

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const toggle = (Key) => setCollapse(!collapse);




  useEffect(() => {
    fetch('http://localhost:3001/RecordedList')
      .then(res => res.json())
      .then(result => {

        setIsLoaded(true);
        setItems(result);
      });
  }, []);

  if (!isLoaded) {
    return <div> No Data to Show </div>
  }
  else {
    return (
      <div className="RRbody">
        <div className="RRContainer">
          <h1 className="HPargh">Diagnosis Past Results</h1>
          <ul >
            {items.map((item, i) => (
              <li className="DDate" id={item.Rid} >
                <p className="Datepargh">Diagnosis Date: {item.ResultDate} </p>
                <Button key={item.Rid} id={item.Rid} className="showlist"
                  onClick={toggle}>

                </Button>
                <Collapse in={collapse} >
                  <ul id={item.id}>
                    {item.Results.map((sub) =>
                      <li className="ResultLi" key={sub.id} id={sub.id}>
                        {sub.DiseaseName}
                        {/* <div className="ProgPar" style={{ width: 50, height: 50 }}> */}
                        <div className="ProgPar">
                          <CircularProgressbar value={sub.percentages} text={`${sub.percentages}%`} />
                        </div>
                        {/* <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={sub.percentages}
                        duration={1.4}
                        easingFunction={easeQuadInOut}
                        repeat
                      >
                        {value => {
                          const roundedValue = Math.round(value);
                          return (
                            <CircularProgressbar
                              value={sub.percentages}
                              text={`${roundedValue}%`}
                              styles={buildStyles({ pathTransition: "none" })}
                            />
                          );
                        }}
                      </AnimatedProgressProvider> */}
                      </li>
                    )}
                  </ul>
                </Collapse>





              </li>
            ))}
          </ul>


        </div>
      </div>
    )
  }

}

export default RecordedResults;
