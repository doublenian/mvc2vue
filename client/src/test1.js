import Vue from "vue";
import { Button, TableColumn, Table } from "element-ui";
import App from "./test-page1.vue";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
new Vue({
  render: (h) => h(App),
}).$mount("#root");
