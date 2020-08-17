<template>
    <v-app>
        <AdminNavigationBar/>
        <AdminLeftSideMenu/>
        <v-content>
            <v-container>
                    <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>

</template>


<script>
    import AdminNavigationBar from "./AdminNavigationBar";
    import AdminLeftSideMenu from "./AdminLeftSideMenu";

    export default {
        name: "AdminMainLayout",
        components: { AdminNavigationBar, AdminLeftSideMenu}
    }
</script>

<style scoped>

</style>
