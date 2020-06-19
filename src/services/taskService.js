import Axios from 'axios';

const CreateTask = props => new Promise((resolve, reject) => {

    let token = localStorage.getItem('auth-token');
    console.log(token)

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    Axios.post('https://gerenciador-de-tarefas-codex.herokuapp.com/api/tasks/create', props, config).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        reject(err);
    });
});

const ListTasks = order => new Promise((resolve, reject) =>{
    let token = localStorage.getItem('auth-token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    Axios.get("https://gerenciador-de-tarefas-codex.herokuapp.com/api/tasks?order="+order, config).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        reject(err);
    });
});

const RenameTask = props => new Promise((resolve, reject) =>{
    let token = localStorage.getItem('auth-token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    Axios.put('https://gerenciador-de-tarefas-codex.herokuapp.com/api/tasks', props, config).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        reject(err);
    });
});

const DeleteTask = id => new Promise((resolve, reject) =>{
    let token = localStorage.getItem('auth-token');

    console.log(id);

    Axios.delete('https://gerenciador-de-tarefas-codex.herokuapp.com/api/tasks', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
          "_id":id
        }
      } ).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        reject(err);
    });
});



export { CreateTask, ListTasks, DeleteTask, RenameTask};