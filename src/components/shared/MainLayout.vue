<template>
    <v-app>
        <NavigationBar/>
        <LeftSideMenu/>
    <v-content class="pt-md-6">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" class="fill-height">
                <router-view></router-view>
            </v-row>
        </v-container>
    </v-content>
    </v-app>

</template>

<script>
    import NavigationBar from "./NavigationBar";
    import LeftSideMenu from "./LeftSideMenu";

    export default {
        name: "MainLayout",
        components: { NavigationBar, LeftSideMenu}
    }
</script>

<style scoped>

</style>
