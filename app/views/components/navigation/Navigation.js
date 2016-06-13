'use strict';

import React, {PropTypes, Component} from 'react';
import cookie from 'react-cookie';
import Dropdown from 'react-dropdown';
import i18n from'../i18n';

const propTypes = {
    location: PropTypes.string
};

class Navigation extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            list: i18n.getValue('NAV_COUNTRIES'),
            lang: i18n.getValue('NAV_LANGUAGES')
        };

        Navigation.onLangSelect = Navigation.onLangSelect.bind(this);
        Navigation.onCountrySelect = Navigation.onCountrySelect.bind(this);
    }

    static onCountrySelect(option) {
        console.log(option);
    }

    /**
     * Set new locale based on dropdown selection;
     * @param option
     */
    static onLangSelect(option) {
        if (i18n.setLocale(option)) {
            cookie.save('lang', i18n.getLocale(), {path: '/'});
            window.location.reload();
        }
    }

    render() {
        let {list, lang} = this.state;
        let {location} = this.props;
        const defaultCountry = list[0];
        const defaultLanguage = lang[0];

        return (
            <div className='navigation'>
                <span>{i18n.getValue('NAV_COUNTRY')} -</span>
                <Dropdown
                    class="country"
                    options={list}
                    value={defaultCountry}
                    onChange={Navigation.onCountrySelect}
                />
                <span className="left">- {location}</span>
                <div className="right">
                    <Dropdown
                        options={lang}
                        value={defaultLanguage}
                        onChange={Navigation.onLangSelect}
                    />
                </div>
            </div>
        )
    }
}

Navigation.propTypes = propTypes;

export default Navigation