//Core
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as fetchingBarActions from '../actions/FetchingBarActions'
import * as modalActions from '../actions/ModalActions'
import EventEmitter from 'wolfy87-eventemitter'

//Components
import FetchingBar from '../components/FetchingBar'
import NavbarBrand from '../components/NavbarBrand'
import UserPanel from '../components/UserPanel'
import HeaderLogo from '../components/HeaderLogo'
import Footer from '../components/Footer'


window.ee = new EventEmitter();


class App extends Component {
    render() {
        const { name, logined } = this.props.user;
        const { setLogined } = this.props.userActions;
        const { fetching } = this.props.fetchingBar;
        const { modalIsOpen } = this.props.modal;
        const { setFetchingBarState } = this.props.fetchingBarActions;
        const { setModalState } = this.props.modalActions;

        return (
            <div className="mdl-layout mdl-js-layout">
                <FetchingBar fetchClass={fetching} setFetchingBarState={setFetchingBarState} />
                <header className="mdl-layout__header">
                    <HeaderLogo />
                    <div className='mdl-layout__header-row'>
                        <NavbarBrand />
                        <div className="mdl-layout-spacer"></div>
                        <UserPanel name={name} logined={logined} setLogined={setLogined} setModalState={setModalState} modalIsOpen={modalIsOpen} />
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <NavbarBrand />
                </div>
                <main className="mdl-layout__content">
                    <div className="mdl-grid">

                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}


function mapStateToProps (state) {
    return {
        user: state.user,
        page: state.page,
        fetchingBar: state.fetchingBar,
        modal: state.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        fetchingBarActions: bindActionCreators(fetchingBarActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);