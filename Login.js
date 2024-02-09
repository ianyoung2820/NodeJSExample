import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Login(props){
    return(
        <View style={styles.login}>
            <Text>This is the Login Screen</Text>
            <Button title="Log In David" onPress={()=>{
                console.log('Hello David!')
            }}></Button>
            <Button title="Log In Mosiah" onPress={()=>{
                console.log('Hello Mosiah!')
            }}></Button>
            <Button title="Log In Ryan" onPress={()=>{
                console.log('Hello Ryan!')
            }}></Button>
            <Button title="Log In" onPress={()=>{
                console.log('Hello Ian!')
            }}></Button>
            
        </View>

    );
}

const styles = StyleSheet.create({
    login: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        height: '12%',
        alignItems: 'flex-end',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        
      },
})