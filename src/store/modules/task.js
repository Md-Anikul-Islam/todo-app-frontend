import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
export const task = {
    state: {
        tasks: [],
        loading: false,
        error: null
    },
    getters: {
        GET_TASKS(state) {
            return state.tasks;
        },
        GET_LOADING(state) {
            return state.loading;
        },
        GET_ERROR(state) {
            return state.error;
        }
    },
    actions: {
        async FETCH_TASKS({ commit, rootState }) {
            commit('SET_LOADING', true);
            try {
                const response = await axios.get('/tasks', {
                    headers: {
                        'Authorization': `Bearer ${rootState.auth.auth_token}`
                    }
                });
                commit('SET_TASKS', response.data);
                commit('SET_ERROR', null);
            } catch (error) {
                commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch tasks');
                // If token is invalid, force logout
                if (error.response.status === 401) {
                    this.dispatch('LOGOUT');
                }
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async CREATE_TASK({ commit, rootState }, taskData) {
            commit('SET_LOADING', true);
            try {
                const response = await axios.post('/task-store', taskData, {
                    headers: {
                        'Authorization': `Bearer ${rootState.auth.auth_token}`
                    }
                });
                commit('ADD_TASK', response.data);
                commit('SET_ERROR', null);
                return response.data;
            } catch (error) {
                commit('SET_ERROR', error.response?.data?.message || 'Failed to create task');
                throw error;
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async UPDATE_TASK({ commit, rootState }, { id, taskData }) {
            commit('SET_LOADING', true);
            try {
                const response = await axios.post(`/task-update/${id}`, taskData, {
                    headers: {
                        'Authorization': `Bearer ${rootState.auth.auth_token}`
                    }
                });
                commit('UPDATE_TASK', { id, task: response.data });
                commit('SET_ERROR', null);
                return response.data;
            } catch (error) {
                commit('SET_ERROR', error.response?.data?.message || 'Failed to update task');
                throw error;
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async DELETE_TASK({ commit, rootState }, id) {
            commit('SET_LOADING', true);
            try {
                await axios.delete(`/task-delete/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${rootState.auth.auth_token}`
                    }
                });
                commit('REMOVE_TASK', id);
                commit('SET_ERROR', null);
            } catch (error) {
                commit('SET_ERROR', error.response?.data?.message || 'Failed to delete task');
            } finally {
                commit('SET_LOADING', false);
            }
        }

    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        UPDATE_TASK(state, { id, task }) {
            const index = state.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                state.tasks.splice(index, 1, task);
            }
        },
        REMOVE_TASK(state, id) {
            state.tasks = state.tasks.filter(task => task.id !== id);
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_ERROR(state, error) {
            state.error = error;
        }
    }
};