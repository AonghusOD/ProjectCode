import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { Card, Avatar, Button } from '@nextui-org/react';
import { useContext } from 'react';
import DataContext from '../store/data-store.js'

function MainNavigation(props) {
  const dataCtx = useContext(DataContext)
  let noOfMessages = dataCtx.getNoMessages()
  
  return (
    <>
      <Card bordered shadow={false} hoverable css={{ mw: "100%" }}>
        <div className={classes.mainDiv}>
          <div className={classes.linkDiv}>
            <Link href="/"><a><Button shadow color="error" auto>Home</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/air"><a><Button shadow color="error" auto>Air</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/climate"><a><Button shadow color="error" auto>Climate</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/water"><a><Button shadow color="error" auto>Water</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/cart"><a><Button shadow color="error" auto>Cart</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Link href="/notifications"><a><Button shadow color="error" auto>Notifications</Button></a></Link>
          </div>
          <div className={classes.linkDiv}>
            <Avatar text={noOfMessages} size="md" color="success" textColor="white" />
          </div>
          <div></div>
        </div>
      </Card>
    </>
  );
}

export default MainNavigation;
