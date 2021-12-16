import classes from './Card.module.css';
import React from 'react'

function Card(props) {
  return <div>{props.children}</div>;
}

export default Card;