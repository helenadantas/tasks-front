import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

import {CreateTask, ListTasks, DeleteTask, RenameTask} from './../../services/taskService.js';

const Home = () => {

        let history = useHistory();

        const [tasks, setTasks] = useState([]);
        const [listChanged, setListChanged] = useState(false);
        const[addMode, setAddMode] = useState(false);
        const [order, setOrder] = useState('desc');
        const [loading, setLoading] = useState(false);

        useEffect(()=>{
            const loadingImg = document.getElementById('loading');
            if (loading){
                loadingImg.style.display = 'inline';
            }else{
                loadingImg.style.display = 'none';
            }
        },[loading])

        useEffect( () => {
            const loadTasks = async function(){
                setLoading(true);
                const response = await ListTasks(order);
                setLoading(false);
    
                const data = response.data;
                console.log(data);
                setTasks(data);
                if(data.length === 0){
                    document.getElementById('h2').innerHTML = 'Sem Tarefas';
                    document.getElementById('exb').style.display = 'none';
                }else{
                    document.getElementById('h2').innerHTML = 'Suas tarefas';
                    document.getElementById('exb').style.display = 'inline';
                }
    
                setListChanged(false);
            }
            loadTasks();

        }, [listChanged]);

        useEffect( () => {
            if (addMode){
                document.getElementById('actions').style.display = 'block';
                document.getElementById('addTask').style.display = 'none';
                console.log('ativando addmode');
            }else{
                document.getElementById('actions').style.display = 'none';
                document.getElementById('addTask').style.display = 'block';
                
            }
        }, [addMode] );



        const createTask = async () => {
            let priority = document.getElementById('priority').value;
            let name = document.getElementById('name').value;
            let description = document.getElementById('description').value;
            
            const newTask = {
                "name":name,
                "priority":priority,
                "description":description
            };
            
            setLoading(true);
            await CreateTask(newTask);
            setLoading(false);
            setListChanged(true);

        };

        const handleDelete = async (id) => {
            setLoading(true);
            const result = await DeleteTask(id);
            setLoading(false);
            console.log(result);

            setListChanged(true);

        }

        const handleRename = async (id) => {
            const newName = window.prompt('Digite o novo nome para a tarefa');

            const props = {
                "_id":id,
                "name":newName
            };
            setLoading(true);
            const result = await RenameTask(props);
            setLoading(false);
            console.log(result);

            setListChanged(true);
        }

        const handleAddTool= () => {
            
            if (addMode){
                setAddMode(false);
                
            }else{
                setAddMode(true);
                document.getElementById('name').value = '';
            }
        }

        const handleChangeOrder = () => {
            if (order === 'asc'){
                setOrder('desc');
            }else{
                setOrder('asc');
            }
            setListChanged(true);
        }

        return (
            <>
            <div id="addTask">
                <input type="text" name="task-name" id="name" placeholder="Tarefa"/>
                <select id="priority" name="priority">
                    <option value="alta">Prioridade alta</option>
                    <option value="baixa">Prioridade Baixa</option>
                </select>
                <input type="text" name="task-description" id="description" placeholder="Digite a descrição"/>
                <input type="button" value="Adicionar Tarefa" onClick={
                    () => {
                        createTask();
                        handleAddTool();
                    }
                }/>
              
            </div>
            <div id="actions">
                
            </div>


            <div id="main">
                
                <h2 id="h2">Suas Atividades</h2>
                
                <p id="exb"> Exibição <p onClick={handleChangeOrder} id="order">{order}</p>)</p>
                
                <img  id="loading" alt="loading"/>

                <ul id="myTasks">
                    {tasks.map(task => 
                    <li key={task._id} >
                        <p className="t-name">{task.name}</p>
                        <p className="t-priority">{task.priority}</p>
                        <p className="t-description">{task.description}</p>
                        <div id="buttons">
                            <p alt='Delete' id="img-trash" onClick={() => handleDelete(task._id)}>Delete</p>
                            <p alt='Edit' id="img-edit" onClick={() => handleRename(task._id)}>Editar</p>
                        </div>
                    </li>)}
                </ul>
            </div>

            
            </>
        );
    
};

export default Home;