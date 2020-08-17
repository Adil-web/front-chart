<template>
        <iframe
                width="100%"
                height="100%"
                :src="id"
                frameborder="0"
                allowFullScreen="true"
        >

        </iframe>


</template>

<script>
    export default {
        name: "PowerBi",
        props:{
                id:{
                        type: String,
                        default: ''
                }
        },
    }
</script>

<style scoped>

</style>
