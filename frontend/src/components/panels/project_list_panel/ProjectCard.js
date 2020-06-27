import PropTypes from 'prop-types';
import React from 'react';
import LocationMarker from '../../helpers/locationMarker';

/**
 * @return {any}
 */
class ProjectCard extends React.Component {
  /**
   * @return {any}
   */
  render() {
    const {Name, Type, Rank, StartYear} = this.props;
    return (
      <div className="project-card">
        <div className="row">
          <div className="col-12">
            <p className="project-card-header">{Name}</p>
          </div>
          <div className="col-2">
            <div className="project-card-marker">
              <LocationMarker FillClass={Type} Num={Rank}/>
            </div>
          </div>
          <div className="col-6 flush-left">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. consectetur adipiscing elit.</p>
            <p><em>{StartYear} | 3 miles</em></p>
          </div>
          <div className="col-4 flush-left">
            <img className="project-card-img" src="images/project_placeholder.png"/>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  Name: PropTypes.any,
  Rank: PropTypes.any,
  StartYear: PropTypes.any,
  Type: PropTypes.any,
};

export default ProjectCard;
