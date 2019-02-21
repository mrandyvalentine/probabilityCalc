import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import InputConstants from './InputConstants';
import './_input.scss';

const propTypes = {
    ariaAttributes: PropTypes.objectOf(PropTypes.string),
    classList: PropTypes.string,
    dataAttributes: PropTypes.objectOf(PropTypes.string),
    disabled: PropTypes.bool,
    fluid: PropTypes.bool,
    id: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(Object.values(InputConstants.Type)).isRequired,
    valid: PropTypes.bool,
}

const defaultProps = {
    ariaAttributes: {},
    classList: '',
    dataAttributes: {},
    disabled: false,
    fluid: false,
    id: '',
    max: null,
    min: null,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    onKeyUp: () => {},
    placeholder: null,
    readOnly: false,
    required: false,
    step: 'any',
    type: InputConstants.Type.Text,
    valid: null
}

const Input = props => {
    
    //modifiers
    let classString = classNames(
        InputConstants.BaseClass,
        props.classList,
        {[`${InputConstants.BaseClass}--${InputConstants.Modifier.Fluid}`]: props.fluid,
        [`${InputConstants.BaseClass}--${InputConstants.Validation.Valid}`]: props.valid,
        [`${InputConstants.BaseClass}--${InputConstants.Validation.Invalid}`]: props.valid === false}
    );

    // spread attributes object
    let opts = {};

    // convert the data and aria objects into spread attributes
    Object.keys(props.dataAttributes).map(item => {
        return opts[`data-${item}`] = props.dataAttributes[item]
    })
    Object.keys(props.ariaAttributes).map(item => {
        return opts[`aria-${item}`] = props.ariaAttributes[item]
    })
    if (props.disabled) opts.disabled = 'disabled';
    if (props.id) opts.id = props.id;
    if (props.required) opts.required = 'required';
    if (props.readOnly) opts.readOnly = 'readOnly';
    if (props.step) opts.step = props.step;
        
    return (
        <input 
            className={classString}
            max={props.max}
            min={props.min}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onKeyUp={props.onKeyUp}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            {...opts} />
    )
}

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;