import React from 'react';
import {View} from 'react-native';
import {Button, Text, ListItem, Right, Body} from 'native-base';
import Profile from '../models/Profile';
import {HomeScreenNavigationProp} from './Home';
import ProfileService from '../services/ProfileService';

interface ProfileItemProps {
  navigation: HomeScreenNavigationProp;
  profile: Profile;
}

const ProfileItem = ({navigation, profile}: ProfileItemProps) => {
  const {username, description, id} = profile;
  return (
    <View>
      <ListItem onPress={() => navigation.navigate('ProfileEdit', {profile})}>
        <Body>
          <Text>{username}</Text>
          <Text note>{description}</Text>
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
    const lastProfile = profiles[profiles.length - 1];
    const lastProfileId = lastProfile ? lastProfile.id : 0;
    ProfileService.addProfile({
      id: lastProfileId + 1,
      username: 'Joe',
      sex: 'Male',
      email: '',
      phoneNumber: '',
      description: '',
    });
  };

  const deleteAllProfiles = () => {
    ProfileService.deleteAllProfiles();
  };

  const getAllProfiles = async () => {
    return await ProfileService.getAllProfiles();
  };

  return (
    <View>
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
