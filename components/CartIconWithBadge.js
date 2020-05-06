import React from "react"
import IconWithBadge from "./IconWithBadge";

import { CartContext } from "../contexts/Cart"

export default function CartIconWithBadge(props) {
    return (
        <CartContext.Consumer>
            {({ totalAmount }) => (
                <IconWithBadge {...props} badgeCount={totalAmount} />
            )}
        </CartContext.Consumer>
    )
}