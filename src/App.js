import Register from './components/Register'
import Login from './components/Login'
import Unauthorised from './components/Unauthorised'
import Home from './components/Home'
import LoggedInHome from './components/LoggedInHome'
import Layout from './components/Layout'
import Championship from './components/Championship'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'
import {Routes, Route} from 'react-router-dom'
import NewPage from './components/NewPage'

const ROLES = {
  'user': 2001,
  'VerifiedUser': 5150
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Public routes*/}
        <Route path="/" element= {<Home />} />
        <Route exact path="/login" element= {<Login />} />
        <Route exact path="/register" element= {<Register />} />
        <Route exact path="/newpage" element= {<NewPage />} />
        <Route exact path="/unauthorised" element= {<Unauthorised />} />
        
        {/*Protected routes*/}
        <Route element = {<RequireAuth allowedRoles={[ROLES.user]}/>}>
          <Route exact path="/homepage" element= {<LoggedInHome />} />
        </Route>
        <Route element = {<RequireAuth allowedRoles={[ROLES.VerifiedUser]}/>}>
          <Route exact path="/championship" element= {<Championship />} />
        </Route>

        {/* catch all */}
        <Route path="/*" element= {<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
