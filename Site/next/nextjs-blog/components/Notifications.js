import React from 'react'
import { useContext } from 'react';
import DataContext from '../store/data-store.js'
import { Button } from '@nextui-org/react';

function Notifications() 
{
  const dataCtx = useContext(DataContext)
  let noMessages = dataCtx.getNoMessages()

  function incrementMessages(){
    noMessages = dataCtx.getNoMessages()
    noMessages = parseInt(noMessages) + 1
    dataCtx.setNoMessages('' + noMessages)
  }
  function decrementMessages(){
    noMessages = dataCtx.getNoMessages()
    noMessages = parseInt(noMessages) - 1
    dataCtx.setNoMessages('' + noMessages)
  }

  return (
    <section>
      <h1>There are {noMessages} books</h1>
      <Button  color="success" auto onClick={() => incrementMessages()}>Add Notification  </Button>
      <h1 />
      <Button  color="error" auto onClick={() =>decrementMessages()}>Remove Notification</Button>
    </section>
  );
}
  
  export default Notifications;