import React, {useState} from 'react';
import {Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Profile from '../models/Profile';
import {Input, Item, Label} from 'native-base';

interface DateOfBirthPickerProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const DateOfBirthPicker = ({profile, setProfile}: DateOfBirthPickerProps) => {
  const [date, setDate] = useState(new Date(profile.dateOfBirth));
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <Item fixedLabel onPress={() => showDatepicker()}>
        <Label>Date of birth</Label>
        <Input disabled>{date.toDateString()}</Input>
      </Item>
      {show && (
        <DateTimePicker
          value={date}
          maximumDate={new Date()}
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
    </>
  );
};

export default DateOfBirthPicker;
