import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

const Navbar = (props) => {
  console.log('sidebar props', props);

  const [sidebar, setSidebar] = useState(false);
  //const [type, setType] = useState(props.title);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    
    <div>
      <IconContext.Provider value={{ color: '#52A9D9' }}>
        <div className='sidebar'>
          <Link to='#' className='sidemenu-bars'>
            <MdMenu className='text-info' onClick={showSidebar} />
          </Link>
          <h3 className='capitalize page-title'>{props.title}</h3>
          <div style={{ width: '26px' }}> </div>
        </div>
        <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
          <ul className='side-menu-items' onClick={showSidebar}>
            <li className='sidebar-toggle'>
              <Link to='#' className='sidemenu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      console.log('click heard');
                      console.log(item.title);
                    }}
                    title={item.title}
                    
                  >
                    {item.icon}
                    <p><span>{item.title}</span></p>
                    
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      </div>
   
  );
};

export default Navbar;