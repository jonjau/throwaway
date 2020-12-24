import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screens/Home';
import Profile from './models/Profile';
import ProfileEditScreen from './screens/ProfileEdit';
import AboutScreen from './screens/About';

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
  // Global state stored here.
  const [profiles, setProfiles] = useState<Profile[]>([]);
  return (
    // Global state implicitly "passed down" to all components via context
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
