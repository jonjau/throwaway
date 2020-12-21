import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, ListItem, Right, Body} from 'native-base';
import Profile from '../models/Profile';
import {HomeScreenNavigationProp} from './Home';
import ProfileService from '../services/ProfileService';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

interface ProfileItemProps {
  navigation: HomeScreenNavigationProp;
  profile: Profile;
}

const ProfileItem = ({navigation, profile}: ProfileItemProps) => {
  const {username, id} = profile;
  return (
    <View>
      <ListItem onPress={() => navigation.navigate('ProfileEdit', {profile})}>
        <Body>
          <Text>{username}</Text>
          <Text note>{username}</Text>
        </Body>
        <Right>
          <Text note>ID: {id}</Text>
        </Right>
      </ListItem>
    </View>
  );
};

interface Props {
  navigation: HomeScreenNavigationProp;
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
}

const ProfileList = ({navigation, profiles, setProfiles}: Props) => {
  const addProfile = () => {
    ProfileService.addProfile({username: '', id: profiles.length + 1});
  };

  const deleteAllProfiles = () => {
    ProfileService.deleteAllProfiles();
  };

  const getAllProfiles = async () => {
    return await ProfileService.getAllProfiles();
  };

  return (
    <View>
      <Text>Hello World</Text>
      <Button
        onPress={() => {
          // setProfiles([...profiles, {username: 'Sherman', id: 9}]);
          addProfile();
        }}>
        <Text>Add profile</Text>
      </Button>
      <Button
        onPress={async () => {
          console.log(await getAllProfiles());
        }}>
        <Text>Getall</Text>
      </Button>
      <Button onPress={deleteAllProfiles}>
        <Text>Reset</Text>
      </Button>
      {profiles.map((profile, index) => (
        <ProfileItem profile={profile} key={index} navigation={navigation} />
      ))}
    </View>
  );
};

export default ProfileList;
