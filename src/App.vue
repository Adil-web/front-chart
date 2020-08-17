<template>
    <router-view></router-view>
</template>

<script>
import user_api from "./api/user_api";

export default {
  name: 'App',

  components:{

  },

    mounted(){
      user_api.get_session_user().then(response=>{
          this.user = response.data;
      })
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
  data: () => ({
    //
  }),
};
</script>
