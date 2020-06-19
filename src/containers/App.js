import React from 'react';
import api from '../services/api'
import './App.css';
import Header from '../components/Header/index'
import Routes from '../components/Routes';

const App = () => (
    <main className="App">
        <Header />
        <Routes />
    </main>
)

export default App;
