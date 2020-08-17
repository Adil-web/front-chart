<template>
    <div>
    <v-data-table
            :search="search"
            dense
            :headers="headers"
            :items="menuItems"
            :single-expand="true"
            show-expand
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
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
                                    <v-col>
                                        <v-text-field
                                                v-model="menuItem.title"
                                                label="Legal menu item name*"
                                                hint="please insert legal menu item name"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                                v-model="menuItem.icon"
                                                label="Иконка"
                                                persistent-hint
                                                required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="menuItem.path"
                                                label="path"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                                v-model="menuItem.src"
                                                label="src"
                                        ></v-text-field>
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
        <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
            <span v-if="item.children.length>0">
                <v-icon v-if="isExpanded" small @click="expand(false)" >{{isExpanded ? 'mdi-arrow-expand-up': 'mdi-arrow-expand-down' }}</v-icon>
                <v-icon v-else small @click="expand(true)">{{isExpanded ? 'mdi-arrow-expand-up': 'mdi-arrow-expand-down' }}</v-icon>
            </span>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <v-data-table
                    dense
                    :headers="headers"
                    :items="item.children"
                    class="elevation-1"
            >
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
            </v-data-table>
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
            <v-icon
                    small
                    @click="addChildren(item)"
            >
                mdi-plus
            </v-icon>
        </template>
    </v-data-table>
    </div>
</template>


<script>
    import items_api from "../../api/items_api";


    export default {
        name: 'MenuItems',
        data: () => ({
            search: '',
            menuItems: [],
            menuItem: {},

            dialog: false,
            // headers: [
            //     {text: 'Наименование', align: 'start', sortable: false, value: 'title'},
            //     {text: 'Действия', value: 'actions', sortable: false},
            //     {text: '', value: 'data-table-expand'},
            // ],
        }),


        computed: {
            headers(){
                return [
            //
                    { text: this.$t("username"),align: 'start', value: 'title' },
            //         { text: this.$t("userSurname"), value: 'surname' },
            //         { text: this.$t("userPatronymic"), value: 'patronymic' },
            //         { text: this.$t("userEmail"), value: 'email' },
            //         { text: this.$t("userRole"), value: 'role.name' },
            //         // { text: 'Пароль', value: 'password' },
                    { text: this.$t("adminActions"), value: 'actions', sortable: false },
                ]
            },

            formTitle() {
                return this.menuItem.id === undefined ? 'New Item' : 'Edit Item'
            }
        },


        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.getMenuItemsWithPromise().then(items => {
                this.menuItems = items;
            });
        },

        methods: {
            getMenuItemsWithPromise() {
                return new Promise((resolve, reject) => {
                    items_api.getMenuItems()
                        .then(rs => {
                            resolve(rs.data);
                        }).catch(er => {
                        reject(er);
                    })
                })
            },

            addChildren(item) {
                this.menuItem.parent_id = item.id;
                this.dialog = true;
            },


            editItem(menuItem) {
                this.menuItem = Object.assign({}, menuItem)
                this.dialog = true
            },

            close() {
                this.dialog = false;
                this.menuItem = {};
            },

            save() {
                if (this.menuItem.id === undefined) {
                    items_api.createMenuItemApi(this.menuItem).then(() => {
                        this.getMenuItemsWithPromise().then(items => {
                            this.menuItems = items;
                            this.close();
                        })
                    }).catch(er => alert(er.response.data.message))

                } else {
                    items_api.editMenuItemApi(this.menuItem).then(() => {
                        this.getMenuItemsWithPromise().then(items => {
                            this.menuItems = items;
                            this.close();
                        })
                    }).catch(er => alert(er.response.data.message))
                }

            }
        },

    }
</script>
<style scoped>
</style>
