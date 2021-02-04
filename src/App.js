import React, { useEffect, useState } from 'react';
import './App.css';

import TableCard from './components/TableCard'
import NavBar from './components/NavBar'
import AddItemCard from './components/AddItemCard'
import { Grid } from '@material-ui/core'

// This function is called immediately when the page loads, before populating the table with this data
export async function getUserItems() {
  return []
}

// This function is called when a user clicks the button 'Add'
export async function addItem(itemName) {
  console.log("Implement AddItem")
}

// This function is called when a user deletes an existing item in the table
export async function deleteItem(itemId) {
  console.log("Implement DeleteIterm")
}


function App() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchData()

  }, [])

  async function fetchData() {
    console.log("Implement Data load")
    setItems([])
  }

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Grid container spacing={3}>

          <AddItemCard
            addAction={
              async (itemName) => {
                const response = await addItem(itemName)

                if (response) {
                  setItems([...items, response])
                }

              }
            }
          />


          <TableCard
            data={items}
            removeAction={async (id) => {
              const response = await deleteItem(id)
              if (response) {
                setItems(items.filter(item => item.id !== id))
              }
            }}
          />
        </Grid>
      </div>
    </div>
  );
}

export default App;
