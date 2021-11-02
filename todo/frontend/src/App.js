import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
//        const users = [
//            {
//                'first_name': 'Fedor',
//                'last_name': 'Dost',
//                'birth_year': 1821
//            },
//        ]
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response =>{
            const users = response.data
            this.setState({'users': users})
            }).catch(error => console.log(error))
    }


    render() {
        return (
            <div>
            <UserList users = {this.state.users}/>
            </div>
        )
    }
}
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}

export default App;
