'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import Content from './components/Content'

module.exports = function (data, containerId) {
    var container = document.getElementById(containerId || 'content');
    ReactDOM.render(<Content {...data} />, container);
};