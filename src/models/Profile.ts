// TODO: dateOfBirth, fullName
export default interface Profile {
  id: number;
  username: string;
  sex: 'Male' | 'Female';
  dateOfBirth: Date;
  countryOfOrigin: string;
  email: string;
  phoneNumber: string;
  description: string;
}
