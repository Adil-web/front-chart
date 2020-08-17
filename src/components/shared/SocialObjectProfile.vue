<template>
    <v-card width="600px" v-if="socialObject">
        <v-toolbar flat :color="user.role.id===1?'green darken-3 white--text':'blue darken-3 white--text'">
<!--            <v-icon class="pa-2">mdi-account</v-icon>-->
            <div class="font-weight-light ">{{socialObject.o_name}}</div>
            <v-spacer></v-spacer>
            <v-btn dark icon @click="closeCard">
                <v-icon  class="mr-1">mdi-location-exit</v-icon>
            </v-btn>
        </v-toolbar>


        <v-list two-line>

        <v-list-item style="align-items: baseline;">
            <v-list-item-icon>
                <v-icon color="blue darken-3">mdi-cash</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>
                    <span style="padding-right: 5px"> Источники финансирование: </span>
                    <span>{{getSourceById(socialObject.source_type).name}}</span></v-list-item-title>
                <!--                    <v-list-item-subtitle>Широта и долгота</v-list-item-subtitle>-->
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-clock-time-eight-outline </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        <span style="padding-right: 5px"> Период реализации: </span>
                        <span>  {{socialObject.o_year_start}} - {{socialObject.o_year_end}}</span>
                    </v-list-item-title>
                </v-list-item-content>
        </v-list-item>

        <v-list-item>

                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-web</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        <span style="padding-right: 5px"> Широта и долгота: </span>
                        <span>{{socialObject.o_latitude}},{{socialObject.o_longitude}}</span></v-list-item-title>
<!--                    <v-list-item-subtitle>Широта и долгота</v-list-item-subtitle>-->
                </v-list-item-content>
        </v-list-item>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-map-marker-circle</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        <span style="padding-right: 5px"> Район: </span>
                        <span>{{getRegionsById(socialObject.region_type).name}}</span></v-list-item-title>
                    <!--                    <v-list-item-subtitle>Широта и долгота</v-list-item-subtitle>-->
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-map-marker-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        <span style="padding-right: 5px"> Местоположение: </span>
                        <span>{{socialObject.o_rural_settlement}}</span> </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-arrow-right-bold-circle-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        <span style="padding-right: 5px"> Отрасль: </span>
                        <span>{{getCategoryById(socialObject.category_type).name}}</span></v-list-item-title>
                    <!--                    <v-list-item-subtitle>Широта и долгота</v-list-item-subtitle>-->
                </v-list-item-content>
            </v-list-item>



            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="blue darken-3">mdi-currency-kzt</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        <span style="padding-right: 5px"> Общая стоимость: </span>
                        <span>{{socialObject.o_total_project_cost}}</span></v-list-item-title>
                    <!--                    <v-list-item-subtitle>Широта и долгота</v-list-item-subtitle>-->
                </v-list-item-content>
            </v-list-item>


        </v-list>

    </v-card>



</template>

<script>
    import category_api from "../../api/map_api";
    import source_api from "../../api/map_api";
    import region_api from "../../api/map_api";



    export default {
        name: "SocialObjectProfile",
        data:() => ({
            categories:[], sources:[], regions:[]
        }),

        methods:{
            closeCard(){
                this.$emit('close-profile-card')
            },
            getCategoryById(categoryId){
               return this.categories.filter(item=>item.id===categoryId)[0]
            },
            getSourceById(sourceId){
                return this.sources.filter(item=>item.id===sourceId)[0]
            },
            getRegionsById(regionId){
                return this.regions.filter(item=>item.id===regionId)[0]
            }

        },


        props:{
            socialObject: {
                type: Object,
                default: () => null
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
        created() {
            category_api.getCategories().then(rs=>{
                this.categories = rs.data;
                return ''
            }).then(()=>{
                source_api.getSources().then(rs=>{
                    this.sources = rs.data;
                    console.log(rs)
                    return ''
                })
            }).then(()=>{
                region_api.getRegions().then(rs=>{
                    this.regions = rs.data;
                    return ''
                })
            });
        }
    }
</script>

<style scoped>


</style>
