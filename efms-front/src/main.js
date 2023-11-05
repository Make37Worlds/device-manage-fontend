import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'

import App from './App'
import router from './router'
import cookie from "js-cookie"
import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
import {
    Step,
    Steps,
    Pagination,
    Dialog,
    Descriptions,
    DescriptionsItem,
    Divider,
    Menu,
    MenuItem,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Tag,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Form,
    FormItem,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Link,
    Loading,
    MessageBox,
    Message,
    Notification,
    Empty,
    Popconfirm
} from 'element-ui';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
    /* eslint-disable no-new */

Vue.use(Step);
Vue.use(Steps);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Descriptions);
Vue.use(DescriptionsItem);
Vue.use(Divider);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Link);
Vue.use(Empty);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$cookie = cookie;

axios.defaults.baseURL = 'http://54.169.219.171:80';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        // 在每次请求之前设置token
        config.headers["token"] = store.getters.getToken;
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
