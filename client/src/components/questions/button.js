import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ color, text, onClick, icon, id }) => {
    return (
        <button
            id={id}
            onClick={onClick}
            style={{ backgroundColor: color }}
            className='btn'
        >
            <i className={ icon }></i> &nbsp; 
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
