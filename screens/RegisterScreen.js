import React, { useLayoutEffect, useState } from 'react'
import { StatusBar, View, KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    console.log(email);
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
        photoURL: imageUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      });
    })
    .catch((error) => alert(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Login', // This only appears in iOS
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      style={styles.container}
    >
      <StatusBar style="light"/>

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account 
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Profile picture url (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        onPress={register}
        title="Register"
        raised
        containerStyle={styles.button}
      />
    </KeyboardAvoidingView>
  )
};


export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
