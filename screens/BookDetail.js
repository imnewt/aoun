import React from "react"
import Container from "../components/Container"
import BookDetailItem from "../components/BookDetailItem"
import LinearButton from "../components/LinearButton"
import { CartContext } from "../contexts/Cart"

export default function BookDetail(props) {
    const { book } = props.route.params;
    return (
        <Container>
            <BookDetailItem book={book}/>
            <CartContext.Consumer>
                {({ addToCart }) => <LinearButton onPress={() => addToCart(book)} title="add to cart" price={book.price}/> }
            </CartContext.Consumer>
        </Container>
    )
}