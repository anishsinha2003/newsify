import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import React, { useState, useLayoutEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InfoIcon from '@mui/icons-material/Info';

const NavBar = () => {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  const [width] = useWindowSize();
  console.log(width)
  return (
    <div className="topnav">
      <img src={logo} alt="logo" className="logo"/>
      &nbsp;
      {width >= 800
        ? <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/">Home</Link>
          <Link to="/sports">Sports</Link>
          <Link to="/tech">Technology</Link>
          <Link to="/health">Health</Link>
          <Link to="/business">Business</Link>
          <Link to="/about">About</Link>
        </>
        : <>
          <Link to="/"><HomeIcon/></Link>
          <Link to="/sports"><SportsBasketballIcon/></Link>
          <Link to="/tech"><ImportantDevicesIcon/></Link>
          <Link to="/health"><HealthAndSafetyIcon/></Link>
          <Link to="/business"><BusinessCenterIcon/></Link>
          <Link to="/about"><InfoIcon/></Link>
        </>
      }
    </div>
  )
}
export default NavBar;