import './App.css';
import React, { Component } from 'react'
import axios from 'axios'
// import { TextField } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';
import features from './SymptomsOutput.json'
import SymptomsToTestList from './SymptomsToTestList'
// import { v4 as uuidv4 } from 'uuid';
import DiseasesList from './DiseasesList'
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
    suggestedFeaturesToAsk: [],
    acceptedTerms: '',
    DiseasesResult: [],
    dataSentFlag: false,
    dataArr: [],
    deletedItems: []
  }

  async componentDidMount() {
    const [SessionRes] = await Promise.all([
      axios.get('http://api.endlessmedical.com/v1/dx/InitSession'),
    ]);
    const terms = `I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com`
    const SessionID = SessionRes.data.SessionID
    const acceptedTerms = await axios.post(`http://api.endlessmedical.com/v1/dx/AcceptTermsOfUse?SessionID=${SessionID}&passphrase=${terms}`)
    // console.log(SessionID);
    await this.setState({
      sessionId: SessionID,
      acceptedTerms: acceptedTerms.status
    })
  }

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
    this.sendFeaturesData = async () => {
      //Sends Collected Symptoms to the API and logs Ok for each successfully sent symptom
      await this.state.dataArr.map(feature => axios.post(`http://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID=${this.state.sessionId}&name=${feature.itemName}&value=${feature.itemValue}`).then(res => console.log(res.data.status)))

      this.setState({
        dataSentFlag: true
      })
    }

    this.analyze = async () => {
      await axios.get(`http://api.endlessmedical.com/v1/dx/Analyze?SessionID=${this.state.sessionId}`).then(res => this.setState({ DiseasesResult: res.data.Diseases }))
      console.log(this.state.DiseasesResult);
    }

    this.handleGetAdditionalTests = async () => {
      //Getting Suggested Tests
      await axios.get(`http://api.endlessmedical.com/v1/dx/GetSuggestedFeatures_PatientProvided?SessionID=${this.state.sessionId}`).then(res => this.setState({ suggestedFeaturesToAsk: res.data.SuggestedFeatures }))
      console.log(this.state.suggestedFeaturesToAsk);
    }

    this.handleChange = (selectedFeature) => {
      this.setState({
        selectedFeature: { ...selectedFeature }
      })

    }
    this.getDataArray = async (arr, deletedSymptom = null) => {

      let uniqueArr = Object.values(arr.reduce((acc, cur) => Object.assign(acc, { [cur.itemName]: cur }), {}))

      if (deletedSymptom) {
        uniqueArr.filter(symptom => symptom.itemId !== deletedSymptom.itemId)
      }

      await this.setState({
        dataArr: uniqueArr,
        // deletedItems: []
      })
      // console.log(this.state.dataArr);
    }

    // console.log(this.state.deletedItems);
    this.handleDeletedFromModal = async (deletedSymptom) => {
      await this.setState({ deletedItems: [...this.state.deletedItems, deletedSymptom.itemId] })

    }
    this.handleDelete = async (deletedSymptom) => {
      this.handleDeletedFromModal(deletedSymptom);
      // console.log(id);
      // this.getDataArray(this.state.dataArr, deletedSymptom)
      // const delItems = this.state.deletedItems
      // delItems.push(deletedSymptom)
      await this.setState({ dataArr: this.state.dataArr.filter(symptom => symptom.itemId !== deletedSymptom.itemId) })
      //Deletes item for API Session
      await axios.post(`http://api.endlessmedical.com/v1/dx/DeleteFeature?SessionID=${this.state.sessionId}&name=${deletedSymptom.itemName}`).then(res => console.log(res.data.status))
      console.log(this.state.deletedItems);
    }
    this.reset = () => {
      this.setState({
        valuedFeatures: this.valuedFeatures,
        sessionId: '',
        inputValue: '',
        selectedFeature: '',
        suggestedFeaturesToAsk: [],
        acceptedTerms: '',
        DiseasesResult: [],
        dataSentFlag: false,
        dataArr: [],
      })
    }

    return (
      <div className="App">
        <h1>Please Tell Diagnostica more medical info about you.</h1>
        <Container className='Diagnosis'>
          <Select placeholder="Select from the following values ..." options={this.state.valuedFeatures} value={this.state.selectedFeature} onChange={this.handleChange} />
          {this.state.selectedFeature && <QuestionModal buttonLabel="Ask" item={this.state.selectedFeature} getDataArray={this.getDataArray} handleDeletedItem={this.state.deletedItems} deletedItems={this.state.deletedItems} />}
          {this.state.dataArr && <SymptomsList handleDelete={this.handleDelete} dataArray={this.state.dataArr} />}
          {this.state.dataArr[0] && <Button onClick={this.sendFeaturesData}>Send Current Details</Button>}
          {this.state.dataSentFlag && <Button onClick={this.handleGetAdditionalTests}>Get Additional Results</Button>}
          {this.state.suggestedFeaturesToAsk && <SymptomsToTestList suggestedFeatures={this.state.suggestedFeaturesToAsk} />}
          {this.state.dataSentFlag && <Button onClick={this.analyze}>Analyze</Button>}
          {this.state.DiseasesResult && <DiseasesList diseasesList={this.state.DiseasesResult} />}
          {this.state.DiseasesResult && this.state.suggestedFeaturesToAsk && this.state.dataSentFlag && <Button onClick={this.reset}>Reset</Button>}
        </Container>
      </div >
    )
  }
}

export default App;
