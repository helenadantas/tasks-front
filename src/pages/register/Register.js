import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'

import '../login/Login.css'

const Register = () => {
    const handleSubmit = values => {
        axios.post('https://gerenciador-de-tarefas-codex.herokuapp.com/api/user/register/', values)
            .then(resp => {
                
                    history.push('/login')
                }
            ).catch(function(err){
                alert('Email already exist\nResposta do servidor: '+err);
            });
    }

    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    })
    return (
        <>
            <h1>Registro</h1>
            <p>Digite as informações abaixo para se registrar</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                        <Field 
                            placeholder="Nome"
                            name="firstName"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="firstName"
                            className="Login-Error"
                        />
                    </div>

                    <div className="Login-Group">
                        <Field
                            placeholder="Email"
                            name="email"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="Login-Error"
                        />
                        
                    </div>
                    <div className="Login-Group">
                        <Field
                            placeholder="Senha"
                            name="password"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Register</button>
                </Form>
            </Formik>
        </>
    )
}

export default Register