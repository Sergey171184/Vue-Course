<template>
  <main>
    <Spinner :visible="isLoading" />
    <div v-if="!isLoading">
      <div class="banner coffepage-banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <nav-bar-component />
            </div>
          </div>
          <h1 class="title-big">Our Coffee</h1>
        </div>
      </div>

      <section class="shop">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 offset-2">
              <img
                class="shop__girl"
                src="@/assets/img/coffee_girl.jpg"
                alt="girl"
              />
            </div>
            <div class="col-lg-4">
              <div class="title">About our beans</div>
              <img
                class="beanslogo"
                src="@/assets/logo/Beans_logo_dark.svg"
                alt="Beans logo"
              />
              <div class="shop__text">
                Extremity sweetness difficult behaviour he of. On disposal of as
                landlord horrible.
                <br /><br />
                Afraid at highly months do things on at. Situation recommend
                objection do intention<br />
                so questions. <br />
                As greatly removed calling pleased improve an. Last ask him cold
                feel<br />
                met spot shy want. Children me laughing we prospect answered
                followed. At it went<br />
                is song that held help face.
              </div>
            </div>
          </div>

          <div class="line"></div>

          <div class="row">
            <div class="col-lg-4 offset-2">
              <form action="#" class="shop__search" @submit.prevent>
                <label class="shop__search-label" for="filter"
                  >Looking for</label
                >
                <input
                  id="filter"
                  type="text"
                  placeholder="start typing here..."
                  class="shop__search-input"
                  v-model="searchValue"
                  @input="onSearchInput"
                />
              </form>
            </div>
            <div class="col-lg-4">
              <div class="shop__filter">
                <div class="shop__filter-label" @click="resetFilters">
                  Or filter
                </div>
                <div class="shop__filter-group">
                  <button
                    class="shop__filter-btn"
                    @click="filterByCountry('Brazil')"
                  >
                    Brazil
                  </button>
                  <button
                    class="shop__filter-btn"
                    @click="filterByCountry('Kenya')"
                  >
                    Kenya
                  </button>
                  <button
                    class="shop__filter-btn"
                    @click="filterByCountry('Columbia')"
                  >
                    Columbia
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <div class="shop__wrapper">
                <product-card
                  v-for="card in coffee"
                  :key="card.id"
                  classItem="shop__item"
                  :card="card"
                  @onNavigate="navigate"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import NavBarComponent from "@/components/NavBarComponent.vue";
import ProductCard from "@/components/ProductCard.vue";
import Spinner from "@/components/Spinner.vue";
import { loadingMixin } from "@/mixins/loadingMixin";
import { navigate } from "@/mixins/navigate";
import { mapGetters, mapActions } from "vuex";
import debounce from "debounce";

export default {
  components: { NavBarComponent, ProductCard, Spinner },
  mixins: [loadingMixin, navigate],
  data() {
    return {
      name: "coffee",
    };
  },
  computed: {
    ...mapGetters({
      coffee: "getCoffee",
    }),
    searchValue: {
      get() {
        return this.$store.getters.getSearchValue;
      },
      set(value) {
        this.$store.dispatch("setSearchValue", value);
      },
    },
    sortValue: {
      get() {
        return this.$store.getters.getSortValue || "";
      },
      set(value) {
        this.$store.dispatch("setSortValue", value);
      },
    },
  },
  methods: {
    ...mapActions(["setCoffeeData"]),

    async loadData() {
      this.startLoading();
      try {
        const params = {};
        if (this.searchValue) params["name:contains"] = this.searchValue;
        if (this.sortValue) params.country = this.sortValue;

        const queryParams = new URLSearchParams(params).toString();
        const url = `http://localhost:3000/coffee${
          queryParams ? `?${queryParams}` : ""
        }`;
        const res = await fetch(url);
        const data = await res.json();
        this.setCoffeeData(data);
      } finally {
        this.stopLoading();
      }
    },

    onSearchInput: debounce(function () {
      this.loadData();
    }, 500),

    filterByCountry(country) {
      if (this.sortValue === country) {
        this.sortValue = "";
      } else {
        this.sortValue = country;
      }
      this.loadData();
    },

    resetFilters() {
      this.searchValue = "";
      this.sortValue = "";
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.shop__filter-label {
  cursor: pointer;
}
</style>