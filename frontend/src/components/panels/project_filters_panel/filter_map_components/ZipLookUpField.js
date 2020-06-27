import PropTypes from 'prop-types';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {MeepService} from '../../../../services/meep_service';
import {setMapCenter} from '../../../../actions/map';
import {setZipCode} from '../../../../actions/filters';
import {connect} from 'react-redux';

const meepService = new MeepService();

/**
 * @param {any} zipcode
 */
class ZipLookUpField extends React.Component {
  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);
  }

    setMapCenterWithZipCode = (zipcode) => {
      const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);

      if (isValidZip) {
        meepService.getGeoDataByZipCode(zipcode).then((data) => {
          if (data.hasOwnProperty('lat') && data.hasOwnProperty('lng')) {
            this.props.dispatch(setMapCenter(data));
            this.props.dispatch(setZipCode(data));
          }
        });
      } else {
        console.log('invalid zipcode');
      }
    }

    /**
     * @param {any} e
     */
    handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.setMapCenterWithZipCode(e.target.value);
      }
    }

    /**
     * @return {any}
     */
    render() {
      return (
        <InputGroup size="sm" className="my-1">
          <FormControl
            aria-label="zipcode lookup"
            defaultValue={this.props.zipcode}
            onKeyDown={(e) => this.handleKeyDown(e)}
            onBlur={(e) => this.setMapCenterWithZipCode(e.target.value)}/>
        </InputGroup>
      );
    }
}

ZipLookUpField.propTypes = {
  dispatch: PropTypes.func,
  zipcode: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    zipcode: state.filters.zipcode,
  };
};

export default connect(mapStateToProps)(ZipLookUpField);
