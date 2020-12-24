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
  // DateOfBirthPicker's date gets initialized from the profile passed as a
  // prop, but manages its own date state from then on.
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
          onChange={(_, selectedDate) => {
            const dateOfBirth = selectedDate || date;
            setShow(Platform.OS === 'ios');
            // setDate seems redundant when we're also calling
            // setProfile each time, but letting the DateTimePicker's
            // value prop be profile.dateOfBirth led to errors...
            setDate(dateOfBirth);
            setProfile({...profile, dateOfBirth});
          }}
        />
      )}
    </>
  );
};

export default DateOfBirthPicker;
