import React, { Component, PropTypes } from 'react'
import { Cell, Card, CardActions, CardTitle } from 'react-mdl'


export default class CardItem extends Component {
    render() {
        const key = this.props.key;
        const item = this.props.item;

        const url = item ? '/i/' + item : 'http://www.getmdl.io/assets/demos/image_card.jpg';

        return (
            <Cell key={key} col={3}>
                <Card className="img-card" shadow={0} style={{background: 'url(' + url + ') center / cover'}}>
                    <CardTitle expand />
                    <CardActions>
                        <span>
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