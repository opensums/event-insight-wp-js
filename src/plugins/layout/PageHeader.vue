<template>
  <b-navbar toggleable="sm" type="dark" class="site-nav dense">
    <div class="container">
      <b-navbar-brand to="/">Event Insight</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/ticket-tailor">Ticket Tailor</b-nav-item>
          <b-nav-item to="/help">Help</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<style lang="scss">
.navbar.site-nav {
  background: #43494f;
}
</style>
