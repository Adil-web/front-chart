<template>
    <v-app >
        <v-container fluid fill-height >
            <!-- background image -->
            <v-img
                    src="./../assets/login-bg.jpg"
                    class="login-bg"
            ></v-img>
            <v-layout align-center justify-center>
                <div v-if="electronCard">
                    <v-dialog v-model="electronCard" persistent max-width="600px">
                        <sign-component
                                v-on:close-electron-card="electronCard=!electronCard"
                                v-on:sign_result="getSignResult"
                        ></sign-component>
                    </v-dialog>
                </div>
                <div style="max-width: 500px; margin: 0 auto;" xs12>
                    <v-card tile style="background-color: rgba(255,255,255,0.7); border-radius: 25px" class="pt-5" >
                        <v-img
                                src="./../assets/Atiray-logo.png"
                                height="150px"
                                width="150px"
                                class="mx-auto mb-5"
                        ></v-img>
                        <div class="text-center blue accent-2">
                            <v-card-title>Информационно-аналитическая система</v-card-title>
                            <v-card-subtitle >Атырауской области</v-card-subtitle>
                        </div>
                        <v-card-text>
                            <v-form>
                                <v-text-field  prepend-icon="mdi-logout" name="login" placeholder="Логин" type="text" v-model="username"></v-text-field>
                                <v-text-field id="password"
                                              prepend-icon="mdi-security"
                                              name="password"
                                              placeholder="Пароль"
                                              type="password"
                                              v-model="password"
                                              v-on:keypress.enter="submit"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="pb-5">
                            <v-btn rounded block color="blue accent-2" v-on:click="submit" >Войти</v-btn>
                        </v-card-actions>
                        <span style="color:#005bd1; cursor: pointer; margin-left: 30%;" @click="ecpLogin">Войти с помощью ЭЦП </span>
                        <v-alert v-if="errorMessage" dense type="error">{{errorMessage}}</v-alert>
                    </v-card>
                </div>
            </v-layout>
        </v-container>
    </v-app>

</template>

<script>
    import {mapMutations} from "vuex";
    import SignComponent from "./SignComponent";
    import common_api from "../api/common_api";


    export default {
        name: "Login",
        components:{ SignComponent },
        data:()=>({
            username:'',
            password:'',
            errorMessage:null,
            rolesRoutes: {
                'ROLE_USER': '/main/home',
                'ROLE_ADMIN':'/admin/users'
            },
            electronCard:false,
            signedData:null
        }),

        methods:{
            submit(){
                this.$store.dispatch('loginAction',{username:this.username, password:this.password})
                    .then(()=>{
                        this.routeTo(this.rolesRoutes[this.user.role.name]);
                    }).catch(er=>{
                    this.errorMessage=er.response.data.message;
                })
            },

            routeTo(route){
                this.$router.push(route);

            },

            ...mapMutations([
                'logoutMutation',
                'loginSuccessMutation'
            ]),

            logout(){
                this.logoutMutation();
            },

            login(user){
                this.loginSuccessMutation(user);
            },

            ecpLogin(){
                this.electronCard=true;
            },

            getSignResult(resultFromEvent){
                common_api.loginByEcp(resultFromEvent).then(rs=>{
                    this.login(rs.data)
                    this.routeTo(this.rolesRoutes[this.user.role.name]);
                })
            },
        },


        computed:{
            user:{
                get(){
                    return  this.$store.state.user;
                }
            }
        },
        created() {
            this.logout();

        }
    }
</script>

<style scoped>
    /* background image styles */
    .login-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        background-color: #1976D2;
    }
</style>
