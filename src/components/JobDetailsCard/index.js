import {Link} from 'react-router-dom'
import {HiStar} from 'react-icons/hi'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobDetailsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobDetails
  return (
    <Link to={`jobs/${id}`} className="job-details-link">
      <li className="job-li-container">
        <div className="logo-container">
          <img src={companyLogoUrl} alt={title} className="company-logo" />
          <div className="title-rating-container">
            <h1 className="title"> {title} </h1>
            <div className="rating-container">
              <HiStar className="rating-icon" />
              <p className="rating"> {rating} </p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="location-job-type-container">
            <div className="location-container">
              <IoLocationOutline className="location-icon" />
              <p className="location"> {location} </p>
            </div>
            <div className="employ-type-container">
              <BsBriefcase className="case-icon" />
              <p className="employ-type"> {employmentType} </p>
            </div>
          </div>
          <p className="package"> {packagePerAnnum} </p>
        </div>
        <hr className="job-line" />
        <p className="description-heading"> Description </p>
        <p className="job-description"> {jobDescription} </p>
      </li>
    </Link>
  )
}
export default JobDetailsCard
