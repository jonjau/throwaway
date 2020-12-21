import {RouteProp} from '@react-navigation/native';
import {View, Form, Input, Item, Label} from 'native-base';
import React, {useContext} from 'react';
import {HomeContext, StackParamList, HomeContextType} from '../../App';
import Profile from '../models/Profile';
import ProfileService from '../services/ProfileService';

type ProfileEditScreenRouteProp = RouteProp<StackParamList, 'ProfileEdit'>;
type Props = {
  route: ProfileEditScreenRouteProp;
};

const ProfileEditScreen = ({route}: Props) => {
  const context = useContext(HomeContext) as HomeContextType;
  const {profiles, setProfiles} = context;
  const {profile} = route.params;

  const updateProfile = (updatedProfile: Profile) => {
    ProfileService.addProfile(updatedProfile);
  }

  return (
    <View>
      <Form>
        <Item stackedLabel>
          <Label>Username</Label>
          <Input
            defaultValue={profile.username}
            onChangeText={(username) => updateProfile({...profile, username})}
          />
        </Item>
      </Form>
    </View>
  );
};

export default ProfileEditScreen;
