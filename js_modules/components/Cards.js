import React, { Component, PropTypes } from 'react'
import CardItem from './CardItem'
import { Grid } from 'react-mdl'


export default class Cards extends Component {
    render() {
        const numImgs = 8,
            getImgs = this.props.getImgs;

        let imgsArr = this.props.images,
            logined = this.props.logined,
            template = [];

        if (logined && imgsArr.length > 0) { //если пользователь залогинен и у него есть свои картинки

            template = imgsArr.map((item, i) => { //наполняем картинками пользователя
                return (
                    <CardItem key={i} innerKey={i} item={item} getImgs={getImgs} />
                );
            });

            if (imgsArr.length < numImgs) { //дополняем картинки заглушками до нужного числа
                for (let i = 0; i < numImgs - imgsArr.length; i++) {
                    template.push(
                        <CardItem key={imgsArr.length + i} innerKey={imgsArr.length + i} getImgs={this.props.getImgs} />
                    );
                }
            }

        } else { //если пользователь не залогинен, либо у него нет картинок
            for (let i = 0; i < numImgs; i++) {
                template.push(
                    <CardItem key={i} innerKey={i} />
                );
            }
        }


        return (
            <Grid>
                {template}
            </Grid>
        );
    }
}