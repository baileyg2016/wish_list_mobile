import React, { Component, useState } from 'react';
// import '../Login.css';
import { authService as auth } from '../_services/auth_user';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../_contexts/Contexts';

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#F3EBF6",
        // fontFamily: 'sans-serif',
        flex: 1,
        alignItems: 'center',
    },
    
    container: {
        backgroundColor: "#FFFFFF",
        marginTop: "35%",
        paddingTop: 30,
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
        width: "70%",
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
    forgotAndRegister: {
        // textShadow: 0px 0px 3px rgba(117, 117, 117, 0.12),
        color: "#E1BEE7",
        // paddingTop: 5,
        // top: 5
    },
});

const Register = (props: any) => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const register = (auth: any) => {
        if ((firstName || lastName || username || password) !== "") {
            auth.register(firstName, lastName, username, password);
        } else {
            setMsg("Please fill out every field");
        }
    }
    
    return (
        <AuthContext.Consumer>
            {auth => (
                <View style={styles.body}>
                    <View style={styles.container}>
                        <Text style={styles.body}>Create an Account</Text>
                        <Text>First Name</Text>
                        <TextInput
                            textContentType="name"
                            style={styles.input}
                            placeholder="Harry"
                            onChangeText={text => setFirstName(text)}
                            value={firstName} />
                        <Text>Last Name</Text>
                        <TextInput
                            textContentType="name"
                            style={styles.input}
                            placeholder="Potter"
                            onChangeText={text => setLastName(text)}
                            value={lastName} />
                        <Text>Email</Text>
                        <TextInput
                            textContentType="emailAddress"
                            style={styles.input}
                            placeholder="iHaveAHairyPotter@hogwarts.com"
                            onChangeText={text => setUsername(text)}
                            value={username} />
                        <Text>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            textContentType="password"
                            style={styles.input}
                            placeholder="Keep this a secret"
                            onChangeText={text => setPassword(text)}
                            value={password} />
                        <TextInput>{msg}</TextInput>
                        <Button color="#8C55AA" title="Create Account" onPress={() => register(auth)} />
                    </View>
                </View>
            )}
        </AuthContext.Consumer>
    );   
}

export default Register;