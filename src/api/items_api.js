

import axios from "axios";
import authHeader from "./data-service";

const GET_ITEMS='/api/menu_item/menu_items';
const EDIT_MENU_ITEM='/api/menu_item/edit_menu_item';
const CREATE_MENU_ITEM='/api/menu_item/add_menu_item';




export default {
    getMenuItems() {
        return axios.get(GET_ITEMS,{ headers: authHeader() })
    },

    editMenuItemApi(menuItem){
        return axios.post(EDIT_MENU_ITEM, menuItem,{ headers: authHeader() })
    },

    createMenuItemApi(menuItem){
        return axios.post(CREATE_MENU_ITEM, menuItem,{ headers: authHeader() })
    },
}
