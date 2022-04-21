import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { Card, Avatar, Button } from '@nextui-org/react';
import { useContext } from 'react';
import DataContext from '../store/data-store.js'

function MainNavigation(props) {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          Home
        </a>
      </Link>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/air">
              <a>
                Air
              </a>
            </Link>
          </li>
          &nbsp;&nbsp;&nbsp;
          <li>
            <Link href="/climate">
              <a >
              Climate
              </a>
            </Link>
          </li>
          &nbsp;&nbsp;&nbsp;
          <li>
            <Link href="/alldata">
              <a >
              AllData
              </a>
            </Link>
          </li>
          
          &nbsp;&nbsp;
          
        </ul>
      </nav>
    </header>
  );
}
  

export default MainNavigation;
