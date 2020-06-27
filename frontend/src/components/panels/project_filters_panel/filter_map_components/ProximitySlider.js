import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import {connect} from 'react-redux';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import {setRangeFilter} from '../../../../actions/filters';
import {setMapZoom} from '../../../../actions/map';
const Handle = Slider.Handle;

const dotStyle = {
  'bottom': '-10px',
  'width': '1px',
  'border': '1px solid #e9e9e9',
  'borderRadius': '0%',
  'marginLeft': '-1px',
};

const displayProximityValueToolTip = (sliderProps) => {
  const {value, dragging, index, key, className, disabled, offset, prefixCls} = sliderProps;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}>
      <Handle value={value} index={index} key={key} className={className} disabled={disabled} offset={offset} prefixCls={prefixCls}/>
    </Tooltip>
  );
};

/**
 * @param {any} value
 */
class ProximitySlider extends React.Component {
  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);
    this.state = {
      minValue: 5,
      maxValue: 50,
      steps: 5,
    };
  }

  /**
   * @param {any} minValue
   * @param {any} maxValue
   * @return {any}
   */
  marks(minValue, maxValue) {
    const miLabels = [];
    for (let i = minValue; i <= maxValue; i++ ) {
      if (i == minValue || i == maxValue || i % this.state.steps == 0) {
        miLabels.push(i);
      }
    }
    return miLabels.reduce(function(result, year) {
      result[year] = year.toString();
      return result;
    }, {});
  }

  handleProximityChange = (value) => {
    this.props.dispatch(setRangeFilter(value));
    this.props.dispatch(setMapZoom(value));
  }

  /**
  * @return {any}
  */
  render() {
    return (
      <div>
        <Slider
          min={this.state.minValue}
          max={this.state.maxValue}
          step={this.state.steps}
          marks={this.marks(this.state.minValue, this.state.maxValue)}
          dotStyle={dotStyle}
          defaultValue={this.props.filters.range}
          handle={displayProximityValueToolTip}
          onChange={(value) => {
            this.handleProximityChange(value);
          }}
        />
      </div>
    );
  }
}

ProximitySlider.propTypes = {
  dispatch: PropTypes.func,
  filters: PropTypes.shape({
    range: PropTypes.any,
  }),
};
const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ProximitySlider);
