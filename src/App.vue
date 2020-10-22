<template>
  <div id="event-insight-app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <b-toaster-bottom-center />
  </div>
</template>

<style lang="scss">
// ## Fix problems caused by embedding in WordPress.

// WP sets this to 13px.
#event-insight-app p {
  font-size: inherit;
  line-height: inherit;
}

// Remove the padding to the left of our own responsive layout.
#wpcontent {
  padding-left: 0;
}

// ## Fix problems caused by Bootstrap overrides.

// Switch back the to WP admin font declaration.
#event-insight-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  // But use a slightly bigger font than WP's 13px.
  font-size: 14px;
}

/*

// WP default of 1.4 is too little.
body {
  color: #495057; // #444
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1rem; // 13px
  line-height: 1.5; // 1.4
}

*/
</style>
