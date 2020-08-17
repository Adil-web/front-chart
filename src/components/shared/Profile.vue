<template>
    <v-card width="500">
        <v-toolbar flat :color="user.role.id===1?'green darken-3 white--text':'blue darken-3 white--text'">
            <v-icon class="pa-2">mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light ">Карточка пользователя</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark icon @click="closeCard">
                <v-icon  class="mr-1">mdi-location-exit</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list two-line>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="green darken-3"> </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{user.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('username') }}</v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>


            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3"> </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{user.surname}}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('userSurname') }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-action></v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>{{user.patronymic}}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('userPatronymic') }}</v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-email</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>aliconnors@example.com</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('userEmail') }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-email-sync</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>ali_connors@example.com</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('userEmail') }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>


        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "Profile",
        methods:{
            closeCard(){
                this.$emit('close-user-card')
            },

        },

        computed:{
            user:{
                get(){
                    return this.$store.state.user;
                },
                set (val) {
                    return this.$store.state.user = val
                }
            },
        },
    }
</script>

<style scoped>

</style>
