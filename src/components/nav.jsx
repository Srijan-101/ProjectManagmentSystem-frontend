import { signOut } from '../helper/helper'
import {Link} from 'react-router-dom'

const NavBar = () => {
  const onclick = (e) => {
    e.preventDefault();
    signOut();
    window.location.reload(false); 
  }

  return (
    <nav className="navbar" style={{ 'boxShadow': "0 2px 2px -2px rgba(0,0,0,.2)", 'height': "75px" }} role="navigation" aria-label="main navigation">
      <div className="navbar-brand ml-5 mr-5">

      <Link to ='/' className="navbar-item">
          <i class="fab fa-react" style={{"fontSize":"50px"}}></i>
       </Link>
      

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to ='/' className="navbar-item">
            home 
          </Link>
          </div>
        </div>



    </nav>
  )
}


export default NavBar;