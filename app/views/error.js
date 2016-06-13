'use strict';

import React, {PropTypes, Component} from 'react'

class ErrorView extends Component {
    render() {
        return (
            <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <body>
            <div>{this.props.message}</div>
            <div>{this.props.error.toString()}</div>
            </body>
            </html>
        )
    }
}

ErrorView.propTypes = {
    error: PropTypes.object,
    message: PropTypes.string
};

module.exports = ErrorView;