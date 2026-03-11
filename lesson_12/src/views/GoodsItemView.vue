<template>
  <main>
    <Spinner :visible="isLoading" />
    <div v-if="!isLoading">
      <div
        class="banner"
        :class="pageName === 'coffee' ? 'coffepage-banner' : 'goodspage-banner'"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <nav-bar-component />
            </div>
          </div>
          <h1 class="title-big" v-if="product">{{ product.name }}</h1>
        </div>
      </div>

      <section class="shop" v-if="product">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 offset-0 offset-lg-1">
              <img
                class="shop__girl img-fluid"
                alt="coffee_item"
                :src="product.image"
                style="max-width: 100%; height: auto; display: block"
              />
            </div>
            <div class="col-lg-4">
              <div class="title">About it</div>
              <img
                class="beanslogo"
                src="@/assets/logo/Beans_logo_dark.svg"
                alt="Beans logo"
              />
              <div class="shop__point" v-if="product.country">
                <span>Country:</span>
                {{ product.country }}
              </div>
              <div class="shop__point" v-if="product.description">
                <span>Description:</span>
                {{ product.description }}
              </div>
              <div class="shop__point">
                <span>Price: </span>
                <span class="shop__point-price">{{ product.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import NavBarComponent from "@/components/NavBarComponent.vue";
import Spinner from "@/components/Spinner.vue";
import { loadingMixin } from "@/mixins/loadingMixin";

export default {
  components: { NavBarComponent, Spinner },
  mixins: [loadingMixin],
  computed: {
    pageName() {
      return this.$route.name; // 'coffee' или 'goods'
    },
    product() {
      if (this.pageName === "coffee") {
        return this.$store.getters.getCurrentCoffee;
      } else {
        return this.$store.getters.getCurrentGoods;
      }
    },
  },
  methods: {
    async loadProduct() {
      const id = this.$route.params.id;
      this.startLoading();
      try {
        if (this.pageName === "coffee") {
          await this.$store.dispatch("fetchCoffeeById", id);
        } else {
          await this.$store.dispatch("fetchGoodsById", id);
        }
      } finally {
        this.stopLoading();
      }
    },
  },
  mounted() {
    this.loadProduct();
  },
  beforeDestroy() {
    // Сбрасываем текущий товар
    if (this.pageName === "coffee") {
      this.$store.commit("setCurrentCoffee", null);
    } else {
      this.$store.commit("setCurrentGoods", null);
    }
  },
};
</script>