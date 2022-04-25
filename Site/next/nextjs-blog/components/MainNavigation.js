import Link from "next/link";
import classes from "./MainNavigation.module.css";
import {Avatar, Button } from '@nextui-org/react';
import { useContext } from 'react';
import DataContext from '../store/data-store.js'
import { Container, Card, Row, Text } from "@nextui-org/react";

function MainNavigation(props) {
  return (
    <Container>
      <Card color="default">
        <Row justify="center" align="center">
        <header className={classes.header}>
      <Link href="/home">
        <a>
          Home
        </a>
      </Link>
      <nav className={classes.navigation}>
        <ul>
          &nbsp;&nbsp;&nbsp;
          <li>
            <Link href="/water">
              <a>
                Water
              </a>
            </Link>
          </li>
          &nbsp;&nbsp;&nbsp;
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
            <Link href="/home">
              <a >
              Home
              </a>
            </Link>
          </li>
          
        </ul>
      </nav>
    </header>
        </Row>
      </Card>
    </Container>
  );
}

export default MainNavigation;
