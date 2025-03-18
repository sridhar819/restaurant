import {IoCart} from 'react-icons/io5'
import CartContext from '../../CartContext'
import './index.css'

const Header = props => {
  const {restaurantName} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const getCartCount = () => {
          return cartList.reduce((sum, dish) => sum + dish.quantity, 0)
        }

        return (
          <nav className="navbar">
            <h1 className="nav-head">{restaurantName}</h1>
            <div className="cart-icon">
              <p className="d-none d-md-block mt-3">My Orders</p>
              <div className="nav-cart">
                <IoCart size={23} />
                <p className="count">{getCartCount()}</p>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Header
