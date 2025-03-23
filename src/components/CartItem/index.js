import {useContext} from 'react'
import CartContext from '../../CartContext'
import './index.css'

const CartItem = ({details}) => {
  const {addCart, removeCart} = useContext(CartContext)

  const {
    dishAvailability,
    dishCurrency,
    dishPrice,
    dishImage,
    dishName,
    quantity,
    dishId,
  } = details

  const increment = () => {
    addCart({...details, quantity: 1})
  }

  const decrement = () => {
    removeCart(dishId)
  }

  return (
    <div className="cart-item">
      <div className="cart-img-card">
        <img src={dishImage} alt={dishName} />
        <div>
          <h1>{dishName}</h1>
          <p>
            {dishCurrency} {dishPrice}
          </p>
        </div>
      </div>
      <div className="cart-price">
        <div className="d-flex align-items-center gap-2 my-2">
          <button
            onClick={decrement}
            className="btn btn-outline-danger"
            type="button"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={increment}
            className="btn btn-outline-success"
            type="button"
          >
            +
          </button>
        </div>
        <p style={{width: '30%'}} className="text-info text-center">
          Rs {quantity * dishPrice}/-
        </p>
      </div>
    </div>
  )
}

export default CartItem
