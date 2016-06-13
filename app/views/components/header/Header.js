'use strict';

import React, {PropTypes, Component} from 'react';
import Logo from './../logo/Logo';
import Navigation from './../navigation/Navigation';
import Button from './../button/Button';
import i18n from '../i18n';

const propTypes = {
    location: PropTypes.string
};

class Header extends Component {
    constructor() {
        super();
        
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    onSignUp(e) {
        e.preventDefault();
        console.log('sign up');
    }

    onSignIn(e) {
        e.preventDefault();
        console.log('sign in');
    }
    
    render() {
        return (
            <header className='header'>
                <Logo />
                <Navigation location={this.props.location}/>
                <Button name={i18n.getValue('HEADER_SIGN_IN')} onClick={this.onSignUp}/>
                <Button name={i18n.getValue('HEADER_SIGN_UP')} onClick={this.onSignIn}/>
            </header>
        )
    }
}

Header.propTypes = propTypes;

// export default withStyles(Header, s);
module.exports = Header;