import React, { Component, PropTypes } from 'react'
import { Cell, Card, CardActions, CardText, CardTitle, FABButton, Icon } from 'react-mdl'


export default class CardItem extends Component {
    _sendFileHandler(e) {
        let input = e.target;

        if (input.value == '') return;

        let xhr = new XMLHttpRequest(),
            url = '/uploads',
            data = new FormData(input.parentNode);

        //data.append('name', input.name);

        xhr.open('POST', url, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200){
                alert('Ошибка, попробуйте позже!');
            } else {
                let url = '/i/' + xhr.responseText;
                input.parentNode.parentNode.parentNode.parentNode.style.background = 'url(' + url + ') center / cover';
            }
        };

        xhr.send(data);
    }
    _removeFileHandler(e) {
        let xhr = new XMLHttpRequest(),
            url = '/removeimg',
            card = e.target.parentNode.parentNode.parentNode,
            imgNum = card.dataset.imgform,
            data = JSON.stringify({imgNum: imgNum});

        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                alert('Попробуйте позже')
            } else {
                location.reload(); //TODO доработать
            }
        };

        xhr.send(data);
    }
    render() {
        let key = this.props.innerKey;
        let item = this.props.item;

        let url = item ? '/i/' + item : 'http://www.getmdl.io/assets/demos/image_card.jpg';

        return (
            <Cell key={key} col={3}>
                <Card className="img-card" data-imgform={key} shadow={0} style={{background: 'url(' + url + ') center / cover'}}>
                    <CardTitle expand />

                    {item ?
                        <CardText style={{textAlign: "right"}}>
                            <FABButton onClick={this._removeFileHandler.bind(this)} mini colored ripple>
                                <Icon name="remove"/>
                            </FABButton>
                        </CardText>
                        :
                        <CardText style={{textAlign: "right"}}>
                            <FABButton mini colored ripple component="label">
                                <form>
                                    <input onChange={this._sendFileHandler.bind(this)} type="file" className="hide" name="img_file" accept="image/*,image/jpeg,image/png,image/gif,image/ico" />
                                </form>
                                <Icon name="add"/>
                            </FABButton>
                        </CardText>
                    }


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
    innerKey: 0,
    item: false
};