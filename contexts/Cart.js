import React, { Component } from "react";
import { AsyncStorage } from "react-native"

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      totalAmount: 2,
      totalMoney: 0
    }
    // this.addToCart = this.addToCart.bind(this);
    // this.increase = this.increase.bind(this);
    // this.decrease = this.decrease.bind(this);
  }

//   addToCart = async (product) => {
//     let check = this.state.cartItems.find(item => item.id === product.id);
//     if(!check) {
//       const productWithQuantity = { ...product, quantity: 1 };
//       this.setState({
//           cartItems: [...this.state.cartItems, productWithQuantity],
//           totalAmount: this.state.totalAmount + 1,
//           totalMoney: this.state.totalMoney += parseFloat(product.price.split('.').join(''))
//       });
//       this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
//     } else {
//         this.increase(product);
//     }
//   }

//   increase = async (product) => {
//     await this.setState({
//         cartItems: this.state.cartItems.map(item => {
//             if (item.id === product.id) {
//               item.quantity = item.quantity + 1;
//             }
//             return item;
//         }),
//         totalAmount: this.state.totalAmount + 1,
//         totaltotalMoney: this.state.totalMoney += parseFloat(product.price.split('.').join(''))
//     });
//     await this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
//   }

//   decrease = async (product) => {
//     if (product.quantity > 1) {
//       await this.setState({
//         cartItems: this.state.cartItems.map(item => {
//           if (item.id === product.id) {
//             item.quantity = item.quantity - 1;
//           }
//           return item;
//         }),
//         totalAmount: this.state.totalAmount - 1,
//         totalMoney: this.state.totalMoney -= parseFloat(product.price.split('.').join(''))
//       });
//       await this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
//     }
//     else {
//       await this.setState({
//         cartItems: this.state.cartItems.filter(item => item.id !== product.id),
//         totalAmount: this.state.totalAmount - 1,
//         totalMoney: this.state.totalMoney -= parseFloat(product.price.split('.').join(''))
//       })
//       await this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
//     }
//   }

//   _saveDataToAsyncStorage = async (cartItems, totalAmount, totalMoney) => {
//     await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
//     await AsyncStorage.setItem('totalAmount', JSON.stringify(totalAmount));
//     await AsyncStorage.setItem('totalMoney', JSON.stringify(totalMoney));
//   }

//   _getDataFromAsyncStorage = async () => {
//       const cartItems = await AsyncStorage.getItem('cartItems');
//       const totalAmount = await AsyncStorage.getItem('totalAmount');
//       const totalMoney = await AsyncStorage.getItem('totalMoney');
//       await this.setState({
//         cartItems: JSON.parse(cartItems) || [],
//         totalAmount: Number(totalAmount) || 0,
//         totalMoney: Number(totalMoney)
//       })
//   }

//   componentDidMount() {
//     this._getDataFromAsyncStorage();
//   }

  render() {
    return (
      <CartContext.Provider
        value={{
            totalAmount: this.state.totalAmount,
            totalMoney: this.state.totalMoney,
            // cartItems: this.state.cartItems,
            // addToCart: this.addToCart,
            // increase: this.increase,
            // decrease: this.decrease
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}