import React from 'react';


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'text': '', 'project': props.projects, 'author': props.users, 'isActive': false }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.project, this.state.author, this.state.isActive)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" className='form-control'
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="author">author</label>

                    <select name="author" className='form-control'
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>

                </div>
                <div className="form-group">
                    <label htmlFor="isActive">is active</label>
                    <input type="checkbox" default={true} className="form-control" name="isActive" value={this.state.isActive}
                        onChange={() => this.setState(({ isActive }) => ({ isActive: !isActive }))}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm
