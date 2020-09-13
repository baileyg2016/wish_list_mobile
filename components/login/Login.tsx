import React, { useState, FC } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../_contexts/Contexts';
import { useQuery } from '@apollo/client';
import { LOGIN } from '../../graphql/queries';

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#F3EBF6",
        // fontFamily: 'sans-serif',
        flex: 1,
        alignItems: 'center',
    },
    
    container: {
        backgroundColor: "#FFFFFF",
        marginTop: "45%",
        paddingBottom: 30,
        alignItems: "center",
        width: "90%",
        borderRadius: 25,
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
        backgroundColor: "#e6e6e6",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
    },
    forgotAndRegister: {
        // textShadow: 0px 0px 3px rgba(117, 117, 117, 0.12),
        color: "#E1BEE7",
        // paddingTop: 5,
        // top: 5
    },
});

export const Login: FC = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const { data, loading, error } = useQuery(LOGIN, {
        variables: { email, password }
    });

    const loginClick = (auth: any) => {
        auth.logIn(error, data);
    };
    
    return (
        <AuthContext.Consumer>
            {auth => (
                <View style={styles.body}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Log into your Wish List!</Text>
                        <Text style={{color: 'red'}}>{msg}</Text>
                        <TextInput
                            textContentType="emailAddress"
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                        <TextInput
                            secureTextEntry={true}
                            textContentType="password"
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                        <Button color="#8C55AA" title="Sign in" onPress={() => loginClick(auth)}/>
                        {/* <Text style={styles.forgotAndRegister}>Forgot Password?</Text> */}
                        <Text style={styles.forgotAndRegister} onPress={() => props.navigation.navigate("Register")}>Register</Text>
                    </View>
                </View>
            )}
        </AuthContext.Consumer>
    );
}