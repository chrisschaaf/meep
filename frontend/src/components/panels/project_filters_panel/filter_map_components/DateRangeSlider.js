import React from "react";
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

const dotStyle = {
	'bottom': '-10px',
    'width': '1px',
    'border': '1px solid #e9e9e9',
    'border-radius': '0%',
    'margin-left': '-1px',
};

const handle = (props) => {
  const { value, dragging, index, key, className, disabled, offset, prefixCls} = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} dragging={dragging} index={index} key={key} className={className} disabled={disabled} offset={offset} prefixCls={prefixCls} />
    </Tooltip>
  );
};

class DateRangeSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minValue: 2000,
			maxValue: 2018,

		}
	}
	marks(minValue, maxValue) {
	  let yearLabels = [];
	  for (let i = minValue; i <= maxValue; i++ ) {
	    if (i == minValue || i == maxValue || i % 5 == 0) {
	      yearLabels.push(i);
	    }
	  }
	  return yearLabels.reduce(function(result, year) {
	    result[year] = year.toString();
	    return result;
	  }, {});
	}

	render() {
		return (
		    <div>
		    	<Range
		    		min={this.state.minValue}
		    		max={this.state.maxValue}
		    		marks={this.marks(this.state.minValue, this.state.maxValue)}
		    		dots={true}
		    		dotStyle={dotStyle} 
		    		defaultValue={[2015, 2018]}
		    		handle={handle}
		    		/>
		    </div>
			)
	}
}

export default DateRangeSlider;