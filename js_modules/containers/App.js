import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FetchingBar from '../components/FetchingBar'
import NavbarBrand from '../components/NavbarBrand'
import UserPanel from '../components/UserPanel'
import * as userActions from '../actions/UserActions'
import * as fetchingBarActions from '../actions/FetchingBarActions'


 class App extends Component {
    render() {
        const { name, logined } = this.props.user;
        const { setLogined } = this.props.userActions;
        const { fetching } = this.props.fetchingBar;
        const { setFetchingBarState } = this.props.fetchingBarActions;

        return <header>
            <FetchingBar fetchClass={fetching} ref='fetching' />
            <div className='row'>
                <div className='col-md-12'>
                    <div className='navbar navbar-default'>
                        <div className='container-fluid'>
                            <NavbarBrand />

                            <div
                                id='bs-example-navbar-collapse-1'
                                className='collapse navbar-collapse'>
                                <UserPanel name={name} logined={logined} setLogined={setLogined} setFetchingBarState={setFetchingBarState} />
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
        page: state.page,
        fetchingBar: state.fetchingBar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        fetchingBarActions: bindActionCreators(fetchingBarActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);