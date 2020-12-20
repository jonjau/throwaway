import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text, View} from 'native-base';
import {StackParamList} from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        <Text>Go to Details</Text>
      </Button>
    </View>
  );
}

export default HomeScreen;