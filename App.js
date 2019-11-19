/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

class App extends React.Component {
  componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          // error
        } else {
          // contacts returned in Array
          console.warn('contacts: ', contacts);
        }
      });
    });
  }

  render() {
    return <Text>Hello, {this.props.name}</Text>;
  }
}

export default App;
