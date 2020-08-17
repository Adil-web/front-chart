import common_api from "../api/common_api";

export const loginAction= ({commit},user)=>{
    return new Promise((resolve, reject) => {
        common_api.login(user)
            .then(response=>{
                if(response.data.id && response.data.token){
                    commit('loginSuccessMutation',response.data)
                    resolve(response);
                }
            }).catch((er)=>{
                reject(er);
        })
    })
}
