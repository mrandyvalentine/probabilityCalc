import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import ButtonConstants from './ButtonConstants';
import './_button.scss';

const propTypes = {
    ariaAttributes: PropTypes.objectOf(PropTypes.string),
    classList: PropTypes.string,
    dataAttributes: PropTypes.objectOf(PropTypes.string),
    disabled: PropTypes.bool,
    fluid: PropTypes.bool,
    icon: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string,
    onClick: PropTypes.func,
    secondary: PropTypes.bool,
    small: PropTypes.bool,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}

const defaultProps = {
    ariaAttributes: {},
    classList: '',
    dataAttributes: {},
    disabled: false,
    fluid: false,
    icon: {},
    id: '',
    onClick: () => {},
    secondary: false,
    small: false,
    type: ButtonConstants.Type,
    value: ButtonConstants.Value,
}

const Button = props => {

    //modifiers - relies on classNames 
    let classString = classNames(
        ButtonConstants.BaseClass,
        props.classList,
        {[`${ButtonConstants.BaseClass}--${ButtonConstants.Modifier.Fluid}`]: props.fluid,
        [`${ButtonConstants.BaseClass}--${ButtonConstants.Modifier.Small}`]: props.small,
        [`${ButtonConstants.BaseClass}--${ButtonConstants.Modifier.Secondary}`]: props.secondary}
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

    return (
        <button 
            className={classString}
            onClick={props.onClick}
            type={props.type}
            {...opts}>
            {props.value}
        </button>
    )
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;

