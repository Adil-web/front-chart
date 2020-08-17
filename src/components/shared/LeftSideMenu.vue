<template>
    <v-container>
        <v-navigation-drawer
                v-model="leftBar"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <v-list-item-group color="primary">
                    <div v-for="item in items" v-bind:key="item.title">
                        <template  v-if="item.children.length === 0">

                                <v-list-item
                                         @click="routing(item)"
                                        link
                                >
                                    <v-list-item-action>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
<!--                                        <v-list-item-action-text v-if="locale">-->
<!--                                            {{ item.title}}-->
<!--                                        </v-list-item-action-text>-->
                                        <v-list-item-action-text>
                                            {{ item.title}}
                                        </v-list-item-action-text>
                                    </v-list-item-content>
                                </v-list-item>


                        </template>
                        <v-list-group v-else  :prepend-icon="item.icon">
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-action-text>
                                        {{ item.title }}
                                    </v-list-item-action-text>
                                </v-list-item-content>
                            </template>
                                <v-list-item
                                        @click="routing(child)"
                                        v-for="(child, i) in item.children"
                                        :key="i"
                                        link
                                >

                                    <v-list-item-action>
                                        <v-icon>{{ child.icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-action-text>
                                            {{ child.title }}
                                        </v-list-item-action-text>
                                    </v-list-item-content>
                                </v-list-item>
                        </v-list-group>
                    </div>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

    </v-container>
</template>

<script>
    import items_api from "../../api/items_api";
    export default {
        name: "LeftSideMenu",

        data: () =>({

            miniVariant: false,
            expandOnHover: false,
            items:[]
        }),
        methods:{
          routing(item){
                  this.$router.push({ name: item.path, params: { id: item.src } });
          },
        },
        computed:{
            leftBar : {
                get() {
                    return this.$store.state.drawer
                },
                set (val) {
                    return this.$store.state.drawer = val
                }
            },
            locale: {
                get () {
                    return this.$i18n.locale
                },
                set (val) {
                    this.$i18n.locale = val
                }
            }

        },

        created() {
            items_api.getMenuItems().then(rs=>{
                this.items = rs.data;
            })
        }

    }
</script>

<style scoped>

</style>
