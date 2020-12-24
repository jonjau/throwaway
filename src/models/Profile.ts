/**
 * Basic model for storing account details.
 */
export default interface Profile {
  id: number;
  username: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  sex: 'Male' | 'Female';
  dateOfBirth: Date;
  countryOfOrigin: string;
  email: string;
  phoneNumber: string;
  description: string;
}
