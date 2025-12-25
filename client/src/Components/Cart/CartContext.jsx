import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

// Get user-specific storage key
const getStorageKey = (userId) => {
  return userId ? `eliteCafeCart_${userId}` : "eliteCafeCart_guest";
};

export const CartProvider = ({ children }) => {
  // Get current user ID from localStorage or token
  const getUserId = () => {
    // First try to get from localStorage (set during login)
    const userId = localStorage.getItem("userId");
    if (userId) return userId;
    
    // Fallback: decode JWT token to get user ID
    try {
      const token = localStorage.getItem("accesstoken");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || null;
    } catch (err) {
      return null;
    }
  };

  const [currentUserId, setCurrentUserId] = useState(getUserId());
  const [items, setItems] = useState(() => {
    try {
      const userId = getUserId();
      const storageKey = getStorageKey(userId);
      const cached = localStorage.getItem(storageKey);
      return cached ? JSON.parse(cached) : {};
    } catch (err) {
      console.warn("Failed to parse cart cache", err);
      return {};
    }
  });

  // Watch for user changes (login/logout)
  useEffect(() => {
    const checkUserChange = () => {
      const newUserId = getUserId();
      if (newUserId !== currentUserId) {
        // User changed - clear old cart and load new user's cart
        setCurrentUserId(newUserId);
        const newStorageKey = getStorageKey(newUserId);
        try {
          const cached = localStorage.getItem(newStorageKey);
          setItems(cached ? JSON.parse(cached) : {});
        } catch (err) {
          setItems({});
        }
      }
    };

    // Check on mount and periodically
    checkUserChange();
    const interval = setInterval(checkUserChange, 1000);
    return () => clearInterval(interval);
  }, [currentUserId]);

  // Save cart to user-specific storage
  useEffect(() => {
    const userId = getUserId();
    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(items));
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

