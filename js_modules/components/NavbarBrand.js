import React, { Component } from 'react';

export default class NavbarBrand extends Component {
    render() {
        return <div className='navbar-header'>
            <button
                type='button'
                className='navbar-toggle collapsed'
                data-toggle='collapse'
                data-target='#bs-example-navbar-collapse-1'
                aria-expanded='false'>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
            </button>
            <a
                href='/'
                className='navbar-brand'>
                Cuname
            </a>
        </div>
    }
}