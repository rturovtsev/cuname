import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavbarBrand from '../components/NavbarBrand'
import UserPanel from '../components/UserPanel'
import * as userActions from '../actions/UserActions'


 class App extends Component {
    render() {
        const { name, logined, fetching } = this.props.user;
        const { setLogined } = this.props.userActions;

        return <header>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='navbar navbar-default'>
                        <div className='container-fluid'>
                            <NavbarBrand />

                            <div
                                id='bs-example-navbar-collapse-1'
                                className='collapse navbar-collapse'>
                                <UserPanel name={name} logined={logined} setLogined={setLogined} fetching={fetching} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    }
}


function mapStateToProps (state) {
    return {
        user: state.user,
        page: state.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);