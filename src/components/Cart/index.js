import {useContext} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'

import CartContext from '../../CartContext'
import './index.css'

const EmptyView = () => (
  <div
    style={{minHeight: '50vh'}}
    className="d-flex flex-column align-items-center justify-content-center"
  >
    <p className="text-secondary">Cart is Empty</p>
    <Link to="/">
      <button className="btn btn-primary" type="button">
        Order now
      </button>
    </Link>
  </div>
)

const Cart = () => {
  const {cartList, appName} = useContext(CartContext)

  const totalRupee = cartList.reduce(
    (acc, item) => acc + item.quantity * item.dishPrice,
    0,
  )

  return (
    <div>
      <Header restaurantName="UNI Resto Cafe" />
      {cartList.length === 0 ? (
        <EmptyView />
      ) : (
        <div>
          <div className="d-none d-md-flex justify-content-between p-4">
            <p className="text-start" style={{width: '40%'}}>
              Item
            </p>
            <p className="text-center" style={{width: '30%'}}>
              Quantity
            </p>
            <p className="text-end me-5" style={{width: '30%'}}>
              Price
            </p>
          </div>
          {cartList.map(each => (
            <CartItem key={each.dishId} details={each} />
          ))}
          <div className="d-flex justify-content-between p-3">
            <p>Total Price: Rs{totalRupee}/-</p>
            <button className="btn btn-warning" type="button">
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
