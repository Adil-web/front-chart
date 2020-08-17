import axios from 'axios'

const BY_IIN = '/api/auth/login_ecp';
const AUTHORIZATION_URL='/api/auth/signin';

export default {

    login(user){
        return axios.post(AUTHORIZATION_URL,user)
    },

    loginByEcp(iin){
        return axios.get(BY_IIN+'?iin='+iin)
    }




}
