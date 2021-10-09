import { createApp } from 'vue'
import App from './App.vue'
import hasPermission from './utils/permission'
import store, { globalStoreKey } from './store';
// import SvgIcon from './components/common/svgicon/index.vue'; // svg组件

const app = createApp(App);
// app.use(hasPermission);
// app.component('SvgIcon', SvgIcon);
app.use(store, globalStoreKey);
app.mount('#app')
