import React, { Component, PropTypes } from 'react'
import { Grid, Cell, Card, CardActions, CardTitle } from 'react-mdl'


export default class Content extends Component {
    render() {
        let imgsArr = this.props.images,
            logined = this.props.logined,
            template = '';

        if (imgsArr.length > 0 && logined) {
            template = imgsArr.map((item, i) => {
                return (
                    <Cell key={i} col={3}>

                        <Card shadow={0} style={{width: '256px', height: '256px', background: 'url(/i/' + item + ') center / cover', margin: 'auto'}}>
                            <CardTitle expand />
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                                    {item}
                                </span>
                            </CardActions>
                        </Card>

                    </Cell>
                );
            });
        }

        return (
            <Grid>
                {template}
            </Grid>
        );
    }
}