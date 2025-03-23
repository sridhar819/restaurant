import {Component} from 'react'
import Loader from 'react-loader-spinner'
import FoodItem from '../FoodItem'
import Header from '../Header'
import CartContext from '../../CartContext'
import './index.css'

const stagesList = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    dataList: [],
    activeStage: stagesList.initial,
    activeMenu: '',
    restaurantName: '',
  }

  componentDidMount() {
    this.getData()
  }

  toggleMenu = menu => {
    this.setState({activeMenu: menu})
  }

  getData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()

    if (response.ok) {
      const resName = data[0].restaurant_name
      const updatedData = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        nexturl: each.nexturl,
        categoryDishes: each.category_dishes.map(item => ({
          ...item,
          dishId: item.dish_id,
          dishName: item.dish_name,
          dishPrice: item.dish_price,
          dishImage: item.dish_image,
          dishCurrency: item.dish_currency,
          dishCalories: item.dish_calories,
          dishDescription: item.dish_description,
          dishAvailability: item.dish_Availability,
          dishType: item.dish_Type,
          quantity: 0,
        })),
      }))

      this.setState({
        activeStage: stagesList.success,
        dataList: updatedData,
        activeMenu: updatedData[0].menuCategory,
        restaurantName: resName,
      })
    } else {
      this.setState({activeStage: stagesList.failure})
    }
  }

  renderMenuList = () => {
    const {activeMenu, dataList} = this.state
    return (
      <ul className="menu-list">
        {dataList.map(each => (
          <li className="menu-name" key={each.menuCategoryId}>
            <button
              onClick={() => this.toggleMenu(each.menuCategory)}
              className={activeMenu === each.menuCategory ? 'active' : null}
              type="button"
            >
              {each.menuCategory}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="TailSpin" color="orange" height={40} width={40} />
    </div>
  )

  succesView = () => {
    const {dataList, activeMenu} = this.state
    const filteredList = dataList.find(each => each.menuCategory === activeMenu)

    return (
      <ul className="food-list">
        {filteredList?.categoryDishes.map(each => (
          <FoodItem key={each.dishId} details={each} />
        ))}
      </ul>
    )
  }

  renderPageView = () => {
    const {activeStage, restaurantName} = this.state

    switch (activeStage) {
      case stagesList.initial:
        return this.renderLoader()
      case stagesList.success:
        return (
          <>
            <Header restaurantName={restaurantName} />
            {this.renderMenuList()}
            {this.succesView()}
          </>
        )
      case stagesList.failure:
        return <p>Failure view</p>
      default:
        return null
    }
  }

  render() {
    const {restaurantName} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {addAppName} = value

          addAppName(restaurantName)

          return <div>{this.renderPageView()}</div>
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
