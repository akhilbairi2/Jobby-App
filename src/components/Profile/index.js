import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const profileApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Profile extends Component {
  state = {profileData: [], apiStatus: profileApiStatus.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: profileApiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        profileData: data.profile_details,
        apiStatus: profileApiStatus.success,
      })
    } else {
      this.setState({apiStatus: profileApiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    return (
      <div className="profile-details">
        <img
          src={profileData.profile_image_url}
          alt={profileData.name}
          className="profile-img"
        />
        <h1 className="name">{profileData.name}</h1>
        <p className="bio">{profileData.short_bio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryBtn = () => {
    this.getProfileData()
  }

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case profileApiStatus.success:
        return this.renderSuccessView()
      case profileApiStatus.inProgress:
        return this.renderLoadingView()
      case profileApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileView()}</>
  }
}
export default Profile
