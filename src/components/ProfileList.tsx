import React, {useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {Profile} from '../models/Profile';

const ProfileItem = ({username}: any) => (
  <View>
    <Text>{username}</Text>
  </View>
);

interface Props {
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
}

const ProfileList = ({profiles, setProfiles}: Props) => {
  const [counter, setCounter] = useState(0);

  const renderItem = ({item: profile}: {item: Profile}) => (
    <ProfileItem username={profile.username} />
  );

  return (
    <View>
      <Text>Hello World</Text>
      <FlatList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={(profile) => profile.id.toString()}
      />
      <Button title="Add profile" onPress={() => setProfiles([])} />
      <Text>{counter}</Text>
      <Button title="increment" onPress={() => setCounter(counter + 1)} />
    </View>
  );
};

export default ProfileList;
