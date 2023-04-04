import useAuth from "../hooks/useAuth"; 
import jwt_decode from "jwt-decode";
import { faUserLarge  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMediaQuery } from "react-responsive";

const UserProfile = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1100px)' })
  const {auth} = useAuth()
  const user = jwt_decode(auth.accessToken).UserInfo.username
  return (
    <div className={isTabletOrMobile ? "user-profile-mobile" : "user-profile"}>
      <div className = "profile-group">
        <FontAwesomeIcon icon={faUserLarge} className="user-icon"/>
        <h1 style = {{ fontFamily:'F1Font', fontSize: '3em', textAlign: "center"}}>{user}</h1>
      </div>
      <div className={isTabletOrMobile ? "user-info-mobile" : "user-info"}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  )
}

export default UserProfile