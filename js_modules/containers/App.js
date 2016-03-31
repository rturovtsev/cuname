//Core
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as modalActions from '../actions/ModalActions'
import EventEmitter from 'wolfy87-eventemitter'

//Components
import NavbarBrand from '../components/NavbarBrand'
import UserPanel from '../components/UserPanel'
import HeaderLogo from '../components/HeaderLogo'
import Footer from '../components/Footer'
import { Layout, Header, Drawer } from 'react-mdl'


window.ee = new EventEmitter();


class App extends Component {
    render() {
        const { name, logined } = this.props.user; //имя пользователя и статус авторизации
        const { setLogined } = this.props.userActions; //меняем статус авторизации пользователя
        const { modalIsOpen } = this.props.modal; //статус модального окна
        const { setModalState } = this.props.modalActions; //меняем статус модального окна

        return (
            <Layout fixedHeader>
                <Header title={<NavbarBrand />} >
                    <UserPanel name={name} logined={logined} setLogined={setLogined} setModalState={setModalState} modalIsOpen={modalIsOpen} />
                </Header>
                <Drawer>
                    <NavbarBrand />
                </Drawer>
                <main className="mdl-layout__content">
                    <div className="mdl-grid">

                    </div>
                </main>
                <Footer />
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
        modalActions: bindActionCreators(modalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);