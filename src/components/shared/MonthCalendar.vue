<template>
    <div class="jan1">
        <div class="anotherJan2 jan2">
            <div class="monthHeader">
                <span class="monthHeaderText">{{monthTitle}}</span>
            </div>
            <div class="monthContent" role="grid">
                <div class="monthContentDaysOfWeek" role="row">
                    <span v-for="(day, index) in 7" :key="`title${day}`" class="oneDayInWeek" role="columnheader">
                        <span>{{showDayTitle(index)}}</span>
                    </span>
                </div>
                <div class="monthDays" role="rowgroup">
                    <div v-for="(value, name) in daysByWeeks" :key="name" class="daysRowInMonth" role="row" >
                        <span v-for="(day, index) in value" :key="index" class="oneDayInMonth" role="gridcell">
                            <div @click.stop="toggleDay(day)" class="oneDayInMonthContent" v-bind:class="{ 'otherDay': day.isOtherMonth}">
                                {{day.day}}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        name: "MonthCalendar",
        props:{
            month: {
                type: [String, Number]
            },
            year: {
                type: [String, Number]
            }

        },
        data:() => ({
            weekRows: 6,
            daysInWeek: 7,
            showDays:[],
            daysByWeeks:{
                1:{ start: 0,  end: 7 },
                2:{ start: 7,  end: 14 },
                3:{ start: 14, end: 21 },
                4:{ start: 21, end: 28 },
                5:{ start: 28, end: 35 },
                6:{ start: 35, end: 42 },
            },
            dayMapping : {
                kk: ['Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб', 'Жк'],
                ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
            }

        }),



        methods:{

            toggleDay(day){
                this.$emit('day', { day: day, month: this.month , year: this.year })
            },
            showDayTitle (day) {
                return this.dayMapping.ru[day]
            },

            resetDaysByWeeks() {
                return {
                    1:{ start: 0,  end: 7 },
                    2:{ start: 7,  end: 14 },
                    3:{ start: 14, end: 21 },
                    4:{ start: 21, end: 28 },
                    5:{ start: 28, end: 35 },
                    6:{ start: 35, end: 42 },
                }
            },

            initCalendar () {
                const activeMonth = dayjs()
                    .set('date', 1)
                    .set('year', this.year)
                    .set('month', this.month - 1);
                const prevMonth = activeMonth.set('month', activeMonth.get('month') -1 );
                let firstDay = activeMonth.startOf('month').day() - 1;
                if ( firstDay < 0 ) firstDay += 7;
                const lastDate = activeMonth.endOf('month').date();
                let prevMonthLastDate = prevMonth.endOf('month').date() - firstDay;



                let arr = Array.from(Array( this.weekRows * this.daysInWeek ).keys());
                let day = 0;
                arr = arr.map(item=>{
                    let mapItem = '';
                    if(firstDay <= item){
                        mapItem = day++ % lastDate + 1;
                    }
                    else {
                        mapItem = ++prevMonthLastDate
                    }
                    return { day: mapItem , isOtherMonth: firstDay > item || day > lastDate }
                });

                Object.keys(this.daysByWeeks).forEach( item=>{
                    this.daysByWeeks[item] = arr.slice( this.daysByWeeks[item].start, this.daysByWeeks[item].end );
                });


            },
        },

        computed:{
            monthTitle () {
                const monthMapping = {
                    kk: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
                    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
                };
                return monthMapping.ru[this.month - 1]
            },
        },

        watch: {
            year (val) {
                console.log(val)
                this.daysByWeeks = this.resetDaysByWeeks();
                this.initCalendar()
            }
        },

        created() {
            this.initCalendar();
        }

    }
</script>

<style scoped>
    @media (max-width:1500px) {
        .jan1 {
            min-width: 224px
        }

        .jan2 {
            width: 208px
        }
    }

    .jan1{
        flex-basis: 25%;
        min-width: 250px;
        min-height: 252px;
    }
    .jan2{
        width: 256px;
    }
    .anotherJan2 {
        padding:0 14px 16px 19px;
        -moz-user-select:none;
        position:relative
    }
    .monthHeader {
        height: 32px;
        font-size: 12px;
        font-weight: 400;
        color: #3c4043;
        display: flex;
        align-items: center;
        margin-left: 4px;
        margin-right: 3px;
    }
    .monthHeaderText {
        flex-grow: 1;
        padding-left: 5px;
        font-family: 'Google Sans',Roboto,Arial,sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: .25px;
        line-height: 20px;
        color: #70757a;
    }

    .monthContent {
        display: table;
        table-layout: fixed;
        width: 100%;
        text-align: center;
    }

    .monthContentDaysOfWeek {
        display: table-row;
        height: 24px;
    }

    .oneDayInWeek{
        font-size: 12px;
        font-weight: 400;
        outline: none;
        display: table-cell;
        vertical-align: middle;
        color: #70757a;
    }
    .monthDays{
        display: table-row-group;
    }

    .oneDayInMonth {
        display: table-cell;
        font-size: 10px;
        font-weight: 500;
        vertical-align: middle;
        /*color: #70757a;*/
        color:#3c4043;
        cursor: pointer;
        outline: none;
        position: relative;

    }

    .oneDayInMonth::before {
        position: absolute;
        height: 24px;
        left: -50%;
        right: 50%;
        z-index: -1;
        content: "";
        background-color: white;
        transition: background-color 100ms linear;
    }

    .oneDayInMonthContent {
        width: 24px;
        height: 24px;
        line-height: 24px;
        margin: auto;
        -moz-border-radius: 50%;
        border-radius: 50%;
        position: relative;
        background-color: white;
        transition: background-color 100ms linear;
        font-size: 12px;
        font-weight: 400;
    }


    .oneDayInMonthContent:hover {
        background-color:#aecbfa
    }


    .daysRowInMonth {
        display: table-row;
        height: 24px;
    }

    [role="columnheader"],
    [role="rowheader"],
    [role="gridcell"] {
        outline:none
    }



    .otherDay{
        color: #70757a;
    }
</style>