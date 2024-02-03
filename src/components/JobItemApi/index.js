import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {HiStar} from 'react-icons/hi'
import Header from '../Header'
import SimilarItemCard from '../SimilarItemCard'

import './index.css'

const jobItemApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemApi extends Component {
  state = {
    jobItemData: [],
    similarJobsData: [],
    apiStatus: jobItemApiStatus.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    this.setState({apiStatus: jobItemApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateJobItemData = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        skills: each.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
      }))
      const updateSimilarJobsData = data.similar_jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        rating: item.rating,
        title: item.title,
        location: item.location,
      }))
      this.setState({
        jobItemData: updateJobItemData,
        apiStatus: jobItemApiStatus.success,
        similarJobsData: updateSimilarJobsData,
      })
    } else {
      this.setState({
        apiStatus: jobItemApiStatus.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobItemData, similarJobsData} = this.state
    console.log(jobItemData)
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      companyWebsiteUrl,
      lifeAtCompany,
      jobDescription,
      skills,
      packagePerAnnum,
    } = jobItemData[0]
    return (
      <>
        <div className="job-item-details-container">
          <div className="logo-container2">
            <img src={companyLogoUrl} alt={title} className="company-logo2" />
            <div className="title-rating-container2">
              <p className="title2">{title}</p>
              <div className="rating-container2">
                <HiStar className="rating-icon2" />
                <p className="rating2">{rating}</p>
              </div>
            </div>
          </div>
          <div className="package-container2">
            <div className="location-job-type-container2">
              <div className="location-container2">
                <IoLocationOutline className="location-icon2" />
                <p className="location2">{location}</p>
              </div>
              <div className="employ-type-container2">
                <BsBriefcase className="case-icon2" />
                <p className="employ-type2">{employmentType}</p>
              </div>
            </div>
            <p className="package2">{packagePerAnnum}</p>
          </div>
          <hr className="job-line2" />
          <div className="visit-container">
            <h1 className="description-heading2">Description</h1>
            <a className="visit" href={companyWebsiteUrl}>
              Visit <BiLinkExternal className="visit" />
            </a>
          </div>
          <p className="job-description2">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-ul-container">
            {skills.map(each => (
              <li className="skills-li-container">
                <img
                  src={each.imageUrl}
                  className="skill-icon"
                  alt={each.name}
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-ul-container">
            {similarJobsData.map(each => (
              <SimilarItemCard similarJobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobItemView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobItemApiStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-container">{this.renderJobItemView()}</div>
      </>
    )
  }
}
export default JobItemApi
