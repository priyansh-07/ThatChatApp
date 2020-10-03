import React, { Component, createContext } from 'react'

export const AuthContext = createContext();

export default class AuthContextProvider extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: true,
			userId: 'testUserId',
			test: 'testxyz'
		}

		this.toggleAuth = this.toggleAuth.bind(this);

	}
	
	toggleAuth() {
		this.setState({isAuthenticated: !this.state.isAuthenticated})
	}

	render() {
		return (
			<AuthContext.Provider value={{...this.state, toggleAuth: this.toggleAuth}}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
}
