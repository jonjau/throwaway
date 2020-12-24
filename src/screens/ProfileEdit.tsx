import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Form,
  Input,
  Item,
  Label,
  Button,
  Text,
  Picker,
  Textarea,
  Container,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StackParamList} from '../../App';
import {COUNTRIES} from '../constants';
import Profile from '../models/Profile';
import ProfileService from '../services/ProfileService';
import {ScrollView} from 'react-native-gesture-handler';

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
    <Container>
      <ScrollView>
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
            <Label>Full name</Label>
            <Input
              defaultValue={profile.fullName}
              onChangeText={(fullName) => setProfile({...profile, fullName})}
            />
          </Item>
          <Item fixedLabel>
            <Label>Address line 1</Label>
            <Input
              defaultValue={profile.addressLine1}
              onChangeText={(addressLine1) =>
                setProfile({...profile, addressLine1})
              }
            />
          </Item>
          <Item fixedLabel>
            <Label>Address line 2</Label>
            <Input
              defaultValue={profile.addressLine2}
              onChangeText={(addressLine2) =>
                setProfile({...profile, addressLine2})
              }
            />
          </Item>
          <Item fixedLabel>
            <Label>Address line 3</Label>
            <Input
              defaultValue={profile.addressLine3}
              onChangeText={(addressLine3) =>
                setProfile({...profile, addressLine3})
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
            <Label>Country of origin</Label>
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
          <DateOfBirthPicker profile={profile} setProfile={setProfile} />
          <Textarea
            rowSpan={6}
            onChangeText={(description) =>
              setProfile({...profile, description})
            }
            defaultValue={profile.description}
            placeholder="Description"
          />
        </Form>
        <Button
          block
          onPress={() => {
            deleteThisProfile().then(() => navigation.navigate('Home'));
          }}>
          <Text>Delete this profile</Text>
        </Button>
      </ScrollView>
    </Container>
  );
};

export default ProfileEditScreen;
