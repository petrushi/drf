import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './App.css';
import Menu from './components/Menu.js'
import Footer from './components/Footer';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import ProjectTodoList from './components/ProjectTodos'
import UserInfo from './components/UserInfo';
import LoginForm from './components/auth';
import NotFound404 from './components/NotFound404';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': '',
        }
    }

    loadData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users/', { headers })
            .then(response => {
                const users = response.data
                this.setState({ 'users': users.results })
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'users': [] })
            })

        axios.get('http://127.0.0.1:8000/api/projects/', { headers })
            .then(response => {
                const projects = response.data
                this.setState({ 'projects': projects.results })
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'projects': [] })
            })
        axios.get('http://127.0.0.1:8000/api/todos/', { headers })
            .then(response => {
                const todos = response.data
                this.setState({ 'todos': todos.results })
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'todos': [] })
            })
    }

    isAuth() {
        return !!this.state.token
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({ 'token': token }, () => this.loadData())
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', { 'username': username, 'password': password })
            .then(response => {
                this.setToken(response.data['token'])
                this.setState({ 'username': username })

            }).catch(error => console.log(error))
    }

    getTokenFromStorage() {

        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({ 'token': token }, () => this.loadData())

    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json',
        }
        if (this.isAuth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.getTokenFromStorage()
    }

    render() {
        return (
            <div className='container'>
                <div className='main'>
                    <BrowserRouter>
                        <Menu username={this.state.username}
                            isAuthed={this.isAuth()} setToken={(token) => this.setToken(token)}>
                        </Menu>

                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users} />} />

                            <Route path='/users/:id'>
                                <UserInfo todos={this.state.todos} projects={this.state.projects} />
                            </Route>

                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                            <Route path='/projects/:id'>
                                <ProjectTodoList todos={this.state.todos} />
                            </Route>

                            <Route exact path='/login' component={() =>
                                <LoginForm getToken={(username, password) => this.getToken(username, password)} />} />

                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />} />
                            <Redirect from='/users' to='/' />

                            <Route component={NotFound404} />
                        </Switch>
                    </BrowserRouter>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default App;
