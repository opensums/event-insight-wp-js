import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import ui from './plugins/ui';

import App from './App.vue';
import Home from './Home.vue';
import Help from './Help.vue';

import wp from './plugins/wp/store';

import * as TicketTailor from './plugins/ticket-tailor';

// console.log(window.location);

const { href } = window.location;

const pos = href.search(/[#?]/);
const base = pos === -1 ? href : href.substring(0, pos);

const router = new VueRouter({
  base,
  routes: [
    { path: '/', component: Home },
    { path: '/help', component: Help },
    ...TicketTailor.routes,
  ],
});

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(ui);

// Import javascript globals.
// Vue.prototype.$Tabulator = window.Tabulator;

const store = new Vuex.Store({
  modules: { wp, 'ticket-tailor': TicketTailor.store },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#event-insight-app');
