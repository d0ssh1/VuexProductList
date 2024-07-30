<template>
  <div class="product-list">

    <div class="input-group">
      <input v-model="newProduct.name" :class="{ 'error': error.name }" placeholder="Add a new product" />
      <input v-model="newProduct.price" type="number" min="0" @input="validatePrice" :class="{ 'error': error.price }" placeholder="Add a price" />
      <button @click="addNewProduct">Add</button>
    </div>
    <ul>
      <li v-for="product in products" :key="product.id" :class="{ completed: product.completed }">
        {{ product.name }} - ${{ product.price }}
        <button @click="deleteProduct(product.id)">x</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Products',
  data() {
    return {
      newProduct: {
        name: '',
        price: null,
      },
      error: {
        name: false,
        price: false,
      },
    };
  },
  computed: {
    products() {
      return this.$store.getters.allProducts;
    },
  },
  methods: {
    validatePrice() {
      if (this.newProduct.price < 0) {
        this.newProduct.price = 0;
      }
    },
    fetchProducts() {
      this.$store.dispatch('fetchProducts');
    },
    addNewProduct() {
      this.error.name = !this.newProduct.name.trim();
      this.error.price = !this.newProduct.price;
      if (this.error.name || this.error.price) {
        return;
      }

      const newId = Math.max(0, ...this.products.map(p => p.id)) + 1;
      this.$store.dispatch('addProduct', {
        id: newId,
        name: this.newProduct.name,
        price: this.newProduct.price,
        completed: false,
      });

      this.newProduct.name = '';
      this.newProduct.price = null;
      this.error.name = false;
      this.error.price = false;
    },
    toggleProduct(productId) {
      this.$store.dispatch('toggleProduct', productId);
    },
    deleteProduct(productId) {
      this.$store.dispatch('deleteProduct', productId);
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product-list {
  width: 50%;
  margin: 0 auto;
  text-align: left;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input-group input[type="text"], .input-group input[type="number"] {
  width: calc(50% - 5px);
  padding: 8px;
}

input.error {
  border: 1px solid red;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  background: #f9f9f9;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
}

li.completed {
  text-decoration: line-through;
  color: grey;
}

li button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  margin-left: auto;
}
</style>
