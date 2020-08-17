import axios from 'axios';
import authHeader from "./data-service";
const GET_DICTIONARY = '/api/dictionary/words';
const CHANGE_DICTIONARY = '/api/dictionary/update_dictionary';
export default {


    getWordsApi(){
        return axios.get(GET_DICTIONARY)
    },

    changeDictionary(words){
        return axios.post(CHANGE_DICTIONARY,words,{ headers: authHeader() })
    }

}