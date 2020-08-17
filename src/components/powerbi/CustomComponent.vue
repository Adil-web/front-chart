<template>
    <div style="display: flex; height:100%; width:100%; ">

        <div style="height: 100%; width: 80%;">
            <l-map
                    :zoom="zoom"
                    :center="center"
                    :options="mapOptions"
                    style="height: 100%; z-index: 0;"
            >
                <l-tile-layer
                        :url="url"
                        :attribution="attribution"
                />
                <l-marker v-for="item in filteredObjects"  :key="item.id" :lat-lng="latLngWrapper(item.o_latitude, item.o_longitude)">
                    <l-popup>
                        <div @click="openCloseProfile(item)">
                            <div>
                            <p>{{item.name}}</p>
                            <button style="border:0.5px solid black; padding: 5px;">Паспорт объекта</button>
                            </div>
                        </div>
                    </l-popup>
                </l-marker>
            </l-map>
            <v-dialog style="z-index:9999;" v-if="socialObject" v-model="socialObject" persistent width="600px">
                <social-object-profile
                        :socialObject="socialObject"
                        v-on:close-profile-card="openCloseProfile"
                ></social-object-profile>
            </v-dialog>
        </div>
        <div style="width: 20%;">
            <v-container fluid>
                <p><span style="font-weight: bold; padding-right: 10px">Количество объектов:</span>  {{ filteredObjects.length}}</p>
<!--                <p>{{ selectedRange }}</p>-->
<!--                <p>{{ selectedCategory }}</p>-->


<!--                <div v-for="(item,i) in dateRanges" :key="i">-->
<!--                    <v-badge style="bottom: calc(100% - 0px);"-->
<!--                             color="green"-->
<!--                             :content="getRangesCount(item.start+'-'+item.end)"-->
<!--                    >-->
<!--                <v-checkbox-->

<!--                            :multiple="false"-->
<!--                            :value="item"-->
<!--                            v-model="selectedRange"-->
<!--                            :label="item.start+' - '+item.end"-->
<!--                            class="ma-0 pa-0"-->
<!--                            dense-->
<!--                ></v-checkbox>-->
<!--                    </v-badge>-->
<!--                </div>-->

                <h3 class = "mb-5">Отрасль</h3>

                <div v-for="(item,i) in categoryTypes" :key="i">
                <v-badge style="bottom: calc(100% - 0px);"
                        color="green"
                        :content="getCategoriesCount(item.id)"
                >
                    <v-checkbox
                            :multiple="false"
                            :value="item.id"
                            v-model="selectedCategory"
                            :label="item.name"
                            class="ma-0 pa-0"
                            dense
                    ></v-checkbox>
                </v-badge>
                </div>


                <h3 class = "mb-5">Источники финансирование </h3>

                <div v-for="(item,i) in sourceTypes" :key="i">
                    <v-badge style="bottom: calc(100% - 0px);"
                             color="green"
                             :content="getSourcesCount(item.id)"
                    >
                <v-checkbox
                        :multiple="false"
                        :value="item.id"
                        v-model="selectedSource"
                        :label="item.name"
                        class="ma-0 pa-0"
                        dense
                ></v-checkbox>
                </v-badge>
                </div>


                <h3 class = "mb-5">Район</h3>

                <div v-for="(item,i) in regionTypes" :key="i">
                <v-badge style="bottom: calc(100% - 0px);"
                             color="green"
                             :content="getRegionCount(item.id)"
                    >
                <v-checkbox
                        :multiple="false"
                        :value="item.id"
                        v-model="selectedRegion"
                        :label="item.name"
                        class="ma-0 pa-0"
                        dense
                ></v-checkbox>
                </v-badge>
                </div>

            </v-container>
        </div>
    </div>
</template>

