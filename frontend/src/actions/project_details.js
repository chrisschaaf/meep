import uuid from 'uuid';

// SELECT_PROJECT
export const selectProject = (selectedProject) => ({
  type: 'SELECT_PROJECT',
  project: {
    key: uuid(),
    date: selectedProject.date,
    img: selectedProject.img,
    details: selectedProject.details,
    name: selectedProject.project_name,
    type: selectedProject.project_type,
    emissions_data: selectedProject.emissions_data,
  },
});
