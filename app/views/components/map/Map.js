'use strict';

import React, {PropTypes, Component} from 'react';

const propTypes = {
    latitude: PropTypes.string,
    longitude: PropTypes.string
};

class Map extends Component {
    componentDidMount() {
        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
    }

    render() {
        return (
            <div className='map' id="map"></div>
        )
    }
}

Map.propTypes = propTypes;

module.exports = Map;