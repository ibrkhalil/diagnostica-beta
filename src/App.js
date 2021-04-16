import React, { Component } from "react";
import Diagnosis from "./components/DiagnosisMain";
import Login from "./components/Login";
import "./App.css";
import Registration from "./components/Registration";
import Loading from "./components/Loading";
import { withRouter } from "react-router";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Nav } from "react-bootstrap";
// import { AlertProvider } from "react-alerts-plus";

export default class App extends Component {
  state = {
    userToken: "",
    userData: [],
    loading: true,
    userToken: [],
    logoutStatus: false,
  };
  componentDidMount() {
    let TokenData = JSON.parse(localStorage.getItem("userData"));
    this.setState({ loading: false });
    if (TokenData) this.setState({ userToken: TokenData });
  }
  saveTokenToLS = (userToken) => {
    this.setState({ userToken });
    console.log(this.state.userToken);
    localStorage.setItem("userData", JSON.stringify(userToken));
  };
  handleLogout = () => {
    this.setState({ userToken: [], logoutStatus: true });
    localStorage.removeItem("userData");
  };
  render() {
    console.log(this.state.userToken.length > 0);

    return (
      <Router>
        <div className='center .mt-rem-5'>
          {this.state.logoutStatus && <Redirect to='/' />}
          {this.state.userToken.length > 0 && <Redirect to='/Diagnosis' />}

          {/* {console.log(this.state.result)}
          {this.state.result.length > 0 && <Diagnosis />}
          {this.state.loading && <Loading type={"spin"} />}
          {!this.state.result.length > 0 && (
            <Login getResult={(data) => this.getResult(data)} />
          )} */}

          <Switch>
            <Route exact path='/'>
              <Login saveTokenToLS={this.saveTokenToLS} />
            </Route>
            <Route exact path='/Diagnosis'>
              {this.state.userToken.length > 0 ? (
                <Diagnosis Logout={this.handleLogout} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <Route exact path='/Registration'>
              <Registration />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
