<template>
    <v-data-table
            dense
            :headers="headers"
            :items="users"
            sort-by="calories"
            class="elevation-1"
            :search="search"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
<!--                <v-toolbar-title></v-toolbar-title>-->

                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        :label="$t('search')"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">{{$t('create')}}</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="user.username"
                                                label="Legal username*"
                                                hint="please insert legal username"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="user.email" label="Email*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="user.name"
                                                label="Legal name*"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="user.surname"
                                                label="Legal surname*"
                                                required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="user.patronymic"
                                                label="Legal patronymic*"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="user.iin"
                                                label="Legal iin*"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="user.password" label="Password*" type="password" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                                v-model="user.role_id"
                                                hint="Роль"
                                                :items="roles"
                                                item-text="text"
                                                item-value="id"
                                                label="Выбор роли"
                                                persistent-hint
                                                single-line
                                                required
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
<!--            <v-btn color="primary" @click="initialize">Reset</v-btn>-->
        </template>
    </v-data-table>
</template>

<script>
    import Vue from 'vue'
    import user_api from "../../api/user_api";
    export default {
        data: () => ({
            search:'',
            users:[],
            roles:[ {id: 1,name: 'ROLE_ADMIN',text:'Администратор'}, {id: 2,name: 'ROLE_USER',text:'Пользователь'}],
            user:{},
            dialog: false
        }),

        computed: {

            headers(){
              return   [
                  { text: this.$t("userLogin") , align: 'start', sortable: false, value: 'username'},
                  { text: this.$t("username"), value: 'name' },
                  { text: this.$t("userSurname"), value: 'surname' },
                  { text: this.$t("userPatronymic"), value: 'patronymic' },
                  { text: this.$t("userEmail"), value: 'email' },
                  { text: this.$t("userRole"), value: 'role.name' },
                  // { text: 'Пароль', value: 'password' },
                  { text: this.$t("adminActions"), value: 'actions', sortable: false },
              ]
            },

            formTitle () {
                return this.user.id === undefined ? 'New Item' : 'Edit Item'
            },
            sessionUser:{
                get(){
                    return this.$store.state.user;
                },
                set (val) {
                    return this.$store.state.user = val
                }
            },
        },



        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.getUsers();
        },

        methods: {
            getUsers(){
              user_api.getUsersApi(false).then(response=>{ this.users=response.data });
            },


            editItem (userItem) {
                this.user = Object.assign({}, userItem)
                this.dialog = true
            },

            deleteItem (userItem) {
                if(this.sessionUser.id===userItem.id){
                    alert("Невозможно удалить свою же учетную запись"); return ''
                }
                else if  (confirm('Вы уверены что хотите удалить пользователя?')){
                    user_api.deleteUserApi(userItem.id, true, userItem.role_id)
                        .then(()=>{
                            const index = this.users.indexOf(userItem);
                            this.users.splice(index,1)
                        }).catch(er=>{
                        alert(er.response.data.message)
                    })
                } else {
                    console.log("Не удалось удалить пользователя")
                }
            },

            close () {
                this.dialog = false;
                this.user={};
            },

            save () {
                if (this.user.id === undefined) {
                    user_api.createUserApi(this.user).then((response)=>{
                        this.users.push(response.data);
                        this.close();
                        }).catch(er=>alert(er.response.data.message))

                } else {
                    user_api.editUserApi(this.user).then((response)=>{
                        Vue.set(this.users, this.users.findIndex(item=>item.id === response.data.id), response.data );
                        this.close();
                    });
                }

            },
        },
    }
</script>
