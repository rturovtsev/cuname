import React, { Component } from 'react'

import NavbarBrand from '../components/NavbarBrand'


export default class Footer extends Component {
    render() {
        return (
            <footer className="mdl-mini-footer">
                <div className="mdl-mini-footer__left-section">
                    <NavbarBrand />
                </div>
            </footer>
        );
    }
}