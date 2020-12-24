import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, ListItem, Right, Body} from 'native-base';
import Profile from '../models/Profile';
import {HomeScreenNavigationProp} from '../screens/Home';
import {ScrollView} from 'react-native-gesture-handler';

const stringTruncated = (str: string, maxLen: number) => {
  const dots = str.length > maxLen ? '...' : '';
  return str.substring(0, maxLen) + dots;
};

interface ProfileListItemProps {
  navigation: HomeScreenNavigationProp;
  profile: Profile;
}

const ProfileListItem = ({navigation, profile}: ProfileListItemProps) => {
  const {
    fullName,
    description,
    id,
    sex,
    dateOfBirth,
    countryOfOrigin,
  } = profile;
  const getAge = (dob: Date) => {
    const today = new Date();
    return today.getFullYear() - new Date(dob).getFullYear();
  };
  return (
    <View>
      <ListItem onPress={() => navigation.navigate('ProfileEdit', {profile})}>
        <Body>
          <Text style={styles.largeFont}>
            {fullName}
            <Text note>{`  ${sex}, ${getAge(
              dateOfBirth,
            )}, ${countryOfOrigin}`}</Text>
          </Text>
          <Text note>{stringTruncated(description, 70)}</Text>
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
}

const ProfileList = ({navigation, profiles}: Props) => {
  return (
    <ScrollView>
      {profiles.map((profile, index) => (
        <ProfileListItem
          profile={profile}
          key={index}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  largeFont: {
    fontSize: 20,
  },
});

export default ProfileList;
