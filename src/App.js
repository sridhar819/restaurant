import {useState} from 'react'
import Home from './components/Home'
import CartContext from './CartContext'
import './App.css'

const App = () => {
  const [cartList, setCart] = useState([])

  const addCart = food => {
    setCart(prevCart => {
      const isInclude = prevCart.find(each => each.dishId === food.dishId)

      if (!isInclude) {
        return [...prevCart, {...food, quantity: 1}]
      }

      return prevCart.map(each =>
        each.dishId === food.dishId
          ? {...each, quantity: each.quantity + 1}
          : each,
      )
    })
  }

  const removeCart = id => {
    setCart(prevCart =>
      prevCart
        .map(each =>
          each.dishId === id ? {...each, quantity: each.quantity - 1} : each,
        )
        .filter(each => each.quantity > 0),
    )
  }

  return (
    <CartContext.Provider value={{cartList, addCart, removeCart}}>
      <Home />
    </CartContext.Provider>
  )
}

export default App
