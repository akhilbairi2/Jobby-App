import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import JobDetails from './components/JobDetails'
import JobItemApi from './components/JobItemApi'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobDetails} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemApi} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
