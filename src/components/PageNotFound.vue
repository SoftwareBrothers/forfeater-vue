<template>
  <div class="hero is-medium has text centered">
    <div class="hero-body has-text-centered">
      <router-link :to="{ name: 'Home' }">
        <h1 class="title is-1 has-text-centered">Gary move out!</h1>
      </router-link>
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/images/404.jpeg" />
      </router-link>
      <div class="buttons, has-text-centered">
        <b-button
          size="is-large"
          tag="router-link"
          :to="{ name: 'Home' }"
          type="is-primary"
        >
          Back
        </b-button>
      </div>
    </div>
  </div>
</template>
