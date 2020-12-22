import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type DateSelectionType = Date | undefined;

export const DateOfBirthPicker = () => {
  const [date, setDate] = useState<Date>(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate: DateSelectionType) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
