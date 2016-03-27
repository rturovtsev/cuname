import React, { Component, PropTypes } from 'react'


export default class FetchingBar extends Component {
    componentDidMount() {
        const self = this;

        window.ee.addListener('changeFetchState', function(fetchState) {
            self.props.setFetchingBarState(fetchState);

            if (fetchState == 'end') {
                setTimeout(function() {
                    self.props.setFetchingBarState('hide');
                }, 1000);
            }
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

FetchingBar.PropTypes = {
    setFetchingBarState: PropTypes.func.isRequired
};