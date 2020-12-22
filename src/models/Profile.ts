// TODO: dateOfBirth
export default interface Profile {
  id: number;
  username: string;
  sex: 'Male' | 'Female';
  email: string;
  phoneNumber: string;
  description: string;
}
