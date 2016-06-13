'use strict';

import React, {PropTypes, Component} from 'react'
import Button from '../button/Button'
import i18n from '../i18n'

class Footer extends Component {
    constructor() {
        super();
        this.onFeedbackClick = this.onFeedbackClick.bind(this);
    }

    onFeedbackClick() {
        console.log('Feedback');
    }

    render() {
        return (
            <footer>
                <span>{i18n.getValue('FOOTER_COPYRIGHT')}</span>
                <Button className='feedback' name={i18n.getValue('FOOTER_FEEDBACK')} onClick={this.onFeedbackClick}/>
            </footer>
        )
    }
}

module.exports = Footer;