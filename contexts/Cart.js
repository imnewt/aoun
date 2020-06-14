import React, { Component } from "react"
import { AsyncStorage } from "react-native"

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
        this.clearCart = this.clearCart.bind(this);
    }

    addToCart =  (book) => {
        let check = this.state.cartItems.find(item => item._id === book._id);
        if(!check) {
            const bookWithQuantity = { ...book, quantity: 1 };
            this.setState({
                cartItems: [...this.state.cartItems, bookWithQuantity],
                totalAmount: this.state.totalAmount + 1,
                totalMoney: this.state.totalMoney += parseFloat(book.price)
            });
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
    }

    decreaseAmount =  (book) => {
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
        }
        else {
            this.setState({
                cartItems: this.state.cartItems.filter(item => item._id !== book._id),
                totalAmount: this.state.totalAmount - 1,
                totalMoney: this.state.totalMoney -= parseFloat(book.price)
            })
        }
    }

    removeBook = (book) => {
        this.setState({
            cartItems: this.state.cartItems.filter(item => item._id !== book._id),
            totalAmount: this.state.totalAmount - book.quantity,
            totalMoney: this.state.totalMoney -= parseFloat(book.price * book.quantity)
        })
    }

    clearCart = async () => {
        this.setState({
            cartItems: [],
            totalAmount: 0,
            totalMoney: 0
        });
    }

    saveDataToAsyncStorage = async () => {
        const { cartItems, totalAmount, totalMoney } = this.state;
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        await AsyncStorage.setItem('totalAmount', JSON.stringify(totalAmount));
        await AsyncStorage.setItem('totalMoney', JSON.stringify(totalMoney));
    }

    getDataFromAsyncStorage = async () => {
        const cartItems = await AsyncStorage.getItem('cartItems');
        const totalAmount = await AsyncStorage.getItem('totalAmount');
        const totalMoney = await AsyncStorage.getItem('totalMoney');
        this.setState({
            cartItems: JSON.parse(cartItems) || [],
            totalAmount: Number(totalAmount) || 0,
            totalMoney: Number(totalMoney)
        })
    }

    componentDidMount() {
        this.getDataFromAsyncStorage();
    }

    componentDidUpdate() {
        this.saveDataToAsyncStorage();
    }

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
                    removeBook: this.removeBook,
                    clearCart: this.clearCart
                }}
            >
                {this.props.children}
            </CartContext.Provider>
        )
    }
}