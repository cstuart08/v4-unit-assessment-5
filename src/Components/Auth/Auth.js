import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { updateUser } from '../../redux/reducer'
import logo from './../../assets/helo_logo.png';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  login() {
    console.log("hitting this11")
    axios.post('/api/auth/login', this.state)
      .then(res => {
        console.log("hitting this333")
        console.log(res.data)
        this.props.updateUser(res.data)
        this.props.history.push('/dash')
      })
      .catch(err => {
        console.log(err)
        this.setState({errorMsg: 'Incorrect username or password!'})
      })
  }

  register() {
    console.log("hitting this1")
    axios.post('/api/auth/register', this.state)
      .then(res => {
        console.log("hitting this2")
        console.log(res.data)
        this.props.updateUser(res.data)
        this.props.history.push('/dash')
      })
      .catch(err => {
        console.log(err)
        this.setState({errorMsg: 'Username taken!'})
      })
  }

  closeErrorMessage = () => {
    this.setState({
      errorMsg: false, 
      username: '', 
      password: ''
    })
  }

  render() {
    console.log("HELLO?")
    return (
      <div className='auth'>
        <div className='auth-container'>
          <img src={logo} alt='logo' />
          <h1 className='auth-title'>Helo</h1>
          {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
          <div className='auth-input-box'>
            <p>Username:</p>
            <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} />
          </div>
          <div className='auth-input-box'>
            <p>Password:</p>
            <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
          </div>
          <div className='auth-button-container'>
            <button className='dark-button' onClick={this.login}> Login </button>
            <button className='dark-button' onClick={this.register}> Register </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(null, mapDispatchToProps)(Auth);