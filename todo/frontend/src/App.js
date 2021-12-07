import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './App.css';
import Menu from './components/Menu'
import Footer from './components/Footer';
import UserList from './components/User';
import ProjectList from './components/Project';
import TodoList from './components/Todo';
import ProjectTodoList from './components/ProjectTodos'
import UserInfo from './components/UserInfo';
import LoginForm from './components/auth';
import ProjectForm from './components/ProjectForm'
import TodoForm from './components/TodoForm';
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
    createProject(name, link, users) {
        const headers = this.getHeaders()
        const data = { name: name, link: link, users: users }
        axios.post(`http://127.0.0.1:8000/api/projects/?version=2`, data, { headers })
            .then(response => {
                // let newProject = response.data
                // let users = this.state.users.filter((item) => item.id == newProject.users)[0]
                // newProject.users = users
                // this.setState({ projects: [...this.state.projects, newProject] })
                this.loadData()
            }).catch(error => {
                console.log(error)
                this.setState({ 'projects': [] })
            })
    }
    createTodo(text, project, author, isActive) {

        if (typeof project !== 'string') {
            project = project[0].id
        }
        if (typeof author !== 'string') {

            author = author[0].id
        }
        const headers = this.getHeaders()
        const data = { text: text, project: project, author: author, isActive: isActive }
        axios.post(`http://127.0.0.1:8000/api/todos/?version=2`, data, { headers })
            .then(response => {
                // let newProject = response.data
                // let users = this.state.users.filter((item) => item.id == newProject.users)[0]
                // newProject.users = users
                // this.setState({ projects: [...this.state.projects, newProject] })
                this.loadData()
            }).catch(error => {
                console.log(error)
                this.setState({ 'todos': [] })
            })
    }

    deleteProject(id) {
        const headers = this.getHeaders()
        let projectTodos = this.state.todos.filter(todo => todo.project == id)
        for (let todo of projectTodos) {
            this.deleteTodo(todo.id)
        }
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers })
            .then(response => {
                // this.setState({ 'projects': this.state.projects.filter((item) => item.id !== id) })
                this.loadData()
            })
            .catch(error => {
                console.log(error)
            })
    }
    deleteTodo(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, { headers })
            .then(response => {
                this.loadData()
            })
            .catch(error => {
                console.log(error)
            })
    }
    loadData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users/?version=2', { headers })
            .then(response => {
                const users = response.data
                this.setState({ 'users': users.results })
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'users': [] })
            })

        axios.get('http://127.0.0.1:8000/api/projects/?version=2', { headers })
            .then(response => {
                const projects = response.data
                this.setState({ 'projects': projects.results })
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'projects': [] })
            })
        axios.get('http://127.0.0.1:8000/api/todos/?version=2', { headers })
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
                            <Route exact path='/projects/create'
                                component={() =>
                                    <ProjectForm users={this.state.users}
                                        createProject={(name, link, users) => this.createProject(name, link, users)}
                                    />} />
                            <Route exact path='/todos/create'
                                component={() =>
                                    <TodoForm users={this.state.users} projects={this.state.projects}
                                        createTodo={(text, project, author, isActive) => this.createTodo(text, project, author, isActive)}
                                    />} />
                            <Route exact path='/projects'
                                component={() =>
                                    <ProjectList projects={this.state.projects}
                                        deleteProject={(id) => this.deleteProject(id)}
                                    />}
                            />
                            <Route path='/projects/:id'>
                                <ProjectTodoList todos={this.state.todos} />
                            </Route>

                            <Route exact path='/login' component={() =>
                                <LoginForm getToken={(username, password) => this.getToken(username, password)} />} />

                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)} />} />
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
