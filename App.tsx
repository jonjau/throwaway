/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Route,
} from 'react-native';
import {
  Root,
  Body,
  Container,
  Header,
  Right,
  Title,
  Button,
  Text,
} from 'native-base';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProfileList from './src/screens/ProfileList';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './src/screens/Home';
import Profile from './src/models/Profile';
import ProfileEditScreen from './src/screens/ProfileEdit';
import ProfileService from './src/services/ProfileService';

declare const global: {HermesInternal: null | {}};

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
export type StackParamList = {
  Home: undefined;
  Details: undefined;
  ProfileEdit: {
    profile: Profile;
  };
};

export interface HomeContextType {
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
}
export const HomeContext = React.createContext<HomeContextType | null>(null);

const App = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  return (
    <HomeContext.Provider value={{profiles, setProfiles}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Throwaway Account Manager'}}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="ProfileEdit"
            component={ProfileEditScreen}
            options={({route}) => {
              if (route.params) {
                const profile = (route.params as {profile: Profile}).profile;
                return {
                  title: `Editing profile ${profile.id}: ${profile.username}`,
                };
              }
              return {title: 'Editing profile'};
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </HomeContext.Provider>
    /* <Root>
        <Container>
          <Header>
            <StatusBar barStyle="light-content" />
            <Body>
              <Title>Throwaway Account Manager</Title>
            </Body>
            <Right />
          </Header>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Accounts</Text>
                  <ProfileList profiles={profiles} setProfiles={setProfiles} />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Container>
      </Root> */
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
