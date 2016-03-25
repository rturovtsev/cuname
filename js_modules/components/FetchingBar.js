import React, { Component } from 'react'

export default class FetchingBar extends Component {
    render() {
        let fetchClass = 'fetching ' + (this.props.fetchClass ? this.props.fetchClass : '');

        return (
            <div id='fetching' className={fetchClass}></div>
        );
    }
}