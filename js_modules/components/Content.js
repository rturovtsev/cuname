import React, { Component, PropTypes } from 'react'


export default class Content extends Component {
    render() {
        return (
            <div className="content">
                {this.props.children}
            </div>
        );
    }
}