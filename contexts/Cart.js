import React, { Component } from "react";
import { AsyncStorage } from "react-native"
import { ThemeConsumer } from "react-native-elements";

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cartItems: [],
        totalAmount: 0,
        totalMoney: 0
    }
    this.addToCart = this.addToCart.bind(this);
    this.increaseAmount = this.increaseAmount.bind(this);
    this.decreaseAmount = this.decreaseAmount.bind(this);
    }

    addToCart = (book) => {
        let check = this.state.cartItems.find(item => item._id === book._id);
        if(!check) {
            const bookWithQuantity = { ...book, quantity: 1 };
            this.setState({
                cartItems: [...this.state.cartItems, bookWithQuantity],
                totalAmount: this.state.totalAmount + 1,
                totalMoney: this.state.totalMoney += parseFloat(book.price)
            });
        // this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
        } else {
            this.increaseAmount(book);
        }
    }

    increaseAmount = (book) => {
        this.setState({
            cartItems: this.state.cartItems.map(item => {
                if (item._id === book._id) {
                    item.quantity = item.quantity + 1;
                }
                return item;
            }),
            totalAmount: this.state.totalAmount + 1,
            totaltotalMoney: this.state.totalMoney += parseFloat(book.price)
        });
        //await this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
    }

    decreaseAmount = (book) => {
        if (book.quantity > 1) {
            this.setState({
                cartItems: this.state.cartItems.map(item => {
                if (item._id === book._id) {
                    item.quantity = item.quantity - 1;
                }
                return item;
                }),
                totalAmount: this.state.totalAmount - 1,
                totalMoney: this.state.totalMoney -= parseFloat(book.price)
            });
        //await this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
        }
        else {
            this.setState({
                cartItems: this.state.cartItems.filter(item => item._id !== book._id),
                totalAmount: this.state.totalAmount - 1,
                totalMoney: this.state.totalMoney -= parseFloat(book.price)
            })
        //await this._saveDataToAsyncStorage(this.state.cartItems, this.state.totalAmount, this.state.totalMoney);
        }
    }

    removeBook = (book) => {
        this.setState({
            cartItems: this.state.cartItems.filter(item => item._id !== book._id),
            totalAmount: this.state.totalAmount - book.quantity,
            totalMoney: this.state.totalMoney -= parseFloat(book.price * book.quantity)
        })
    }

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
            cartItems: this.state.cartItems,
            addToCart: this.addToCart,
            increaseAmount: this.increaseAmount,
            decreaseAmount: this.decreaseAmount,
            removeBook: this.removeBook
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}