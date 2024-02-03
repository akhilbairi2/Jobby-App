import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', isShowErrMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({isShowErrMsg: true, errorMsg: errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="username1">
          USERNAME
        </label>
        <input
          type="text"
          className="username-input"
          id="username1"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password1">
          PASSWORD
        </label>
        <input
          type="password"
          className="username-input"
          id="password1"
          placeholder="Password"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  render() {
    const {isShowErrMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-img"
            alt="logo"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {isShowErrMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginPage
