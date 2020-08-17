import axios from 'axios'
import authHeader from './data-service';


const GET_USERS='/api/user/users';

const EDIT_USER='/api/user/edit';
const CREATE_USER='/api/user/create';
const DELETE_USER='/api/user/delete';
const RECOVERY_USER='/api/user/recovery';
const REMOVE_USER='/api/user/remove';
const GET_CURRENT_SESSION_USER='/api/session/get_session_user';


export default {

    getUsersApi(bool){
        return axios.get(GET_USERS+'?bool='+bool, { headers: authHeader() })
    },


    editUserApi(user){
        return axios.post(EDIT_USER, user,{ headers: authHeader() })
    },

    createUserApi(user){
        return axios.post(CREATE_USER, user,{ headers: authHeader() })
    },


    deleteUserApi(userId, bool,roleId){
        console.log(userId)
        return axios.get(DELETE_USER +'?userId='+userId+'&bool='+ bool+'&roleId='+roleId,{ headers: authHeader() })
    },

    recoveryUserApi(userId, bool){
        console.log(userId)
        return axios.get(RECOVERY_USER +'?userId='+userId+'&bool='+ bool,{ headers: authHeader() })
    },

    removeUserApi(userId){
        console.log(userId)
        return axios.get(REMOVE_USER +'?userId='+userId,{ headers: authHeader() })
    },


    get_session_user(){

        return axios.get(GET_CURRENT_SESSION_USER,{ headers: authHeader() })
    },



    test(date){
        return axios.post('/api/test/date',date,{ headers: authHeader() })
    },











}
