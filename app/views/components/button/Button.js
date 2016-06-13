'use strict';

import React, {PropTypes, Component} from 'react';

const propTypes = {
    name: PropTypes.string
};

class Button extends Component {
    render() {
        return (
            <div className='button' onClick={this.props.onClick}>{this.props.name}</div>
        )
    }
}

Button.propTypes = propTypes;

module.exports = Button;