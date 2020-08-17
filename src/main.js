import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueI18n from 'vue-i18n'


import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

import dictionary_api from "./api/dictionary_api";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});






import store from './store/store'
import router from '@/router/router'




 // if(process.env.VUE_API_VARIABLE){
 //     axios.defaults.baseURL = 'http://192.168.1.67:8090/ap/v1'
 // }
 // else{
 //     axios.defaults.baseURL = '/ap/v1'
 // }



// Локально
axios.defaults.baseURL='http://localhost:8090/ap/v1';


getDictionary().then( words => {
  store.state.dictionary = words;
  Vue.config.productionTip = false;
  Vue.use(VueI18n);


  let defLocale = sessionStorage.getItem('ias-locale');
  const i18n = new VueI18n({
    locale: defLocale || 'ru',
    messages: store.state.dictionary,
    silentTranslationWarn: true
  });


  new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
  }).$mount('#app');
});




function getDictionary() {
    return new Promise((resolve, reject) => {
        dictionary_api.getWordsApi()
            .then(rs => {
              resolve(rs.data)
            }).catch(err=>{
              reject(err)
        })
    })
}
