import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext({
  items: {},
  cartCount: 0,
  cartTotal: 0,
  cartList: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState({});

  const addToCart = (product) => {
    if (!product?.id) return;

    setItems((prev) => {
      const existing = prev[product.id];
      const nextQuantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [product.id]: {
          ...product,
          quantity: nextQuantity,
        },
      };
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) {
        const clone = { ...prev };
        delete clone[productId];
        return clone;
      }
      const existing = prev[productId];
      if (!existing) return prev;
      return {
        ...prev,
        [productId]: {
          ...existing,
          quantity,
        },
      };
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => {
      const clone = { ...prev };
      delete clone[productId];
      return clone;
    });
  };

  const clearCart = () => setItems({});

  const cartList = useMemo(() => Object.values(items), [items]);

  const cartCount = useMemo(
    () => cartList.reduce((total, item) => total + item.quantity, 0),
    [cartList]
  );

  const cartTotal = useMemo(
    () => cartList.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartList]
  );

  const value = {
    items,
    cartList,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);


