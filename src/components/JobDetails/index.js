import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GoSearch} from 'react-icons/go'
import Header from '../Header'
import JobDetailsCard from '../JobDetailsCard'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetailsList: [],
    apiStatus: jobApiStatus.initial,
    checkboxInputs: [],
    searchInput: '',
    salaryValues: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: jobApiStatus.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {checkboxInputs, searchInput, salaryValues} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&search=${searchInput}&minimum_package=${salaryValues}`
    const response = await fetch(url, options)
    const data1 = await response.json()
    console.log(data1)
    if (response.ok) {
      const updateJobDetails = data1.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        title: each.title,
        rating: each.rating,
      }))
      this.setState({
        jobDetailsList: updateJobDetails,
        apiStatus: jobApiStatus.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: jobApiStatus.failure,
      })
    }
  }

  onGetCheckbox = e => {
    const {checkboxInputs} = this.state
    if (e.target.checked) {
      this.setState(
        prevState => ({
          ...prevState,
          checkboxInputs: [...prevState.checkboxInputs, e.target.id],
        }),
        this.getJobDetails,
      )
    } else {
      const filterCheckbox = checkboxInputs.filter(each => each !== e.target.id)

      this.setState(
        {
          checkboxInputs: filterCheckbox,
        },
        this.getJobDetails,
      )
    }
  }

  renderEmploymentList = () => (
    <div>
      <h1 className="employment-heading"> Types of Employments </h1>
      <ul className="employment-container">
        {employmentTypesList.map(each => (
          <li className="li-container" key={each.employmentTypeId}>
            <input
              type="checkbox"
              className="checkbox"
              id={each.employmentTypeId}
              onChange={this.onGetCheckbox}
            />
            <label className="employment-label" htmlFor={each.employmentTypeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  onChangeSalary = e => {
    this.setState(
      {
        salaryValues: e.target.id,
      },
      this.getJobDetails,
    )
  }

  renderSalaryList = () => (
    <div>
      <h1 className="employment-heading"> Salary Range </h1>
      <ul className="employment-container">
        {salaryRangesList.map(each => (
          <li className="li-container" key={each.salaryRangeId}>
            <input
              type="radio"
              className="checkbox"
              name="option"
              id={each.salaryRangeId}
              onChange={this.onChangeSalary}
            />
            <label className="employment-label" htmlFor={each.salaryRangeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetailsList} = this.state
    return (
      <>
        {jobDetailsList.length !== 0 ? (
          <ul className="job-details-container">
            {jobDetailsList.map(each => (
              <JobDetailsCard jobDetails={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-jobs-heading"> No Jobs Found </h1>
            <p className="no-jobs-para">
              We could not find any jobs, Try other filters
            </p>
          </div>
        )}
      </>
    )
  }

  onRetryBtn = () => {
    this.setState({
      jobDetailsList: [],
      apiStatus: jobApiStatus.initial,
      checkboxInputs: [],
      searchInput: '',
      salaryValues: '',
    })
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading"> Oops!Something Went Wrong </h1>
      <p className="failure-para">
        We cannot seem to find the page you looking for
      </p>
      <button
        className="failure-retry-btn"
        type="button"
        onClick={this.onRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobApiStatus.success:
        return this.renderSuccessView()
      case jobApiStatus.failure:
        return this.renderFailureView()
      case jobApiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = e => {
    this.setState(
      {
        searchInput: e.target.value,
      },
      this.getJobDetails,
    )
  }

  onEnterKey = e => {
    if (e.key === 'Enter') {
      this.getJobDetails()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="search-container-sm">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterKey}
            />
            <GoSearch className="search-icon" />
          </div>
          <div className="profile-details-container">
            <Profile />
            <hr className="line" /> {this.renderEmploymentList()}
            <hr className="line" /> {this.renderSalaryList()}
          </div>
          <div className="job-search-container">
            <div className="search-container-md">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterKey}
              />
              <GoSearch className="search-icon" />
            </div>
            {this.renderJobDetailsView()}
          </div>
        </div>
      </>
    )
  }
}
export default JobDetails
