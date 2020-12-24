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
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './src/screens/Home';
import Profile from './src/models/Profile';
import ProfileEditScreen from './src/screens/ProfileEdit';
import AboutScreen from './src/screens/About';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();
export type StackParamList = {
  Home: undefined;
  About: undefined;
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
          <Stack.Screen name="About" component={AboutScreen} />
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
  );
};

export default App;
