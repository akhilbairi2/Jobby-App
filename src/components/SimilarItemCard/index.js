import {HiStar} from 'react-icons/hi'
import {IoLocationOutline} from 'react-icons/io5'
import {VscBriefcase} from 'react-icons/vsc'
import './index.css'

const SimilarItemCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobDetails
  return (
    <li className="similar-jobs-li-container">
      <div className="similar-jobs-logo-container">
        <img
          src={companyLogoUrl}
          alt={title}
          className="similar-jobs-company-logo"
        />
        <div className="similar-jobs-title-rating-container">
          <h1 className="similar-jobs-title"> {title} </h1>
          <div className="similar-jobs-rating-container">
            <HiStar className="similar-jobs-rating-icon" />
            <p className="similar-jobs-rating"> {rating} </p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobs-description-heading"> Description </h1>
      <p className="similar-jobs-description"> {jobDescription} </p>
      <div className="similar-jobs-location-employ-type-container">
        <div className="similar-jobs-location-container">
          <IoLocationOutline className="similar-jobs-location-icon" />
          <p className="similar-jobs-location"> {location} </p>
        </div>
        <div className="similar-jobs-employ-type-container">
          <VscBriefcase className="similar-jobs-case-icon" />
          <p className="similar-jobs-employ-type"> {employmentType} </p>
        </div>
      </div>
    </li>
  )
}
export default SimilarItemCard
