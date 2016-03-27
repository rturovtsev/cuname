import React, { Component } from 'react'


export default class FetchingBar extends Component {
    componentDidMount() {
        window.ee.addListener('changeFetchState', function(fetchState) {
            this.props.setFetchingBarState(fetchState);
        });
    }
    componentWillUnmount() {
        window.ee.removeListener('changeFetchState');
    }
    render() {
        let fetchClass = 'fetching ' + (this.props.fetchClass ? this.props.fetchClass : '');

        return (
            <div id='fetching' className={fetchClass}></div>
        );
    }
}