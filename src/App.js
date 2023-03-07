import Register from './components/Register'
import Login from './components/Login'
import Unauthorised from './components/Unauthorised'
import Home from './components/Home'
import LoggedInHome from './components/LoggedInHome'
import Logout from './components/Logout'
import Layout from './components/Layout'
import Championship from './components/Championship'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'
import {Routes, Route} from 'react-router-dom'
import NewPage from './components/NewPage'
import PersistLogin from './components/PersistLogin'
import UserProfile from './components/UserProfile'


const ROLES = {
  'user': 2001,
  'VerifiedUser': 5150
}


function App() {
  return (
    <Routes>
      <Route element = {<PersistLogin />}>
      <Route path="/" element={<Layout />}>      
          {/*Public routes*/}
          <Route path="/" element= {<Home />} />
          <Route exact path="/login" element= {<Login />} />
          <Route exact path="/logout" element= {<Logout />} />
          <Route exact path="/register" element= {<Register />} />
          <Route exact path="/unauthorised" element= {<Unauthorised />} />
        
          {/*Protected routes*/}
        
          <Route element = {<RequireAuth allowedRoles={[ROLES.user]}/>}>
            <Route exact path="/homepage" element= {<LoggedInHome />} />
          </Route>
          <Route element = {<RequireAuth allowedRoles={[ROLES.VerifiedUser]}/>}>
            <Route exact path="/championship" element= {<Championship />} />
          </Route>
          <Route element = {<RequireAuth allowedRoles={[ROLES.VerifiedUser]}/>}></Route>
            <Route exact path="/newpage" element= {<NewPage />}>  
          </Route>
          <Route element = {<RequireAuth allowedRoles={[ROLES.VerifiedUser]}/>}></Route>
            <Route exact path="/userprofile" element= {<UserProfile />}>  
          </Route>
        
          {/* catch all */}
          <Route path="/*" element= {<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
