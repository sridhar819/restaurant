import {Switch, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Home from './components/Home'
import Cart from './components/Cart'
import CartContext from './CartContext'
import ProtectedRoute from './ProtectedRoute'
import './App.css'

const parsedData = () => {
  const data = localStorage.getItem('cartList')

  if (data) {
    return JSON.parse(data)
  }
  return []
}

const App = () => {
  const [cartList, setCart] = useState(parsedData())
  const [appName, setAppName] = useState('')

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

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

  const addAppName = name => {
    setAppName(name)
  }

  return (
    <CartContext.Provider
      value={{cartList, appName, addAppName, addCart, removeCart}}
    >
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
