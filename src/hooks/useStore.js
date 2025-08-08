import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Classic Brown Teddy',
    description: 'A timeless brown teddy bear perfect for cuddling',
    price: 29.99,
    image: '/placeholder.svg',
    category: 'Classic',
    size: 'Medium',
    stock: 15,
    featured: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Pink Princess Bear',
    description: 'Adorable pink teddy with a sparkly crown',
    price: 34.99,
    originalPrice: 39.99,
    image: '/placeholder.svg',
    category: 'Princess',
    size: 'Large',
    stock: 8,
    featured: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Tiny Pocket Bear',
    description: 'Perfect small companion for on-the-go adventures',
    price: 12.99,
    image: '/placeholder.svg',
    category: 'Mini',
    size: 'Small',
    stock: 25,
    rating: 4.6,
    reviews: 156
  },
  {
    id: '4',
    name: 'Giant Cuddle Bear',
    description: 'Extra large teddy for the ultimate cuddle experience',
    price: 89.99,
    image: '/placeholder.svg',
    category: 'Giant',
    size: 'Extra Large',
    stock: 3,
    featured: true,
    rating: 5.0,
    reviews: 45
  },
  {
    id: '5',
    name: 'Cream Vanilla Bear',
    description: 'Soft cream-colored teddy with vanilla scent',
    price: 27.99,
    image: '/placeholder.svg',
    category: 'Scented',
    size: 'Medium',
    stock: 12,
    rating: 4.7,
    reviews: 78
  },
  {
    id: '6',
    name: 'Adventure Explorer Bear',
    description: 'Comes with hat and backpack for adventures',
    price: 42.99,
    image: '/placeholder.svg',
    category: 'Adventure',
    size: 'Large',
    stock: 6,
    rating: 4.8,
    reviews: 67
  }
];

export const useStore = create()(
  persist(
    (set, get) => ({
      // Authentication
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),

      // Products
      products: mockProducts,
      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({ 
        products: [...state.products, product] 
      })),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),

      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        } else {
          return {
            cart: [...state.cart, { ...product, quantity }]
          };
        }
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      updateCartQuantity: (productId, quantity) => set((state) => ({
        cart: quantity <= 0 
          ? state.cart.filter(item => item.id !== productId)
          : state.cart.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      // Orders
      orders: [],
      addOrder: (order) => set((state) => ({ 
        orders: [...state.orders, order] 
      })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      })),

      // POS
      posCart: [],
      addToPosCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.posCart.find(item => item.id === product.id);
        if (existingItem) {
          return {
            posCart: state.posCart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        } else {
          return {
            posCart: [...state.posCart, { ...product, quantity }]
          };
        }
      }),
      removeFromPosCart: (productId) => set((state) => ({
        posCart: state.posCart.filter(item => item.id !== productId)
      })),
      updatePosCartQuantity: (productId, quantity) => set((state) => ({
        posCart: quantity <= 0 
          ? state.posCart.filter(item => item.id !== productId)
          : state.posCart.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
      })),
      clearPosCart: () => set({ posCart: [] }),
      getPosCartTotal: () => {
        const { posCart } = get();
        return posCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'teddylove-store',
    }
  )
);