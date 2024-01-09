import logo from '../images/logo.png';
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="topnav">
        <img src={logo} alt="logo" className="logo"/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/">Home</Link>
        <Link to="/sports">Sports</Link>
        <Link to="/tech">Technology</Link>
        <Link to="/health">Health</Link>
        {/* <a className="active" href="#home">Home</a>
        <a href="#sport">Sport</a>
        <a href="#tech">Technology</a>
        <a href="#health">Health</a> */}
      </div>
    )
  }
export default NavBar;