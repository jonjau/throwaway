import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, ListItem, Right, Body} from 'native-base';
import Profile from '../models/Profile';

const ProfileItem = (profile: Profile) => {
  const {username, id} = profile;
  return (
    <View>
      <ListItem onPress={() => console.log('liop')}>
        <Body>
          <Text>{username}</Text>
          <Text note>{username}</Text>
        </Body>
        <Right>
          <Text note>{id}</Text>
        </Right>
      </ListItem>
    </View>
  );
};

interface Props {
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
}

const ProfileList = ({profiles, setProfiles}: Props) => {
  const [counter, setCounter] = useState(0);

  return (
    <View>
      <Text>Hello World</Text>
      {profiles.map((profile, index) => (
        <ProfileItem {...profile} key={index} />
      ))}
      <Button
        onPress={() =>
          setProfiles([...profiles, {username: 'Sherman', id: 9}])
        }>
        <Text>profiles</Text>
      </Button>
      <Text>{counter}</Text>
      <Button onPress={() => setCounter(counter + 1)}>
        <Text>counter</Text>
      </Button>
    </View>
  );
};

export default ProfileList;
