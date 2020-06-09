import axios from 'axios';
import { Link, useHistory } from 'react-router-native';
import React, { Component, useState } from 'react';
// import '../Login.css';
import { authenticationService as auth } from '../_services/auth_user';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#F3EBF6",
        fontFamily: 'sans-serif',
        flex: 1,
        alignItems: 'center',
    },
    
    main: {
        backgroundColor: "#FFFFFF",
        marginTop: "65%",
        paddingBottom: 30,
        alignItems: "center",
        width: "90%",
        // height: "400px",
        // margin: "auto",
        borderRadius: 25,
        // boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
    },

    title: {
        paddingTop: 40,
        color: "#8C55AA",
        // fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: 23,
    },
    
    input: {
        width: "50%",
        color: "#263238",
        fontWeight: "700",
        fontSize: 14,
        // color: 'black',
        // letterpacing: 1px,
        backgroundColor: "#e6e6e6",
        // opacity: 0.04,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        // border: "none",
        borderRadius: 20,
        // outline: "none",
        // boxSizing: "border-box",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
        marginTop: 15,
        marginBottom: 15,
        /* margin-left: 46px, */
        textAlign: "center",
        // marginBottom: 27,
        // font-family: 'Ubuntu', sans-serif,
    },
    
    // form.form1 {
    //     padding-top: 40px,
    // },
    
    // .pass {
    //     width: 76%,
    //     color: rgb(38, 50, 56),
    //     font-weight: 700,
    //     font-size: 14px,
    //     letter-spacing: 1px,
    //     background: rgba(136, 126, 126, 0.04),
    //     padding: 10px 20px,
    //     border: none,
    //     border-radius: 20px,
    //     outline: none,
    //     box-sizing: border-box,
    //     border: 2px solid rgba(0, 0, 0, 0.02),
    //     margin-bottom: 50px,
    //     /* margin-left: 46px, */
    //     text-align: center,
    //     margin-bottom: 27px,
    //     font-family: 'Ubuntu', sans-serif,
    // },
    
    
    // .un:focus, .pass:focus {
    //     border: 2px solid rgba(0, 0, 0, 0.18) !important,
        
    // },
    
    forgotAndRegister: {
        // textShadow: 0px 0px 3px rgba(117, 117, 117, 0.12),
        color: "#E1BEE7",
        // paddingTop: 5,
        // top: 5
    },
    
    // // a: {
    // //     // textShadow: "0px 0px 3px rgba(117, 117, 117, 0.12)",
    // //     color: "#E1BEE7",
    // //     textDecoration: "none"
    // // }
    
    // // @media (max-width: 600px) {
    // //     .main {
    // //         border-radius: "0px",
    // //     }
    // // }
});

export const Login = () => {
    const onClick = () => {
        // auth.login(username, password).then(() => {
        //     useHistory().push("/home")
        // })
        console.log("click")
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
            <View style={styles.body}>
                <View style={styles.main}>
                    <Text style={styles.title}>Log into your Wish List!</Text>
                    <TextInput
                        textContentType="username"
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={text => setUsername(text)}
                        value={username} />
                    <TextInput
                        secureTextEntry={true}
                        textContentType="password"
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <Button color="#8C55AA" title="Sign in" onPress={() => onClick}/>
                    <Link to={"/forgotPassword"}><Text style={styles.forgotAndRegister}>Forgot Password?</Text></Link>
                    <Link to={"/register"}><Text style={styles.forgotAndRegister}>Register</Text></Link>
                </View>
            </View>
        );
}