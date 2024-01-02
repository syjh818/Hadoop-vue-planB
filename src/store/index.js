import {createStore} from 'vuex'
import menu from "./modules/menu"
import view from "@/store/modules/view"
import requestPath from "@/store/modules/requestPath"

export default createStore({
    modules: {
        menu, view, requestPath
    }
})
