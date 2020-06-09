import axios from 'axios';
import { Link } from 'react-router-native';
import React, { Component } from 'react';
// import '../Login.css';
// import { authenticationService as auth } from '../_services/auth_user';
import { View, Text } from 'react-native';

export default class Register extends Component<{}, {firstName: string, lastName: string, username: string, password: string, clicked: boolean}> {
    constructor(props: any) {
        super(props);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.register = this.register.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            clicked: false,
        }
    }

    setFirstName(event: any) {
        this.setState({firstName: event.target.value})
    }

    setLastName(event: any) {
        this.setState({lastName: event.target.value})
    }

    setUsername(event: any) {
        this.setState({username: event.target.value})
    }

    setPassword(event: any) {
        this.setState({password: event.target.value})
    }

    register() {
        this.setState({clicked: true});
        // auth.register(this.state.firstName, this.state.lastName, this.state.username, this.state.password)
        //     .then((resp) => {
        //         console.log(resp)
                
        //     })
        // this.setState({clicked: false});
    }
    render() {
        return (
            // <div className="main">
            //     <p className="sign">Sign in</p>
            //     <input className="un " type="text" placeholder="Johnny" value={this.state.firstName} onChange={this.setFirstName} />
            //     <input className="un " type="text" placeholder="Doe" value={this.state.lastName} onChange={this.setLastName} />
            //     <input className="un " type="text" placeholder="example@email.com" value={this.state.username} onChange={this.setUsername} />
            //     <input className="pass" type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}/>
            //     {
            //         !this.state.clicked 
            //         ? <div onClick={this.register}><a className="submit">Register</a></div>
            //         : <div>Adding {this.state.firstName}...</div>
            //     }
            // </div>
            <View>
                <Text>Register</Text>
            </View>
        );
    }
}