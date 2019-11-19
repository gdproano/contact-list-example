/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

function Item({title}) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsList: [],
    };
  }

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
          const formattedContacts = contacts.map(
            ({id, givenName, phoneNumbers}) => {
              return {
                id,
                givenName,
                numbers: phoneNumbers,
              };
            },
          );
          console.warn('contacts: ', formattedContacts);
          this.setState({contactsList: formattedContacts});
        }
      });
    });
  }

  render() {
    const {contactsList} = this.state;
    return (
      <SafeAreaView>
        <FlatList
          data={contactsList}
          renderItem={({item}) => <Item title={item.givenName} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text>My Contacts</Text>}
        />
      </SafeAreaView>
    );
  }
}

export default App;
