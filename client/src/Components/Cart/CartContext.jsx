import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "eliteCafeCart";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch (err) {
      console.warn("Failed to parse cart cache", err);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    if (!product?.id) return;
    setItems((prev) => {
      const existing = prev[product.id];
      const nextQuantity = (existing?.quantity || 0) + quantity;
      return {
        ...prev,
        [product.id]: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity: nextQuantity,
        },
      };
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) => {
      if (!prev[productId]) return prev;
      if (quantity <= 0) {
        const clone = { ...prev };
        delete clone[productId];
        return clone;
      }
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity,
        },
      };
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => {
      if (!prev[productId]) return prev;
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
    () =>
      cartList.reduce(
        (total, item) => total + item.quantity * (item.price || 0),
        0
      ),
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

