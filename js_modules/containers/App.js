//Core
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as modalActions from '../actions/ModalActions'
import * as pageActions from '../actions/PageActions'

//Components
import NavbarBrand from '../components/NavbarBrand'
import UserPanel from '../components/UserPanel'
import Footer from '../components/Footer'
import PopUp from '../components/PopUp'
import Content from '../components/Content'
import Cards from '../components/Cards'
import { Layout, Header, Drawer } from 'react-mdl'


class App extends Component {
    render() {
        const { name, logined } = this.props.user; //имя пользователя и статус авторизации
        const { setLogined, setName } = this.props.userActions; //меняем статус авторизации пользователя
        const { modalIsOpen } = this.props.modal; //статус модального окна
        const { setModalState } = this.props.modalActions; //меняем статус модального окна
        const { images } = this.props.page; //картинки
        const { getImgs, clearImgs } = this.props.pageActions; //получаем картинки

        return (
            <Layout fixedHeader>
                <Header title={<NavbarBrand />} >
                    <UserPanel name={name} logined={logined} setLogined={setLogined} setModalState={setModalState} clearImgs={clearImgs} />
                </Header>
                <Drawer>
                    <NavbarBrand />
                </Drawer>
                <main className="mdl-layout__content">
                    <Content>
                        <Cards logined={logined} images={images} getImgs={getImgs} />
                    </Content>
                </main>
                <Footer />
                <PopUp setModalState={setModalState} modalIsOpen={modalIsOpen} setLogined={setLogined} setName={setName} getImgs={getImgs} />
            </Layout>
        );
    }
}


function mapStateToProps (state) {
    return {
        user: state.user,
        page: state.page,
        modal: state.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch),
        pageActions: bindActionCreators(pageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);