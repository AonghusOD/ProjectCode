import React from 'react'
import { useContext } from 'react';
import DataContext from '../store/data-store.js'
import { Button } from '@nextui-org/react';

function Books() 
{
  const dataCtx = useContext(DataContext)
  let noEmployees = dataCtx.getNoEmployees()

  function incrementEmployees(){
    noEmployees = dataCtx.getNoEmployees()
    noEmployees = parseInt(noEmployees) + 1
    dataCtx.setNoEmployees('' + noEmployees)
  }
  function decrementEmployees(){
    noEmployees = dataCtx.getNoEmployees()
    noEmployees = parseInt(noEmployees) - 1
    dataCtx.setNoEmployees('' + noEmployees)
  }

  return (
    <section>
      <h1>There are {noEmployees} books</h1>
      <Button  color="success" auto onClick={() => incrementEmployees()}>Add book   </Button>
      <h1 />
      <Button  color="error" auto onClick={() =>decrementEmployees()}>Remove book</Button>
    </section>
  );
}
  
  export default Books;