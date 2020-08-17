<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn color="primary" dark @click.stop="dialog=true">
                        New Event
                    </v-btn>
                    <v-btn outlined class="mx-4" @click="setToday">
                        Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    outlined
                                    color="grey darken-2"
                                    v-on="on"
                            >
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Day</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Month</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'year'">
                                <v-list-item-title>Year</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>

            <v-dialog v-model="dialog" width="1000">
                <v-card height="400">
                    <v-container>
                        <v-row align="stretch">
                            <v-col>
                                <v-form
                                        @submit.prevent="saveEvent"
                                        ref="form"
                                        v-model="valid"
                                        :lazy-validation="lazy"
                                >
                                    <v-text-field
                                            v-model="event.name"
                                            :rules="rules"
                                            label="Name"
                                            required
                                            :readonly="event.id!==undefined"
                                    ></v-text-field>

                                    <v-text-field
                                            v-model="event.description"
                                            label="Описание"
                                            :rules="rules"
                                            required
                                    ></v-text-field>

                                    <v-menu
                                            ref="menu1"
                                            v-model="menu1"
                                            :close-on-content-click="false"
                                            :return-value.sync="event.end"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    v-model="event.end"
                                                    label="Date"
                                                    hint="MM/DD/YYYY format"
                                                    persistent-hint
                                                    prepend-icon="mdi-calendar-import"
                                                    readonly
                                                    required
                                                    :rules="rules"
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="event.end" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu1.save(event.end)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>

                                    <v-checkbox
                                            v-model="event.completed"
                                            label="Выполнено?"
                                    ></v-checkbox>

                                    <span v-if="event.id">
                                        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit" @click.stop="dialog = false">
                                            изменить
                                        </v-btn>
                                        <v-btn color="error" class="mr-4"  @click.stop="deleteEvent">
                                            удалить
                                        </v-btn>
                                    </span>

                                    <v-btn v-else :disabled="!valid" color="success" class="mr-4" type="submit" @click.stop="dialog = false">
                                        добавить
                                    </v-btn>

                                    <v-btn v-if="!event.id"
                                           color="error"
                                           class="mr-4"
                                           @click="reset"
                                    >
                                        Сбросить форму
                                    </v-btn>

                                    <v-btn
                                            color="warning"
                                            @click.stop="closeEventDialog"
                                    >
                                        Закрыть
                                    </v-btn>

                                </v-form>

                            </v-col>
                            <v-col>
                                <v-file-input
                                        v-model="files"
                                        placeholder="Upload your documents"
                                        label="File input"
                                        multiple
                                        prepend-icon="mdi-paperclip"
                                        @change="filesChange"
                                >
                                    <template v-slot:selection="{ text }">
                                        <v-chip
                                                small
                                                label
                                                color="primary"
                                        >
                                            {{ text }}
                                        </v-chip>
                                    </template>
                                </v-file-input>

                                <v-list v-if="!isEmpty" :dense="true" :rounded="true">
                                    <v-subheader>Отчеты</v-subheader>
                                    <div>РВрыфврфырвфы</div>
                                    <v-list-item-group color="primary">
                                        <v-list-item v-for="(item, i) in eventFiles" :key="i">
                                            <v-list-item-action>
                                                <v-icon>mdi-file-document-outline</v-icon>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="item.original_name.substr(0,50)" @click.stop="downloadFile(item)"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>

            <v-sheet height="600">
                <div v-if="type==='year'" class="d1">
                    <div class="d2">
                        <month-calendar  v-on:day="nr"
                                         v-for="m in 12" :key="m"
                                         :month="m"
                                         :year="year"
                        ></month-calendar>
                    </div>
                </div>
                <v-calendar v-else
                            ref="calendar"
                            v-model="focus"
                            color="primary"
                            :events="fvents"
                            :event-color="getEventColor"
                            :type="type"
                            @click:event="showEvent"
                            @click:more="viewDay"
                            @click:date="viewDay"
                            @change="updateRange"
                            locale="ru"
                ></v-calendar>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
    import dayjs from 'dayjs'
    import MonthCalendar from "./MonthCalendar";
    import Vue from 'vue'
    import event_api from "@/api/event_api";
    import file_api from "@/api/file_api";

    export default {
        components:{ MonthCalendar },
        data: () => ({
            start: null,
            end: null,
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                day: 'Day',
                year:'Year'
            },



            redColor: '#F44336',
            greenColor: '#4CAF50',
            event: {},
            events: [],


            dialog: false,
            valid: true,
            lazy:false,
            rules: [ v => !!v || 'Field is required'],
            menu1: false,


            files:[],
            eventFiles:[],
            year: dayjs().year()

        }),
        computed: {
            title () {
                const { start, end } = this;
                if (!start || !end) {
                    return ''
                }

                const startMonth = this.monthFormatter(start)
                const startYear = start.year;
                const startDay = start.day + this.nth(start.day)

                switch (this.type) {
                    case 'month':
                        return `${startMonth} ${startYear}`
                    case 'day':
                        return `${startMonth} ${startDay} ${startYear}`
                    case 'year':
                        return `${this.year}`
                }
                return ''
            },
            monthFormatter () {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },


            isEmpty(){
                return this.eventFiles.length === 0
            },
            fvents(){
                return this.events.filter(item=> item.deleted===false)
            }
        },
        created () {
            this.getEvents();
        },
        mounted () {
            this.$refs.calendar.checkChange();
        },




        methods: {
            nr(event){
                console.log(event.day)
                this.type = 'month';
                this.setFocus( event.year + '-' + event.month + '-' + event.day.day);
            },


            closeEventDialog(){
                this.dialog = false;
                this.eventDataReset();
            },

            eventDataReset(){
                this.event = {};
                this.files = [];
                this.eventFiles = [];
            },
            deleteEvent(){
                this.dialog = false;
                this.event.deleted = true;
                this.saveEvent();
            },

            saveEvent () {
                if(this.event.id){
                    event_api.editEventApi(this.event)
                        .then( rs =>{
                            Vue.set(this.events, this.events.findIndex(item=>item.id === rs.data.id), rs.data );
                            if(this.files.length > 0){
                                this.upload(rs.data.id).then(() => this.afterAddEditDeal(rs.data));
                            }
                            else{
                                this.afterAddEditDeal(rs.data);
                            }
                        });
                }
                else{
                    event_api.addEventApi(this.event)
                        .then(rs => {
                            this.events.push(rs.data);
                            if(this.files.length > 0){
                                this.upload(rs.data.id).then(() => this.afterAddEditDeal(rs.data));
                            }
                            else{
                                this.afterAddEditDeal(rs.data);
                            }
                        });
                }
            },

            afterAddEditDeal(ev){
                this.type='month'
                this.setFocus(ev.end);
                this.closeEventDialog();
            },

            reset () {
                this.$refs.form.reset()
            },

            getEvents () {
                event_api.get_eventsApi().then((res)=>{
                    this.events = res.data;
                    console.log(this.events)
                });
            },


            viewDay ({ date }) {
                this.setFocus(date);
                this.type = 'day'
            },
            getEventColor (event) {
                return event.completed? event.color = this.greenColor:event.color = this.redColor
            },
            setToday () {
                this.type ==='year'?
                    this.year = new Date().toISOString().substr(0,4):
                    this.focus = new Date().toISOString().substr(0,10)
            },
            setFocus(date){
                this.focus = date;
            },
            prev () {
                if(this.type ==='year'){
                    this.year = this.year - 1;
                }
                else {
                    this.$refs.calendar.prev();
                }
            },
            next () {
                if(this.type ==='year'){
                    this.year = this.year + 1;
                }
                else {
                    this.$refs.calendar.next()
                }

            },

            showEvent ({ event }) {
                file_api.getFiles(event.id).then(rs=>{
                    this.eventFiles=rs.data;
                    this.event = Object.assign({}, event)
                    this.dialog=true;
                })

            },

            updateRange ({ start, end }) {
                this.start = start;
                this.end = end;
            },

            nth (d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            },

            upload(eventId){
                return new Promise((resolve) => {
                    let formData = new FormData();
                    formData.append('eventId', eventId)
                    this.files.forEach(item => formData.append('file', item));
                    file_api.uploadFiles(formData).then(() => resolve());
                })
            },
            downloadFile(file){
                file_api.downloadFile(file);

            },

            filesChange(){
                if(this.files.length + this.eventFiles.length > 4){
                    this.files = [];
                    alert("Нельзя добавлять больше 4 файлов")
                }
            },

        },
    }

</script>
<style scoped>
    .d1{
        /*position: absolute;*/
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .d2{

        padding-right: 0px;
        padding-top: 8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;

    }
</style>
