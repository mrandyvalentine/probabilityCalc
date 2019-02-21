import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import LabelConstants from './LabelConstants';
import './_label.scss';

const propTypes = {
    classList: PropTypes.string,
    disabled: PropTypes.bool,
    for: PropTypes.string.isRequired,
    marker: PropTypes.string,
    required: PropTypes.bool,
    text: PropTypes.string.isRequired,
    valid: PropTypes.bool
}

const defaultProps = {
    classList: '',
    disabled: false,
    for: '',
    marker: LabelConstants.Required.Marker,
    required: false,
    text: LabelConstants.Text,
    valid: null
}

const Label = props => {
    
    //modifiers
    let classString = classNames(
        LabelConstants.BaseClass,
        props.classList,
        {[`${LabelConstants.BaseClass}--${LabelConstants.Validation.Valid}`]: props.valid,
        [`${LabelConstants.BaseClass}--${LabelConstants.Validation.Invalid}`]: props.valid === false}
    );

    // spread attributes object
    let opts = {};

    if (props.disabled) opts.disabled = 'disabled';
            
    return (
        <label 
            className={classString}
            htmlFor={props.for}
            {...opts}>
            {props.text}{(props.required) ? <span className={`${LabelConstants.BaseClass}__${LabelConstants.Required.Class}`}>{props.marker}</span> : ''}
        </label>
    )
}

Label.defaultProps = defaultProps;
Label.propTypes = propTypes;

export default Label;