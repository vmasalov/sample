'use strict';

import React, {PropTypes, Component} from 'react';
import Map from './../map/Map'

class Main extends Component {
    render() {
        return (
            <main>
                <article>
                    <Map latitude="0" longitude="0" />
                </article>
            </main>
        )
    }
}

module.exports = Main;