import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

import firebase from 'firebase';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: []
    };

    const firbaseApp = firebase.initializeApp({
      apiKey: "AIzaSyBrDW6Npm3rJpx65T7BFfiQO7jCmHNOn_M",
      authDomain: "devhellchat.firebaseapp.com",
      databaseURL: "https://devhellchat.firebaseio.com",
      projectId: "devhellchat",
      storageBucket: "devhellchat.appspot.com",
      messagingSenderId: "692986478262"
    });

    const db = firebase.database();

    (async () => {
      let user = (await firebase.auth().signInWithEmailAndPassword('email', 'password')).user;

      let chat = db.ref('chats');

      chat.on('child_added', snapshot => {
        this.setState({
          chatList: [...this.state.chatList, snapshot.val()]
        });
      });
    })();

    // 채팅 보내기
    /* chat.push({
      userId : user.uid,
      name : user.displayName,
      userIconURL : `https://firebasestorage.googleapis.com/v0/b/devhellchat.appspot.com/o/icons%2F9Ctv37vbeQgvLIXdMkKNIW8eIEf2?alt=media&token=2291ea98-d8b5-4439-95ed-08dd076bf97c`,
      message : message,
      createTime : Date.now()
    }); */
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.chatList}
          renderItem={({item}) => <Text><Text>{item.name}</Text>  <Text>{item.message}</Text></Text>}
        />
        <TextInput
          style={{height: 50}}
          placeholder={'메시지 입력'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
});
