// import admin_api from "@/api/admin_api";
import user_api from "../../api/user_api";

export const getUsersAction= ({commit})=>{
    return new Promise((resolve, reject) => {
        user_api.getUsers()
            .then(response=>{
                commit('usersMutation',response.data);
            })
            .catch(error=>{
                reject(error);
            })
    })

}




// export const editUserAction= ({commit},user)=>{
//     return new Promise((resolve, reject) => {
//         admin_api.editUser(user)
//             .then(response=>{
//                 commit('usersMutation',response.data);
//             })
//             .catch(error=>{
//                 reject(error);
//             })
//     })
//
// }

// export const createUserAction= ({commit},user)=>{
//     return new Promise((resolve, reject) => {
//         admin_api.createUser(user)
//             .then(response=>{
//                 commit('usersMutation',response.data);
//             })
//             .catch(error=>{
//                 reject(error);
//             })
//     })
//
// }


// export const deleteUserAction= ({commit},userId)=>{
//     return new Promise((resolve, reject) => {
//         admin_api.deleteUser(userId)
//             .then(response=>{
//                 commit('usersMutation',response.data);
//             })
//             .catch(error=>{
//                 reject(error);
//             })
//     })
//
// }

