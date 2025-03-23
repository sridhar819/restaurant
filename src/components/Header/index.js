import {IoCart} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import CartContext from '../../CartContext'
import './index.css'

const Header = props => {
  const {restaurantName} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const getCartCount = cartList.length

        return (
          <nav className="navbar">
            <Link to="/">
              <h1 className="nav-head">{restaurantName}</h1>
            </Link>
            <Link to="/cart" className="cart-icon">
              <p className="d-none d-md-block mt-3">My Orders</p>

              <button type="button" data-testid="cart" className="nav-cart">
                <IoCart size={23} />
                <p className="count">{getCartCount}</p>
              </button>
            </Link>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Header
