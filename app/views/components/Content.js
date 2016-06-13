'use strict';

import React, {PropTypes, Component} from 'react'
import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'
import i18n from './i18n'

const propTypes = {
    i18n_lang: PropTypes.string,
    i18n_data: PropTypes.object,
    location: PropTypes.string
};

class Content extends Component {
    render() {
        const {i18n_lang, i18n_data, location} = this.props;

        // set selected language and it's data;
        i18n.setLocale(i18n_lang);
        i18n.setData(i18n_data);
        
        // Render view
        return (
            <div className="container">
                <Header location={i18n.getValue(location)} />
                <Main />
                <Footer />
            </div>
        )
    }
}

Content.propTypes = propTypes;

module.exports = Content;