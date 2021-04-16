// // import { /*يا دين مامي */ } from '@testing-library/react';
import React, { Component } from 'react'
import '../App';
import {Segment } from 'semantic-ui-react'
import { Progress } from 'reactstrap'
import {Collapse} from 'react-collapse';
// import react, {useState} from "react";
 import { v4 as uuidv4 } from 'uuid';

// import {UnmountClosed} from 'react-collapse';
import '../App.css'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';


class Analyze extends Component{
     constructor(){
          super()

    }
    // state = {
    //   shown: true,
    // }
    
    render(){
      

      // const handleClose = () => { this.setState({ show: false }) }
      // const handleShow = () => { this.setState({ show: true }) }
     
    //  state={
    //    isOpen:"",
    //    setIsOpen:""
       
    //  }
//     Collapse=()=>{
//   this.setState({
//     isOpen:"",
//     setIsOpen:""
//   })
//   <div className="collapsible">
//   <button className="toggel" onClick={()=> setState(!isOpen)}>
//     toggel
//   </button>
//   {isOpen && <div className="content">some content </div>}
// </div>
//     }
    

        return(
          
         
<div>
        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       This is result..
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <ul>
   { this.props.x.map((item) => (
                 <div className="containme" key={uuidv4()}>
                {/* <div> */}

                 <span>{item.Date}</span>
                 <span>{item.result}</span>
                 
                     {/* <Segment inverted> */}
                   <span> <Progress className="percentage"  animated  value={item.percentage} size='medium'  >
                   {item.percentage}%
                 </Progress></span>
                 {/* <Collapse isOpened={true || false}>             
  <div>Random content</div>
  </Collapse> */}
  {/* <UnmountClosed isOpened={true || false}>
  <div>Random content</div>
</UnmountClosed> */}

             </div>
            
           ))}
             </ul>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
{/* <button  className="collapsible"onClick={handleShow}>Open Collapsible</button>
<div className="content" show={this.state.show} onHide={handleClose}> */}
 {/* {this.state.shown ? "true" : "false"} */}

{/*             
             {isOpened=( content)=>{
                  content.this.nextElementSibling;
                if (content.style.display === "block") {
                  content.style.display = "none";
                } else {
                  content.style.display = "block";
                }
             }} */}
{/* </div> */}

 
           
          </div>
        )
    }
    
}
export default Analyze;





