<template>
  <header>
    <ul
      class="header d-flex justify-content-center justify-content-md-start flex-wrap"
    >
      <li class="header__item">
        <router-link to="/">
          <img src="@/assets/logo/Logo.svg" alt="logo" />
        </router-link>
      </li>
      <li class="header__item">
        <router-link to="/our-coffee">Our coffee</router-link>
      </li>
      <li class="header__item">
        <router-link to="/for-your-pleasure">For your pleasure</router-link>
      </li>
      <li class="header__item">
        <router-link to="/contact-us">Contact us</router-link>
      </li>
    </ul>
  </header>
</template>