import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Form,
  Input,
  Item,
  Label,
  Button,
  Text,
  Picker,
  Textarea,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StackParamList} from '../../App';
import Profile from '../models/Profile';
import ProfileService from '../services/ProfileService';

type Props = {
  route: RouteProp<StackParamList, 'ProfileEdit'>;
  navigation: StackNavigationProp<StackParamList, 'ProfileEdit'>;
};

const ProfileEditScreen = ({route, navigation}: Props) => {
  const {profile: initialProfile} = route.params;
  const [profile, setProfile] = useState(initialProfile);
  useEffect(() => {
    updateProfile(profile);
  }, [profile]);

  const updateProfile = (updatedProfile: Profile) => {
    return ProfileService.addProfile(updatedProfile);
  };
  const deleteThisProfile = () => {
    return ProfileService.deleteProfile(profile.id);
  };

  return (
    <View>
      <Button
        onPress={() => {
          deleteThisProfile().then(() => navigation.navigate('Home'));
        }}>
        <Text>Delete this</Text>
      </Button>
      <Button
        onPress={() => {
          console.log(profile);
        }}>
        <Text>Current</Text>
      </Button>
      <Form>
        <Item fixedLabel>
          <Label>Username</Label>
          <Input
            defaultValue={profile.username}
            onChangeText={(username) => setProfile({...profile, username})}
          />
        </Item>
        <Item fixedLabel>
          <Label>Email</Label>
          <Input
            defaultValue={profile.email}
            onChangeText={(email) => setProfile({...profile, email})}
          />
        </Item>
        <Item fixedLabel>
          <Label>Phone number</Label>
          <Input
            defaultValue={profile.phoneNumber}
            onChangeText={(phoneNumber) =>
              setProfile({...profile, phoneNumber})
            }
          />
        </Item>
        <Item fixedLabel>
          <Label>Sex</Label>
          <Picker
            selectedValue={profile.sex}
            onValueChange={(sex) => {
              setProfile({...profile, sex});
            }}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </Item>
      </Form>
      <Textarea
        rowSpan={6}
        bordered
        onChangeText={(description) => setProfile({...profile, description})}
        defaultValue={profile.description}
        placeholder="Description"
      />
    </View>
  );
};

export default ProfileEditScreen;
