import '../App.css';
import React, { Component } from 'react';
import axios from 'axios';
// import { TextField } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';
import features from './SymptomsOutput.json';
import SymptomsToTestList from './SymptomsToTestList';
// import { v4 as uuidv4 } from 'uuid';
import DiseasesList from './DiseasesList';
import Select, { components } from 'react-select';
import SymptomsList from './SymptomsList';
import QuestionModal from './QuestionModal';
// import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';
import {
    Container
    // , Button
    // Card, CardBody,
    // CardTitle, Button, Container,
    // Row, Col, ButtonGroup, Input,
    // Form
} from 'reactstrap';
class Diagnosis extends Component {
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
        uniqueArr: [],
        dataArr: [],
    }

    async componentDidMount() {
        const SessionRes = await axios.get('http://api.endlessmedical.com/v1/dx/InitSession')

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

        // console.log(this.state.dataArr);
        this.sendFeaturesData = async () => {
            //Sends Collected Symptoms to the API and logs Ok for each successfully sent symptom
            await this.state.dataArr.map(feature => axios.post(`http://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID=${this.state.sessionId}&name=${feature.itemName}&value=${feature.itemValue}`).then(res => console.log(res.data.status)))
            this.setState({
                dataSentFlag: true
            })
        }

        this.analyze = async () => {
            await axios.get(`http://api.endlessmedical.com/v1/dx/Analyze?SessionID=${this.state.sessionId}`).then(res => this.setState({ DiseasesResult: res.data.Diseases }))

        }

        this.handleGetAdditionalTests = async () => {
            //Getting Suggested Tests
            await axios.get(`http://api.endlessmedical.com/v1/dx/GetSuggestedFeatures_PatientProvided?SessionID=${this.state.sessionId}`).then(res => this.setState({ suggestedFeaturesToAsk: res.data.SuggestedFeatures }))
            // console.log(this.state.suggestedFeaturesToAsk);
        }

        this.handleChange = (selectedFeature) => {

            this.setState({
                selectedFeature
            })

        }
        this.getDataArray = async (arrItem, deletedSymptom = null) => {
            let oldArr = this.state.uniqueArr.concat(arrItem)
            this.setState({ uniqueArr: oldArr })
            if (deletedSymptom) {
                await this.setState({ dataArr: this.state.dataArr.filter(symptom => symptom.itemId !== deletedSymptom.itemId) })
            }
            console.log(deletedSymptom);

            // console.log(arr);
            const uniqueArr = Object.values(this.state.uniqueArr.reduce((acc, cur) => Object.assign(acc, { [cur.itemName]: cur }), {}))
            await this.setState({
                dataArr: uniqueArr
            })
            console.log(this.state.uniqueArr);
            // console.log(this.state.dataArr);
        }
        this.handleDelete = async (deletedSymptom) => {
            // console.log(id);
            // await axios.get('http://127.0.0.1:8000/api/patients').then(res => console.log(res.data[0]))
            await this.setState({ dataArr: this.state.dataArr.filter(symptom => symptom.itemId !== deletedSymptom.itemId) })
            // Deletes item for API Session
            await axios.post(`http://api.endlessmedical.com/v1/dx/DeleteFeature?SessionID=${this.state.sessionId}&name=${deletedSymptom.itemName}`).then(res => console.log(res.data.status))
            // console.log(this.state.dataArr);
            console.log(this.state.dataArr);
        }
        this.reset = () => {
            // this.setState({
            //   valuedFeatures: this.valuedFeatures,
            //   sessionId: '',
            //   inputValue: '',
            //   selectedFeature: '',
            //   suggestedFeaturesToAsk: [],
            //   acceptedTerms: '',
            //   DiseasesResult: [],
            //   dataSentFlag: false,
            //   dataArr: [],
            // })
            window.location.reload();
        }

        const uniqueId = "select_" + Math.random().toFixed(5).slice(2);
        return (
            <div className="mainBack" >
                <div className="container" >
                    <div className="Diagnosis">
                        <div className='logoDiagnosis'>
                            <img className="logoDiag" src={`/logoDignosis/logo18.png`} />
                        </div>
                        <Container className='Diagnosis '>
                            {/* <img src={`/logoDignosis/logo18.png`} /> */}
                            <Select
                                id={uniqueId}
                                placeholder="Select from the following values ..." options={this.state.valuedFeatures} value={this.state.selectedFeature} onChange={this.handleChange}
                                components={{
                                    Menu: (props) => <components.Menu {...props} className="menu" />,
                                    DropdownIndicator: () => null, IndicatorSeparator: () => null
                                }}
                                onMenuClose={() => {
                                    const menuEl = document.querySelector(`#${uniqueId} .menu`);
                                    const containerEl = menuEl?.parentElement;
                                    const clonedMenuEl = menuEl?.cloneNode(true);

                                    if (!clonedMenuEl) return;

                                    clonedMenuEl.classList.add("menu--close");
                                    clonedMenuEl.addEventListener("animationend", () => {
                                        containerEl?.removeChild(clonedMenuEl);
                                    });

                                    containerEl.appendChild(clonedMenuEl);
                                }}
                            />
                            {this.state.selectedFeature && <QuestionModal buttonLabel="Ask" item={this.state.selectedFeature} getDataArray={this.getDataArray} />}
                            {this.state.dataArr && <SymptomsList handleDelete={this.handleDelete} dataArray={this.state.dataArr} />}
                            {this.state.dataArr[0] && <Button variant="sec " onClick={this.sendFeaturesData} >Send Current Details</Button>}
                            {this.state.dataSentFlag && <Button variant="sec " onClick={this.handleGetAdditionalTests}>Get Additional Tests</Button>}
                            {this.state.suggestedFeaturesToAsk && <SymptomsToTestList suggestedFeatures={this.state.suggestedFeaturesToAsk} />}

                            {this.state.dataSentFlag && <Button variant="sec " onClick={this.analyze}>Analyze</Button>}


                            {this.state.DiseasesResult && <DiseasesList variant="sec " diseasesList={this.state.DiseasesResult} />}



                            {this.state.DiseasesResult && this.state.suggestedFeaturesToAsk && this.state.dataSentFlag && <Button variant="sec " onClick={this.reset}>Reset</Button>}


                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default Diagnosis;
