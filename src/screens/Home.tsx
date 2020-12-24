import React, {useContext, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Container, Footer, FooterTab, Text} from 'native-base';
import {StackParamList, HomeContext, HomeContextType} from '../../App';
import ProfileList from '../components/ProfileList';
import ProfileService from '../services/ProfileService';
import Profile from '../models/Profile';

/**
 * Returns a `Profile` with some default details.
 *
 * @param id the ID of the profile to be generated
 */
const defaultProfile = (id: number): Profile => ({
  id,
  fullName: 'John Doe',
  username: 'jdoe',
  sex: 'Male',
  email: 'jdoe@gmail.com',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  phoneNumber: '',
  description: '',
  dateOfBirth: new Date(2000, 0, 1),
  countryOfOrigin: 'Austria',
});

export type HomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Home'
>;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  // "React context is a poor man's Redux"
  const context = useContext(HomeContext) as HomeContextType;
  const {profiles, setProfiles} = context;

  // every time this component is re-rendered (i.e. when some state changes),
  // it will refresh the profiles (async'ly) by getting it from the service.
  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await ProfileService.getAllProfiles();
      setProfiles(data);
    };
    fetchProfiles();
  });

  // add a profile with default details and a new distinct (hopefully) ID
  const addProfile = () => {
    const lastProfile = profiles[profiles.length - 1];
    const lastProfileId = lastProfile ? lastProfile.id : 0;
    ProfileService.addProfile(defaultProfile(lastProfileId + 1));
  };

  return (
    <Container>
      <ProfileList profiles={profiles} navigation={navigation} />
      <Footer>
        <FooterTab>
          <Button onPress={() => navigation.navigate('About')}>
            <Text>About</Text>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={addProfile}>
            <Text>Add profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default HomeScreen;
