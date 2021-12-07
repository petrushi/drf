import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>
                <Link to={`projects/${project.id}`}>
                    {project.name}
                </Link>
            </td>
            <td>
                <a href={project.link}>{project.link}</a>
            </td>
            <td>
                {project.users.map(user => {
                    return (
                        <Link to={`users/${user}`}>
                            {user}
                        </Link>
                    )
                }).reduce((prev, curr) => [prev, ' ', curr], '')}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}
class ProjectList extends React.Component {
    constructor(params) {
        super(params);
        this.state = { 'searchLine': '', 'projects': this.props.projects }
    }
    handleInputChange = e => {
        this.setState({ 'searchLine': e.target.value })
        let filteredProjects = this.props.projects.filter(project => {
            return project.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        this.setState({'projects': filteredProjects})
    }
    render() {
        return (
            <div className='projects table'>
                <div className="searchForm">
                    <form>
                        <input type="text" id="filter" placeholder="Search for..." onChange={this.handleInputChange} />
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Users</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project) => <ProjectItem project={project} deleteProject={this.props.deleteProject} />)}
                    </tbody>
                </table>
                <div>
                    <Link to='projects/create'>Create project</Link>
                </div>
            </div>
        )
    }
}

export default ProjectList;
