import React, { Component, PropTypes } from 'react'
import { Cell, Card, CardActions, CardTitle } from 'react-mdl'


export default class CardItem extends Component {
    render() {
        const key = this.props.key;
        const item = this.props.item;

        const url = item ? '/i/' + item : 'http://www.getmdl.io/assets/demos/image_card.jpg';

        return (
            <Cell key={key} col={3}>
                <Card shadow={0} style={{width: '256px', height: '256px', background: 'url(' + url + ') center / cover', margin: 'auto'}}>
                    <CardTitle expand />
                    <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                                    {item ? item : 'Заглушка'}
                                </span>
                    </CardActions>
                </Card>
            </Cell>
        );
    }
}

CardItem.PropTypes = {
    key: PropTypes.number,
    item: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool
    ])
};

CardItem.defaultProps = {
    key: 0,
    item: false
};