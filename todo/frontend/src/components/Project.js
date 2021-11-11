import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project }) => {
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
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <div className='projects table'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => <ProjectItem project={project} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectList;
