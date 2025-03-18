import CartContext from '../../CartContext'
import './index.css'

const FoodItem = ({details}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addonCat,
    quantity,
  } = details
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, addCart, removeCart} = value

        const isInclude = cartList.find(each => each.dishId === dishId)

        const increment = () => {
          addCart({...details, quantity: 1})
        }

        const decrement = () => {
          removeCart(dishId)
        }

        return (
          <li className="food-item">
            <div className="food-details">
              <div
                style={{borderColor: dishType === 2 ? 'green' : 'red'}}
                className="dish-type"
              >
                <div style={{background: dishType === 2 ? 'green' : 'red'}}>
                  <p className="d-none">dark</p>
                </div>
              </div>
              <div className="details-card">
                <h1>{dishName}</h1>
                <p className="price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-des">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="d-flex align-items-center gap-2 my-2">
                    <button
                      onClick={decrement}
                      className="btn btn-outline-danger"
                      type="button"
                    >
                      -
                    </button>
                    <p>{isInclude ? isInclude.quantity : quantity}</p>
                    <button
                      onClick={increment}
                      className="btn btn-outline-success"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="text-danger fs-6">Not available</p>
                )}
                {addonCat.length > 0 && (
                  <p className="custom">Customizations available</p>
                )}
              </div>
            </div>
            <p className="calory">{dishCalories} calories</p>
            <div className="dish-image">
              <img src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItem
