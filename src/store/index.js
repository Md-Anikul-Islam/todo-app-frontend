import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate"
import {auth} from "./modules/auth"
import {task} from "./modules/task"
export default createStore({
    state:{

    },
    mutations:{

    },
    actions:{

    },
    modules:{
        auth,
        task
    },
    plugins: [createPersistedState({
        paths : ['auth']
    })],
})