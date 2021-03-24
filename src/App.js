import './App.css';
import React, { Component } from 'react'
// import axios from 'axios'
// import { TextField } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';
import features from './SymptomsOutput.json'
// import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select'
import SymptomsList from './SymptomsList'
import QuestionModal from './QuestionModal'
// import { v4 as uuidv4 } from 'uuid';
import {
  Container, Button
  // Card, CardBody,
  // CardTitle, Button, Container,
  // Row, Col, ButtonGroup, Input,
  // Form
} from 'reactstrap';
class App extends Component {
  // Terms of use Passphrase 
  valuedFeatures = features.map(feature => ({ ...feature, 'value': feature.text, 'label': feature.text }))
  // console.log(valuedFeatures.length);
  // console.log(uuidFeatures);
  state = {
    // uuidFeatures,
    valuedFeatures: this.valuedFeatures,
    sessionId: '',
    inputValue: '',
    selectedFeature: '',
    acceptedTerms: '',
    dataArr: [],
  }


  // async componentDidMount() {
  //   const [SessionRes, features] = await Promise.all([
  //     axios.get('http://api.endlessmedical.com/v1/dx/InitSession'),
  //     axios.get(`http://api.endlessmedical.com/v1/dx/GetFeatures/`)
  //   ]);
  //   const terms = `I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com`
  //   const SessionID = SessionRes.data.SessionID
  //   const acceptedTerms = await axios.post(`http://api.endlessmedical.com/v1/dx/AcceptTermsOfUse?SessionID=${SessionID}&passphrase=${terms}`)
  //   this.setState({
  //     features: features.data.data,
  //     sessionId: SessionID,
  //     acceptedTerms: acceptedTerms.status
  //   })
  // }
  // start() {
  //   const featureTextArr = [], featureLayTextArr = [], featureNameArr = [], featureTypeArr = [], featureDefaultArr = []
  //   for (let i = 0; i < features.length; ++i) {
  //     featureTextArr[i] = features[i].text
  //     featureLayTextArr[i] = features[i].laytext
  //     featureNameArr[i] = features[i].name
  //     featureTypeArr[i] = features[i].type
  //     featureDefaultArr[i] = features[i].default
  //   }
  //   return { textArr: featureTextArr, layText: featureLayTextArr, nameArr: featureNameArr, typeArr: featureTypeArr, defaultArr: featureDefaultArr }
  // }

  render() {
    this.handleChange = (selectedFeature) => {
      this.setState({
        selectedFeature: { ...selectedFeature }
      })

    }
    this.getDataArray = async (arr) => {
      const uniqueArr = Object.values(arr.reduce((acc, cur) => Object.assign(acc, { [cur.itemName]: cur }), {}))


      await this.setState({
        dataArr: uniqueArr
      })
      console.log(this.state.dataArr);
    }
    this.handleDelete = async (id) => {
      // console.log(id);
      await this.setState({ dataArr: this.state.dataArr.filter(symptom => symptom.itemId !== id) })
      console.log(this.state.dataArr);

    }

    return (
      <div className="App">
        <h1>Please Tell Diagnostica more medical info about you.</h1>
        <Container className='Diagnosis'>
          <Select placeholder="Select from the following values ..." options={this.state.valuedFeatures} value={this.state.selectedFeature} onChange={this.handleChange} />
          {this.state.selectedFeature && <QuestionModal buttonLabel="Ask" item={this.state.selectedFeature} getDataArray={this.getDataArray} />}
          {this.state.dataArr && <SymptomsList handleDelete={this.handleDelete} dataArray={this.state.dataArr} />}
          {this.state.dataArr[0] && <Button>Analyze</Button>}
        </Container>
      </div >
    )
  }
}

export default App;
