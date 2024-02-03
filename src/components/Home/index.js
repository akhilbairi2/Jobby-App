import Header from '../Header'
import './index.css'

const Home = props => {
  const onFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Jobs That Fits Your Life</h1>
        <p className="home-description">
          Millions of people searching for jobs, salary,information,company
          reviews,find the job that first your abilities and potential
        </p>
        <button type="button" className="find-jobs-btn" onClick={onFindJobs}>
          Find Jobs
        </button>
      </div>
    </>
  )
}
export default Home
