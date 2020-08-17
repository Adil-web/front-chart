<template>
    <div class="wf_infowrapper" v-if="weatherData">
        <div class="wf_main_wrap">
            <div class="wf_secondary_wrap">
                <table>
                    <tbody>
                    <tr>
                        <td align="left" width="33%">
                            <div class="wf_city">
                                <span>Атырау</span>
                            </div>
                        </td>
                        <td align="center" width="34%">
                            <div class="wf_icon">
                                <img width="35px" height="24px" :src="getImgUrl()" alt="Атырау" title="Атырау">
                            </div>
                        </td>
                        <td align="right" width="33%">
                            <div class="wf_temp">
                                <nobr><span class="paddingRight">{{Math.round(weatherData.main.temp -273)}}<span class="tsp">&nbsp;</span>℃</span></nobr>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="gsAddInfo2 padding">
            <div class="gsAddInfo">{{weatherMap[weatherData.weather[0].description]}}</div>
            <div class="gsAddInfo3">
                <span id="windAddInfo">{{weatherData.wind.speed}}<i class="tsp">&nbsp;</i>м/с,&nbsp;ЮЮВ</span>
<!--                <span id="windAddInfo">{{weatherData.wind.speed}}<i class="tsp">&nbsp;</i>м/с</span>-->
            </div>
        </div>
    </div>

</template>

<script>
    import weather_api from "../../api/weather_api";
    export default {
        name: "Widget",
        data:() => ({
            weatherData:null,
            weatherMap: {
                "clear sky": 'ясно',
                "few clouds": 'небольшая облачность',
                "scattered clouds": 'рассеянные облака',
                "broken clouds": 'облачность',
                "shower rain": 'небольшой дождь',
                "rain": 'дождь',
                "thunderstorm": 'гроза',
                "snow": 'снег',
                "mist": 'туман'
            },
        }),

        methods:{
            getWeatherData: function () {
                weather_api.getWeather().then(rs => {
                    this.weatherData = rs.data;
                })
            },

            getImgUrl() {
                let images = require.context('../../assets/', false, /\.png$/)
                return images('./' + this.weatherData.weather[0].icon + ".png")

            }
        },

        created() {
            this.getWeatherData();
        },
    }
</script>

<style scoped>
    .wf_infowrapper{
        box-sizing: border-box;
        height: 57px;
        display: block;
        width: 180px;
        margin-right: 25%;
    }

    .wf_main_wrap{
        width: 100%;
        text-align: left;
        height: 30px;
        padding: 0;
    }

    .wf_secondary_wrap{
        background-color: transparent;
        color: rgb(5, 0, 5);
        width: 100%;
        height: 30px;
        position: relative;
    }

    .wf_secondary_wrap table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 0;
        padding: 0;
        table-layout: auto!important;
        color: inherit;
        height: 30px;
        display: table;
    }

    tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;
    }
    .wf_secondary_wrap table tr,  .wf_secondary_wrap table td{
        vertical-align: middle;
        color: inherit;
        padding: 0 !important
    }

    .wf_secondary_wrap table td:first-child{
        text-align: right;
    }

    .wf_city{
        text-align: center;
    }
    .wf_city, .wf_temp{
        font-size: 13px;
        font-weight: 700;
        margin: 0;
    }

    .wf_city span{
        padding-right: 5px;
        display: block;
        color: #fff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
    }

    .wf_secondary_wrap table td:nth-child(2){
        text-align: center;
        display: table-cell;
    }

    .wf_icon{
        margin: 0 !important;
    }
    img {
        vertical-align: middle;
        border-style: none;
    }
    img {
        border: medium none;
    }
    .wf_secondary_wrap table td:last-child {
        text-align: left;
    }
    nobr {
        white-space: nowrap;
    }

    .wf_temp .paddingRight {
        padding-left: 5px;
        color: #fff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
    }

    .tsp {
        padding: 0!important;
        margin: 0!important;
        display: inline!important;
        display: inline-block!important;
        display: -moz-inline-box!important;
        width: .2em!important;
        height: .2em!important;
        overflow: hidden!important;
        text-decoration: inherit;
    }

    .gsAddInfo2.padding {
        padding-top: 3px !important;
    }

    .gsAddInfo2.padding,  .gsAddInfo {
        text-align: center;
        padding: 0 !important;
        color: #fff !important;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
        font-size: 11px !important;
        line-height: 12px !important;
    }

    #windAddInfo {
        white-space: nowrap;
        margin: 0 2px;
    }
    i {
        font-style: italic;
    }

</style>