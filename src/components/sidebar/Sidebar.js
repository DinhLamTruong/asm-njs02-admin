import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Dashboard,
  PersonOutline,
  LocalShipping,
  CreditCard,
  Store,
  ExitToApp,
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

import './Sidebar.css';

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    console.log('logout');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="sidebarContainer">
      <ul>
        <p>main</p>
        <Link to="/">
          <li>
            <Dashboard className="icon" />
            <span>dashboard</span>
          </li>
        </Link>

        <p>list</p>
        <li>
          <PersonOutline className="icon" /> <span>users</span>
        </li>
        <Link to={'/hotel'}>
          <li>
            <Store className="icon" />
            <span>hotels</span>
          </li>
        </Link>
        <Link to={'/room'}>
          <li>
            <CreditCard className="icon" /> <span>rooms</span>
          </li>
        </Link>
        <Link to={'/transactions'}>
          <li>
            <LocalShipping className="icon" /> <span>transactions</span>
          </li>
        </Link>

        <p>new</p>
        <Link to={'/newhotel'}>
          <li>
            <Store className="icon" />
            <span> new hotel</span>
          </li>
        </Link>
        <Link to={'/newroom'}>
          <li>
            <CreditCard className="icon" />
            <span>new room</span>
          </li>
        </Link>
      </ul>

      <div className="sidebarBottom">
        <p>user</p>
        <li onClick={handleLogout}>
          <ExitToApp className="icon" />
          <span>logout</span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
