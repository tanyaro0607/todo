/* eslint-disable */ 
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'

import './App.css'


function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: v4(),
        item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Enter something...')
      setItem('')
    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePos = (data, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y}
    setItems(newArray)
  }

  const keyPress = (evt) => {
    const code = evt.keyCode || evt.which
    if ( code === 13 ) {
      newItem()
    }
  }

  return (
    <div className='App'>
      <div className='wrapper'>
        <input
          value={item}
          className='input' 
          type='text'
          placeholder='Enter something...'
          onChange={(evt) => setItem(evt.target.value)}
          onKeyPress={(evt) => keyPress(evt)}
          /> 
        <button className='button-enter' onClick={newItem}>Enter</button>
      </div>

      {
        items.map((item, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={item.defaultPos}
              onStop={(evt, data) => {
                updatePos(data, index)
              }}
              >

                <div className='todo__item' style={{backgroundColor: item.color}}>
                  {`${item.item}`}
                  <button 
                    className='button-delete'
                    onClick={() => deleteNode(item.id)}
                    > 
                    X 
                  </button>
                </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
