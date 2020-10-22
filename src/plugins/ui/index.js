// src/plugins/ui/index.js
// import { IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap plugins as needed.
import { NavbarPlugin } from 'bootstrap-vue/esm/components/navbar';
import { PaginationPlugin } from 'bootstrap-vue/esm/components/pagination';
import { TablePlugin } from 'bootstrap-vue/esm/components/table';
import { ToastPlugin } from 'bootstrap-vue/esm/components/toast';

import './custom.scss';
/*
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import TabMenu from 'primevue/tabmenu';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';

import Toast from 'primevue/toast';
*/

import DefaultPage from '../layout/DefaultPage.vue';

export default {
  install(Vue) {
    // Install BootstrapVue components.
    Vue.use(NavbarPlugin);
    Vue.use(PaginationPlugin);
    Vue.use(TablePlugin);
    Vue.use(ToastPlugin);

    // Vue.use(IconsPlugin);

    Vue.component('DefaultPage', DefaultPage);
  },
};
