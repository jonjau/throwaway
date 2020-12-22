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
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {StackParamList} from '../../App';
import {COUNTRIES} from '../constants';
import Profile from '../models/Profile';
import ProfileService from '../services/ProfileService';
import {Platform} from 'react-native';

type Props = {
  route: RouteProp<StackParamList, 'ProfileEdit'>;
  navigation: StackNavigationProp<StackParamList, 'ProfileEdit'>;
};

const ProfileEditScreen = ({route, navigation}: Props) => {
  const {profile: initialProfile} = route.params;
  const [profile, setProfile] = useState(initialProfile);
  const [date, setDate] = useState(new Date(initialProfile.dateOfBirth));
  const [show, setShow] = useState(false);

  useEffect(() => {
    updateProfile(profile);
  }, [profile]);

  const showDateTimePicker = () => {
    setShow(true);
  };

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
        <Item>
          <Label>Country of Origin</Label>
          <Picker
            selectedValue={profile.countryOfOrigin}
            onValueChange={(countryOfOrigin) => {
              setProfile({...profile, countryOfOrigin});
            }}>
            {COUNTRIES.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </Item>
        <Item fixedLabel onPress={() => showDateTimePicker()}>
          <Label>Date of birth</Label>
          <Input disabled>{date.toDateString()}</Input>
        </Item>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            locale="en"
            display="default"
            onChange={(_, dateOfBirth) => {
              const currentDate = dateOfBirth || date;
              setShow(Platform.OS === 'ios');
              setDate(currentDate);
              setProfile({...profile, dateOfBirth: currentDate});
            }}
          />
        )}
        <Textarea
          rowSpan={6}
          bordered
          onChangeText={(description) => setProfile({...profile, description})}
          defaultValue={profile.description}
          placeholder="Description"
        />
      </Form>
    </View>
  );
};

export default ProfileEditScreen;
