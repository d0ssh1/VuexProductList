import { createStore } from 'vuex';

const _products = [
    { id: 1, name: 'Product 1', price: 100, completed: false },
    { id: 2, name: 'Product 2', price: 200, completed: false },
    { id: 3, name: 'Product 3', price: 300, completed: false },
];

const shop = {
    getProducts(cb) {
        setTimeout(() => cb(_products), 100);
    },
};

const store = createStore({
    state: {
        products: [],
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        addProduct(state, product) {
            const existingProduct = state.products.find(p => p.id === product.id);
            if (!existingProduct) {
                state.products.unshift(product);
            }
        },
        toggleProduct(state, productId) {
            const product = state.products.find(p => p.id === productId);
            if (product) {
                product.completed = !product.completed;
            }
        },
        deleteProduct(state, productId) {
            state.products = state.products.filter(p => p.id !== productId);
        },
    },
    actions: {
        fetchProducts({ commit }) {
            shop.getProducts(products => {
                commit('setProducts', products);
            });
        },
        addProduct({ commit }, product) {
            commit('addProduct', product);
        },
        toggleProduct({ commit }, productId) {
            commit('toggleProduct', productId);
        },
        deleteProduct({ commit }, productId) {
            commit('deleteProduct', productId);
        },
    },
    getters: {
        allProducts: state => state.products,
    },
});

export default store;
