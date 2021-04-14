import React, { Component } from 'react'
import Diagnosis from './components/Diagnosis'
import Login from './components/Login'
import './App.css'
import Registration from './components/Registration'
import Loading from './components/Loading'
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
      <div className='center .mt-rem-5'>
        {this.state.loading && <Loading type={'spin'} />}
        {!localStorage.getItem("userToken") && <Login />}
      </div >
    )
  }
}
