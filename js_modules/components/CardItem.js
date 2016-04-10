import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, ContentAdd } from 'material-ui'
import IconButton from 'material-ui/lib/icon-button';


export default class CardItem extends Component {
    _sendFileHandler() {
        let input = this.refs.input;
        let card = this.refs.card;

        if (input.value == '') return;

        let xhr = new XMLHttpRequest(),
            url = '/uploads',
            data = new FormData(input.parentNode);

        xhr.open('POST', url, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200){
                alert('Ошибка, попробуйте позже!');
            } else {
                let url = '/i/' + xhr.responseText;
                card.style.background = 'url(' + url + ') center / cover';
                console.log("Добавлено!", this.props);
                this.props.getImgs('get');
            }
        };

        xhr.send(data);
    }
    _removeFileHandler() {
        let xhr = new XMLHttpRequest(),
            url = '/removeimg',
            card = this.refs.card,
            imgNum = card.dataset.imgform,
            data = JSON.stringify({imgNum: imgNum});

        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                alert('Попробуйте позже');
            } else {
                card.style.background = 'url(http://www.getmdl.io/assets/demos/image_card.jpg) center / cover';
                this.props.getImgs('get');
                console.log("Удалено!");
            }
        };

        xhr.send(data);
    }
    _openFile() {
       this.refs.input.click();
    }
    render() {
        let key = this.props.innerKey;
        let item = this.props.item;

        let url = item ? '/i/' + item : 'http://www.getmdl.io/assets/demos/image_card.jpg';

        return (
            <div key={key} className={"mdl-cell mdl-cell--" + 3 + "-col"}>
                <div ref="card" className="mdl-card img-card" data-imgform={key} style={{background: 'url(' + url + ') center / cover'}}>
                    <div className="mdl-card__title mdl-card--expand">
                        &nbsp;
                    </div>

                    {item ?
                        <div className="mdl-card__supporting-text" style={{textAlign: "right"}}>
                            <FloatingActionButton onTouchTap={this._removeFileHandler.bind(this)} tooltip="Удалить" mini secondary={true} >
                                <i className="material-icons remove-file__icon">remove</i>
                            </FloatingActionButton>
                        </div>
                        :
                        <div className="mdl-card__supporting-text" style={{textAlign: "right"}}>
                            <FloatingActionButton onTouchTap={this._openFile.bind(this)} tooltip="Добавить" mini secondary={true} >
                                <i className="material-icons add-file__icon">add</i>
                                <form>
                                    <input ref="input" onChange={this._sendFileHandler.bind(this)} type="file" className="hide" name="img_file" accept="image/*,image/jpeg,image/png,image/gif,image/ico" />
                                </form>
                            </FloatingActionButton>
                        </div>
                    }


                    <div className="mdl-card__actions">
                        <span>
                            {item ? item : 'Выберите картинку'}
                        </span>
                    </div>
                </div>
            </div>
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