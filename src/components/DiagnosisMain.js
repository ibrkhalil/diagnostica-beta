import React, { Component } from "react";
import axios from "axios";
// import { TextField } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';
import features from "./SymptomsOutput.json";
import SymptomsToTestList from "./SymptomsToTestList";
// import { v4 as uuidv4 } from 'uuid';
import DiseasesList from "./DiseasesList";
import Select from "react-select";
import SymptomsList from "./SymptomsList";
import QuestionModal from "./QuestionModal";
import Analyze from "./Analyze";
import "../App.css";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import {
  Container,
  Button,
  // Card, CardBody,
  // CardTitle, Button, Container,
  // Row, Col, ButtonGroup, Input,
  // Form
} from "reactstrap";

class DiagnosisMain extends Component {
  //  console.log("ff");
  // Terms of use Passphrase
  valuedFeatures = features.map((feature) => ({
    ...feature,
    value: feature.text,
    label: feature.text,
  }));
  // console.log(valuedFeatures.length);
  // console.log(uuidFeatures);
  state = {
    // uuidFeatures,
    valuedFeatures: this.valuedFeatures,
    sessionId: "",
    inputValue: "",
    selectedFeature: "",
    suggestedFeaturesToAsk: [],
    DiseasesResult: [],
    dataSentFlag: false,
    dataArr: [],
    arrResut: [],
  };

  async componentDidMount() {
    const [SessionRes] = await Promise.all([
      axios.get("http://api.endlessmedical.com/v1/dx/InitSession"),
    ]);
    const terms = `I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com`;
    const SessionID = SessionRes.data.SessionID;
    const acceptedTerms = await axios.post(
      `http://api.endlessmedical.com/v1/dx/AcceptTermsOfUse?SessionID=${SessionID}&passphrase=${terms}`
    );
    // console.log(SessionID);
    await this.setState({
      sessionId: SessionID,
    });
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
      await this.state.dataArr.map((feature) =>
        axios
          .post(
            `http://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID=${this.state.sessionId}&name=${feature.itemName}&value=${feature.itemValue}`
          )
          .then((res) => console.log(res.data.status))
      );

      this.setState({
        dataSentFlag: true,
      });
    };
    this.Logout = () => {
      this.props.Logout(true);
      return (
        <Router>
          {<Redirect to='/Login' />}{" "}
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
          </Switch>
        </Router>
      );
    };
    this.sendResult = () => {
      this.setState({
        arrResut: [
          {
            Date: "1",
            percentage: 15,
            result: "a",
          },
          {
            Date: "1",
            percentage: 20,
            result: "b",
          },
          {
            Date: "1",
            percentage: 30,
            result: "c",
          },
          {
            Date: "1",
            percentage: 40,
            result: "d",
          },
          {
            Date: "1",
            percentage: 50,
            result: "e",
          },
          {
            Date: "1",
            percentage: 70,
            result: "f",
          },
          {
            Date: "1",
            percentage: 90,
            result: "g",
          },
          {
            Date: "1",
            percentage: 100,
            result: "h",
          },
        ],
      });
    };
    this.analyze = async () => {
      this.sendResult();
      await axios
        .get(
          `http://api.endlessmedical.com/v1/dx/Analyze?SessionID=${this.state.sessionId}`
        )
        .then((res) => this.setState({ DiseasesResult: res.data.Diseases }));
      // console.log(this.state.DiseasesResult);
    };

    this.handleGetAdditionalTests = async () => {
      //Getting Suggested Tests
      await axios
        .get(
          `http://api.endlessmedical.com/v1/dx/GetSuggestedFeatures_PatientProvided?SessionID=${this.state.sessionId}`
        )
        .then((res) =>
          this.setState({ suggestedFeaturesToAsk: res.data.SuggestedFeatures })
        );
      console.log(this.state.suggestedFeaturesToAsk);
    };

    this.handleChange = (selectedFeature) => {
      this.setState({
        selectedFeature: { ...selectedFeature },
      });
    };
    this.getDataArray = async (arr) => {
      const uniqueArr = Object.values(
        arr.reduce(
          (acc, cur) => Object.assign(acc, { [cur.itemName]: cur }),
          {}
        )
      );

      await this.setState({
        dataArr: uniqueArr,
      });
      // console.log(this.state.dataArr);
    };
    this.handleDelete = async (deletedSymptom) => {
      // console.log(id);
      await this.setState({
        dataArr: this.state.dataArr.filter(
          (symptom) => symptom.itemId !== deletedSymptom.itemId
        ),
      });
      //Deletes item for API Session
      await axios
        .post(
          `http://api.endlessmedical.com/v1/dx/DeleteFeature?SessionID=${this.state.sessionId}&name=${deletedSymptom.itemName}`
        )
        .then((res) => console.log(res.data.status));
    };
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
    };

    return (
      <Container className='Diagnosis'>
        <Select
          placeholder='Select from the following values ...'
          options={this.state.valuedFeatures}
          value={this.state.selectedFeature}
          onChange={this.handleChange}
        />
        {this.state.selectedFeature && (
          <QuestionModal
            buttonLabel='Ask'
            item={this.state.selectedFeature}
            getDataArray={this.getDataArray}
          />
        )}
        {this.state.dataArr && (
          <SymptomsList
            handleDelete={this.handleDelete}
            dataArray={this.state.dataArr}
          />
        )}
        {this.state.dataArr[0] && (
          <Button className='btn' onClick={this.sendFeaturesData}>
            Send Current Details
          </Button>
        )}
        {this.state.dataSentFlag && (
          <Button className='btn' onClick={this.handleGetAdditionalTests}>
            Get Additional Results
          </Button>
        )}
        {this.state.suggestedFeaturesToAsk && (
          <SymptomsToTestList
            suggestedFeatures={this.state.suggestedFeaturesToAsk}
          />
        )}
        {this.state.dataSentFlag && (
          <Button
            className='btn'
            onClick={() => {
              this.analyze();
            }}
          >
            Analyze
          </Button>
        )}
        {this.state.DiseasesResult && (
          <DiseasesList diseasesList={this.state.DiseasesResult} />
        )}
        {this.state.DiseasesResult &&
          this.state.suggestedFeaturesToAsk &&
          this.state.dataSentFlag && (
            <Button onClick={this.reset}>Reset</Button>
          )}
        {<Analyze x={this.state.arrResut} />}
        {<Button onClick={this.Logout}>Log out</Button>}
        {/* {<Accessible/>} */}
      </Container>
    );
  }
}

export default DiagnosisMain;