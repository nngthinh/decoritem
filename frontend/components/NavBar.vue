<template>
  <!-- <div class="w3-main" style="margin-left:250px"> -->
  <div>
    <!-- <div class="w3-hide-large" style="margin-top:83px"></div> -->
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand 
        ><nuxt-link to="/" class="nav-item-link"
          >DecorHome</nuxt-link
        ></b-navbar-brand
      >

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" align="right">
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
          <!-- <b-nav-item class="mx-2" href="/cart"
            ><i class="fa fa-shopping-cart"></i
          ></b-nav-item> -->
          <nuxt-link class="ml-4 nav-item-link" to="/cart" 
            ><i class="fa fa-shopping-cart"></i
          ></nuxt-link>
          <nuxt-link class="ml-4 nav-item-link" to="#"
            ><i class="fa fa-user"></i
          ></nuxt-link>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<style scoped>
.nav-item-link {
  text-decoration: none;
  color: white;
}
</style>