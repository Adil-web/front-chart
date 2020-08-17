import axios from 'axios'
import authHeader from './data-service';


const GET_EVENTS='/api/event/events';
const ADD_EVENT='/api/event/add_event';
const EDIT_EVENT='/api/event/edit_event';

export default {
    get_eventsApi(){
        return axios.get(GET_EVENTS,{ headers: authHeader() })
    },

    addEventApi(event){
        return axios.post(ADD_EVENT,event,{ headers: authHeader() })
    },

    editEventApi(event){
        return axios.post(EDIT_EVENT,event,{ headers: authHeader() })
    },
}