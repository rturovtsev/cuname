import React, { Component, PropTypes } from 'react'
import CardItem from './CardItem'
import { Grid } from 'react-mdl'


export default class Cards extends Component {
    render() {
        const numImgs = 8;

        let imgsArr = this.props.images,
            logined = this.props.logined,
            template = [];

        if (logined && imgsArr.length > 0) { //если пользователь залогинен и у него есть свои картинки

            template = imgsArr.map((item, i) => { //наполняем картинками пользователя
                return (
                    <CardItem key={i} item={item} />
                );
            });

            if (imgsArr.length < numImgs) { //дополняем картинки заглушками до нужного числа
                for (let i = 0; i < numImgs - imgsArr.length; i++) {
                    template.push(
                        <CardItem key={imgsArr.length + i} />
                    );
                }
            }

        } else { //если пользователь не залогинен, либо у него нет картинок
            for (let i = 0; i < numImgs; i++) {
                template.push(
                    <CardItem key={i} />
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