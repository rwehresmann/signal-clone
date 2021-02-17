import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { View, StyleSheet } from 'react-native'
import { Button, Image, Input } from "react-native-elements";
import logo from '../assets/signal-logo.png';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) navigation.replace("Home");
    });

    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"
    >
      <StatusBar style="light"/>

      <Image 
        source={logo}
        style={{width: 200, height: 200}}
      />

      <View style={styles.inputContainer}>
        <Input 
          placeholder="Email" 
          autoFocus 
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input 
          placeholder="Password" 
          secureTextEntry 
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button 
        title="Login"
        containerStyle={styles.button}
        onPress={signIn}
      />
      <Button 
        title="Register"
        containerStyle={styles.button}
        type="outline"
        onPress={() => navigation.navigate("Register")}
      />

      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
