import logo from '../images/logo.png';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="topnav">
        <img src={logo} alt="logo" className="logo"/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/">Home</Link>
        <Link to="/sports">Sports</Link>
        <Link to="/tech">Technology</Link>
        <Link to="/health">Health</Link>
        <Link to="/business">Business</Link>
      </div>
    )
  }
export default NavBar;