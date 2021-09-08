import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {  NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import {logout} from "../actions/userActions"
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  

  const logoutHandler = () => {
    
        dispatch(logout()) }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Voiture
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            
            
            <li>
            {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink to='/login' activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                    <i className='fas fa-user'></i> Sign In
                </NavLink>
              )}
            </li>
            <li>
            {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <Link to='/admin/userlist' activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </Link>
                  
                  
        
                </NavDropdown>
              )}
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
      
    

   
    </>
  );
}

export default NavBar;