<script>
    import SocialObjectProfile from "@/components/shared/SocialObjectProfile";
    import social_object_api from "../../api/social_object_api";
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

    export default {
        name: "CustomComponent",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            SocialObjectProfile
        },
        data:() => ({
            zoom: 7,
            center: latLng(45.174720, 51.58444),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            mapOptions: {
                zoomSnap: .5
            },
            socialObjects:[],
            socialObject: null,
            groupedCategories:null,
            // groupedRanges:null,
            groupedSources:null,
            groupedRegions:null,



            //Фильтрация
            selectedRange:null,
            selectedSource:null,
            selectedRegion:null,
            // dateRanges:[
            //     { start:2018, end:2020 },
            //     { start:2018, end:2021 },
            //     { start:2019, end:2019 },
            //     { start:2019, end:2020 },
            //     { start:2019, end:2021 }
            // ],

            selectedCategory: null,
            categoryTypes:[
                { name: 'Здравоохранение' , id:1 },
                { name: 'Культура', id: 2 },
                { name: 'Спорт', id:3 },
                { name: 'Дороги', id:4 },
                { name: 'Жилье и ИКИ', id:5 },
                { name: 'Энергетика и ЖКХ', id:6 },
                { name: 'Водоснабжение', id:7 },
                { name: 'Благоустройство', id:8 },
                { name: 'ЧС и Правоохранительные органы', id:9 },
                { name: 'Окружающая среда', id:10 },
                { name: 'Коммунальные объекты', id:11 },
                { name: 'Образование', id:12 },
                { name: 'Прочие', id:13 }

            ],
            sourceTypes:[
                { name: 'Республиканский', id:1 },
                { name: 'Местный', id: 2 },
                { name: 'Другое', id: 3 }
            ],
            regionTypes:[
                { name: 'Курмангазинский', id:1 },
                { name: 'Кызылкогинский' , id:2 },
                { name: 'Исатайский', id:3 },
                { name: 'Индерский', id:4 },
                { name: 'Махамбетский', id:5 },
                { name: 'Макатскй', id:6 },
                { name: 'Жылыойский', id:7 },
                { name: 'г.Атырау', id:8 },





            ],

        }),

        methods: {


            getCategoriesCount(id){
                if(this.groupedCategories[id]){
                    return this.groupedCategories[id].length
                }
                else{
                    return '0';
                }
            },


            getSourcesCount(sourceId){
                if(this.groupedSources[sourceId]){
                    return this.groupedSources[sourceId].length
                }
                else{
                    return '0';
                }
            },
            getRegionCount(regionId){
                if(this.groupedRegions[regionId]){
                    return this.groupedRegions[regionId].length
                }
                else{
                    return '0';
                }


            },


            // getRangesCount(startEnd){
            //     if(this.groupedRanges[startEnd]){
            //         return this.groupedRanges[startEnd].length
            //     }
            //     else{
            //         return '0';
            //     }
            // },

            groupBy( arr, key, groupedData){
                this[groupedData] = arr.reduce(function (rv,x) {
                    (rv[x[key]]=rv[x[key]] || [] ).push(x);
                    return rv;
                },{});
            },

            openCloseProfile(socialObj) {
                if(socialObj===undefined){
                    this.socialObject = null;
                }
                else{
                    this.socialObject = socialObj;
                }
            },
            //Обертка для работы в разметке с методом latLng
            latLngWrapper(latitude,longitude){
                return latLng(latitude, longitude)
            },

        },
        created() {
            social_object_api.getSocialObjects().then(rs=>{
                rs.data.forEach(item => {
                    item.startEnd = item.o_year_start+ '-' + item.o_year_end;
                });
                this.socialObjects= rs.data;
            });
        },




        computed:{

            filteredObjects(){
                let indicator = false;
                let resultArray = this.socialObjects;
                // if(this.selectedRange){
                //     let { start, end } = this.selectedRange;
                //     resultArray = resultArray.filter(item => item.o_year_start == start && item.o_year_end == end);
                // }
                if(this.selectedCategory){
                    indicator = true;
                    resultArray = resultArray
                        .filter(item => item.category_type === this.selectedCategory);
                }

                if(this.selectedSource){
                    indicator = true;
                    resultArray = resultArray
                        .filter(item => item.source_type === this.selectedSource);
                }
                if(this.selectedRegion){
                    indicator = true;
                    resultArray = resultArray
                        .filter(item => item.region_type === this.selectedRegion);
                }

                // if(indicator){
                    this.groupBy( resultArray, 'category_type', 'groupedCategories');
                    // this.groupBy( resultArray, 'startEnd', 'groupedRanges');
                    this.groupBy( resultArray, 'source_type', 'groupedSources');
                    this.groupBy( resultArray, 'region_type', 'groupedRegions');
                // }
                // else{
                //
                // }



                return resultArray;

            }
        },
    };
</script>

<style scoped>

</style>
