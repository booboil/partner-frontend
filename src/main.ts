import {createApp} from 'vue';
import App from './App.vue';
// import { Button , NavBar , Icon , Tabbar, TabbarItem,Search,Divider,Tag} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/route";
import Vant from 'vant';
import 'vant/lib/index.css';
import '../global.css'
import moment from 'moment'
import momentCN from "./plugins/momentCN";

const app = createApp(App)
// app.use(Button);
// app.use(NavBar);
// app.use(Icon);
// app.use(Tabbar);
// app.use(TabbarItem);
// app.use(Search);
// app.use(Divider);
// app.use(Tag);
app.use(Vant);

// @ts-ignore
moment.locale('zh-cn', momentCN);

app.config.globalProperties.$moment = moment

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})
app.use(router)
app.mount('#app')
