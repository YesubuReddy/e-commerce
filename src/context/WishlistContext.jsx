import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state.items.find(i => i.id === action.payload.id)
        ? { ...state, items: state.items.filter(i => i.id !== action.payload.id) }
        : { ...state, items: [...state.items, action.payload] };
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    default:
      return state;
  }
};

const getInitial = () => {
  try {
    const saved = localStorage.getItem('ruthu_wishlist');
    return saved ? JSON.parse(saved) : { items: [] };
  } catch { return { items: [] }; }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, undefined, getInitial);

  useEffect(() => {
    localStorage.setItem('ruthu_wishlist', JSON.stringify(state));
  }, [state]);

  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id });
  const isWishlisted = (id) => state.items.some(i => i.id === id);
  const totalWishlist = state.items.length;

  return (
    <WishlistContext.Provider value={{ wishlist: state, toggleWishlist, removeFromWishlist, isWishlisted, totalWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider');
  return ctx;
};
