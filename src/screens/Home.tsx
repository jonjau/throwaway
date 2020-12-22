import React, {useContext, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Container, Text} from 'native-base';
import {StackParamList, HomeContext, HomeContextType} from '../../App';
import ProfileList from './ProfileList';
import ProfileService from '../services/ProfileService';

export type HomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Home'
>;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  const context = useContext(HomeContext) as HomeContextType;
  const {profiles, setProfiles} = context;

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await ProfileService.getAllProfiles();
      setProfiles(data);
    };
    fetchProfiles();
  });
  return (
    <Container>
      {/* <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        <Text>Go to Details</Text>
      </Button>
      <Button
        onPress={() => navigation.navigate('ProfileEdit', {profile: hodl})}>
        <Text>Go to ProfileEdit</Text>
      </Button> */}
      <ProfileList
        profiles={profiles}
        setProfiles={setProfiles}
        navigation={navigation}
      />
    </Container>
  );
};

export default HomeScreen;
