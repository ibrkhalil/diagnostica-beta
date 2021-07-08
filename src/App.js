import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
// import { Redirect } from 'react-router';
import Diagnosis from './components/Diagnosis';
import Login from './components/Login';
import './App.css';
import Registration from './components/Registration';
import RecordedResults from './components/RecordedResults';

// import Loading from './components/Loading';


import 'bootstrap/dist/css/bootstrap.min.css';
export default class App extends Component {
  state = {
    userToken: '',
    userData: [],
    loading: true
  }
  componentDidMount() {
    this.setState({ loading: false })
  }

  render() {
    return (
      <Router>
        <div className='center .mt-rem-5'>
          {/* {this.state.loading && <Loading type={'spin'} />}
        {!localStorage.getItem("userToken") && <Login />} */}

          {/* <Switch>

           
            <Route exact path='/' component={Diagnosis} />
          </Switch> */}


          <RecordedResults />
          {/* <Diagnosis /> */}
          {/* <Login /> */}
          {/* <Registration /> */}

        </div>
      </Router>
    )
  }
}
