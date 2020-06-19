import axios from 'axios'

const api = axios.create( { baseURL: 'https://gerenciador-de-tarefas-codex.herokuapp.com/api'})

export default api;