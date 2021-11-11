import React from 'react';

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                {project.name}
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
