import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id && i.color === action.payload.color);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id && i.color === action.payload.color
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => !(i.id === action.payload.id && i.color === action.payload.color)) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id && i.color === action.payload.color
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const getInitial = () => {
  try {
    const saved = localStorage.getItem('ruthu_cart');
    return saved ? JSON.parse(saved) : { items: [] };
  } catch { return { items: [] }; }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitial);

  useEffect(() => {
    localStorage.setItem('ruthu_cart', JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addToCart = (product, color, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { ...product, color, quantity } });
  const removeFromCart = (id, color) => dispatch({ type: 'REMOVE_ITEM', payload: { id, color } });
  const updateQuantity = (id, color, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, color, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const isInCart = (id) => state.items.some(i => i.id === id);

  return (
    <CartContext.Provider value={{ cart: state, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
