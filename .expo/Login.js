import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = ({ loggedInState, loggedInStates, setLoggedInState }) => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState("");
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (loggedInState === loggedInStates.LOGGED_IN) {
      navigation.replace('Navigation');
    }
  }, [loggedInState, loggedInStates, navigation]);

  const handleSendButtonPress = async () => {
    setMessage('Hello Ian');
    console.log(`${phoneNumber} Button was pressed`);

    // You can perform additional validation here before sending the request
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    try {
      const sendTextResponse = await fetch('https://dev.stedi.me/twofactorlogin/' + phoneNumber, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/text'
        }
      });

      if (sendTextResponse.status !== 200) {
        throw new Error('Invalid phone number');
      }

      setLoggedInState(loggedInStates.LOGGING_IN);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLoginButtonPress = async () => {
    console.log(`${phoneNumber} Button was pressed`);

    // Additional validation before sending login request
    if (!phoneNumber || !oneTimePassword) {
      Alert.alert('Error', 'Please enter phone number and one-time password');
      return;
    }

    try {
      const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber,
          oneTimePassword
        })
      });

      if (loginResponse.status === 200) {
        const sessionToken = await loginResponse.text();
        console.log('sessionToken in Login Button', sessionToken);
        await AsyncStorage.setItem('sessionToken', sessionToken);
        navigation.replace('Navigation');
      } else {
        throw new Error('Invalid login information');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      setLoggedInState(loggedInStates.NOT_LOGGED_IN);
    }
  };

  if (loggedInState === loggedInStates.NOT_LOGGED_IN) {
    return (
      <View style={styles.allBody}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          backgroundColor='#e6f0d5'
          placeholderTextColor='#818181'
          placeholder='Cell Phone'
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendButtonPress}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>

        {/* Displaying the message */}
        <Text>{message}</Text>
      </View>
    );
  } else if (loggedInState === loggedInStates.LOGGING_IN) {
    return (
      <View style={styles.allBody}>
        <TextInput
          value={oneTimePassword}
          onChangeText={setOneTimePassword}
          style={styles.input}
          placeholderTextColor='#818181'
          backgroundColor='#e6f0d5'
          placeholder='One Time Password'
          keyboardType='numeric'
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginButtonPress}
        >
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    // Should never reach here
    return (
      <View>
        <Text>Logged in</Text>
      </View>
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  allBody: {
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    height: 45,
    marginTop: 25,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: '#A0CE4E',
    padding: 10,
    marginTop: 8,
    borderRadius: 10
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#A0CE4E',
    padding: 10,
    marginTop: 8,
    borderRadius: 10
  },
  title: {
    textAlign: "center",
    color: '#A0CE4E',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 35
  },
});
