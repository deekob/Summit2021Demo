import React, { useEffect, useState } from 'react';
import './App.css';

import TableCard from './components/TableCard'
import NavBar from './components/NavBar'
import AddItemCard from './components/AddItemCard'
import { Grid } from '@material-ui/core'
import Amplify from 'aws-amplify'
import {withAuthenticator } from '@aws-amplify/ui-react'
import awsconfig from './aws-exports'

import { DataStore } from '@aws-amplify/datastore';
import { ShoppingListItems } from './models';

Amplify.configure(awsconfig)


// This function is called immediately when the page loads, before populating the table with this data
export async function getUserItems() {
 return await DataStore.query(ShoppingListItems)
}

// This function is called when a user clicks the button 'Add'
export async function addItem(itemName) {
  return await DataStore.save(new ShoppingListItems({
		"itemName": itemName
	})
);
  
}

// This function is called when a user deletes an existing item in the table
export async function deleteItem(itemId) {
 const modelToDelete = await DataStore.query(ShoppingListItems, itemId);
 return DataStore.delete(modelToDelete);
}


function App() {

  const [listItems, setItems] = useState([])
  useEffect(() => {
    fetchData()
    async function fetchData() {
      const listData = await DataStore.query(ShoppingListItems)
      setItems(listData)
    }
    DataStore.observe(ShoppingListItems).subscribe(() => {
      fetchData()
    });
    
  }, [])

  
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Grid container spaci ng={3}>

          <AddItemCard
            addAction={
              async (itemName) => {      
                const response = await addItem(itemName)

                if (response) {
                  console.log(response)
                  setItems([...listItems, response])
                }

              }
            }
          />


          <TableCard
            data={listItems}
            removeAction={async (id) => {
              const response = await deleteItem(id)
              console.log(response)
              if ( response ){
                setItems(listItems.filter(item => item.id !== id))
            }
            }}
          />
        </Grid>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
