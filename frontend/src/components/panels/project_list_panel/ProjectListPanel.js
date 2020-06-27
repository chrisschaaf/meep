import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../helpers/Header';
import BackToLink from '../../helpers/BackToLink';
import ProjectCard from './ProjectCard';
import {connect} from 'react-redux';
import firebase from '../../../firebase.js';
import {MeepService} from '../../../services/meep_service';
import {addProjects} from '../../../actions/projects';
import {Link} from 'react-router-dom';
import {selectProject} from '../../../actions/project_details';

const meepService = new MeepService();

/**
 * ProjectListPanel
 */
class ProjectListPanel extends React.Component {
  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  /**
   */
  componentDidMount() {
    const projectsRef = firebase.database().ref('projects');
    projectsRef.on('value', (snapshot) => {
      const projects = snapshot.val();
      this.setState({
        items: projects,
      });
    });
    meepService.getProjects().then((data) => {
      this.props.dispatch(addProjects(data));
    });
  }
  /**
   * @param {any} projectID
   */
  dispatchProjectSummary(projectID) {
    meepService.getProjectDetailsById(projectID).then((data) => {
      this.props.dispatch(selectProject(data));
    });
  }
  /**
   * @return {any}
   */
  render() {
    if (Array.isArray(this.props.projects) && this.props.projects.length) {
      return (
        <div id="project_list_container">
          <BackToLink Route="/filters" Text="Back to filters" />
          <Header Text="Project That Match Your Search" />
          <div className="project-list">
            {this.props.projects.map((project) => {
              return (
                <Link to="/details" key={project.key}>
                  <ProjectCard
                    onClick={() => this.dispatchProjectSummary(project.project_id)}
                    key={project.key}
                    Name={project.name}
                    StartYear={project.year}
                    Type="infrastructure"
                    Rank={project.project_id}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <ul>
          {this.state.items.map((item) => {
            return (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.year}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

ProjectListPanel.propTypes = {
  dispatch: PropTypes.func,
  projects: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects[0] || [],
    selected_project: state.selected_project || {},
  };
};

export default connect(mapStateToProps)(ProjectListPanel);
