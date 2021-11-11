import React from 'react';
import axios from 'axios';
import './App.css';
import Menu from './components/Menu.js'
import Footer from './components/Footer';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import ProjectTodos from './components/ProjectTodos'
import NotFound404 from './components/NotFound404';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState({ 'users': users.results })
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data
                this.setState({ 'projects': projects.results })
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                const todos = response.data
                this.setState({ 'todos': todos.results })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className='container'>
                <div className='main'>
                    <BrowserRouter>
                        <Menu></Menu>
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                            <Redirect from='/users' to='/'/>

                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />} />
                            {/* <Route path='/project/:id'>
                                <ProjectTodos todos={this.state.todos}/>
                            </Route> */}
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
