import React from "react";
import { Modal, useModal, Text } from "@nextui-org/react";
import Button from "@nextui-org/react/esm/button";
import classes from "./getData-item.module.css";
import { useContext } from "react";

function GetDataItem(props) {
    const { PH, TDS, LUX, Temp, Hum } = props;
    const { setVisible, bindings } = useModal();
  
    // const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    // });

    
  return (
    <li className={classes.item}>
     <div className={classes.content}>
        <div className={classes.summary}>
       <h2 style={{ color: "red" }}>{PH}</h2>
          <h2>Hello</h2>
          <h2 style={{ color: "red" }}>{TDS}</h2>
          <h2 style={{ color: "red" }}>{LUX}</h2>
          <h2 style={{ color: "red" }}>{Temp}</h2>
          <div className={classes.date}>
            <p style={{ color: "black" }}>Publish Date:</p>
            
          </div>
          <div className={classes.address}></div>
        </div>
        <br></br>

          
        <div className={classes.actions}>
         
        </div>
      </div>
    </li>
  );
}

export default GetDataItem;
