<template>
    <v-container>
        <v-navigation-drawer
                v-model="leftBar"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <v-list-item-group color="green">
                    <template v-for="item in computedItems">
                        <v-list-item
                                :key="item.text"
                                :to='item.path'
                                link
                        >
                            <v-list-item-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-action-text>
                                    {{ item.text }}
                                </v-list-item-action-text>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

    </v-container>
</template>

<script>
    export default {
        name: "AdminLeftSideMenu",

        data: () => ({

            ruItems:[
                {icon: 'mdi-account-multiple', text: 'Пользователи', path: '/admin/users'},
                {icon: 'mdi-delete-variant ', text: 'Корзина', path: '/admin/trash'},
                {icon: 'mdi-chart-areaspline ', text: 'Администрирование очтетов', path: '/admin/menuitems'},
                {icon: 'mdi-google-translate', text: 'Словарь', path: '/admin/dictionary'},
                {icon: 'mdi-chart-bar', text: 'chart1' ,path:'/admin/chart'},
                // {icon: 'mdi-chart-bar', text: 'Shezhire' ,path:'/admin/shezhire'},
            ],

            kazItems:[
                {icon: 'mdi-account-multiple', text: 'Қолданушылар', path: '/admin/users'},
                {icon: 'mdi-delete-variant ', text: 'Корзина', path: '/admin/trash'},
                {icon: 'mdi-chart-areaspline ', text: 'Отчеттарды басқару', path: '/admin/menuitems'},
                {icon: 'mdi-google-translate', text: 'Сөздік', path: '/admin/dictionary'},
                {icon: 'mdi-chart-bar', text: 'chart1' ,path:'/admin/chart'},

            ],



            miniVariant: false,
            expandOnHover: false,

        }),
        computed: {

            computedItems(){
                let resultedItems = [];
                if(this.locale==='kk'){
                    resultedItems =  this.kazItems;
                }
                else {
                    resultedItems = this.ruItems
                }
                return resultedItems;
            },

            locale: {
                get () {
                    return this.$i18n.locale
                },
                set (val) {
                    this.$i18n.locale = val
                }
            },
            leftBar: {
                get() {
                    return this.$store.state.drawer
                },
                set(val) {
                    return this.$store.state.drawer = val
                }
            },

        }

    }
</script>

<style scoped>


</style>
