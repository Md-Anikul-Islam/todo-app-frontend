import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
export const auth = {
    state:{
        auth_status:false,
        auth_token:null,
        auth_info:{
            name:null,
            email:null,
            phone:null,
            image:null,
        }
    },
    getters:{
        GET_AUTH_STATUS(state){
            return state.auth_status;
        },
        GET_AUTH_TOKEN(state){
            return state.auth_token;
        },
        GET_AUTH_INFO(state){
            return state.auth_info;
        }
    },

    actions:{
        REGISTRATION(context,resData){
            return new Promise((resolve, reject)=>{
                axios.post('/registration',resData)
                    .then((res) => {
                        context.commit('SET_AUTH_TOKEN',res.data.token)
                        context.commit('SET_AUTH_INFO',res.data.user)
                        resolve(res)
                    }).catch((err) => {
                    reject(err)
                });
            })
        },

        LOGIN(context,loginData){
            return new Promise((resolve, reject)=>{
                axios.post('/login',loginData)
                    .then((res) => {
                        context.commit('SET_AUTH_TOKEN',res.data.token)
                        context.commit('SET_AUTH_INFO',res.data.user)
                        resolve(res)
                    }).catch((err) => {
                    reject(err)
                });
            })
        },

        LOGOUT(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.auth_token;
            return new Promise((resolve, reject)=>{
                axios.post('/logout')
                    .then((res) => {
                        context.commit('SET_AUTH_LOGOUT')
                        resolve(res)
                    }).catch((err) => {
                    reject(err)
                });
            })
        },

        INIT_AUTH(context) {
            const token = localStorage.getItem('auth_token');
            if (token) {
                context.commit('SET_AUTH_TOKEN', token);
                // You might want to fetch user info here if not persisted
            }
        }
    },

    mutations: {
        SET_AUTH_TOKEN(state, token) {
            state.auth_token = token;
            state.auth_status = true;
            // Set axios default headers for all subsequent requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Optionally store token in localStorage for persistence
            localStorage.setItem('auth_token', token);
        },
        SET_AUTH_INFO(state, info) {
            state.auth_info = {
                name: info.name,
                email: info.email,
                phone: info.phone,
                image: info.image || null
            };
            // Optionally store user info in localStorage
            localStorage.setItem('auth_info', JSON.stringify(state.auth_info));
        },
        SET_AUTH_LOGOUT(state) {
            state.auth_token = null;
            state.auth_status = false;
            state.auth_info = {
                name: null,
                email: null,
                phone: null,
                image: null
            };
            // Remove axios default headers
            delete axios.defaults.headers.common['Authorization'];
            // Clear localStorage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_info');
        }
    }

}