import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header-container-md">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div className="home-job-container">
          <Link className="link" to="/">
            <p className="home"> Home </p>{' '}
          </Link>{' '}
          <Link className="link" to="/jobs">
            <p className="job"> Job </p>{' '}
          </Link>{' '}
        </div>{' '}
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout{' '}
        </button>{' '}
      </div>{' '}
      <div className="header-container-sm">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-header"
        />
        <div className="logout-container">
          <Link to="/" className="link">
            <MdHome className="home-icon" />
          </Link>{' '}
          <Link to="/jobs" className="link">
            <FaBriefcase className="header-case-icon" />
          </Link>{' '}
          <FiLogOut className="logout-icon" onClick={onLogout} />{' '}
        </div>{' '}
      </div>{' '}
    </>
  )
}
export default withRouter(Header)
