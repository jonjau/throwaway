import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../models/Profile';

class ProfileService {
  async getAllProfiles() {
    const allKeys = await AsyncStorage.getAllKeys();
    const allProfiles = await AsyncStorage.multiGet(allKeys);
    const x = allProfiles.filter(([_k, v]) => v !== null) as [string, string][];
    const y: Profile[] = x.map(([_k, v]) => JSON.parse(v));
    return y;
  }

  async deleteAllProfiles() {
    const allKeys = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiRemove(allKeys);
  }

  async addProfile(profile: Profile) {
    const json = JSON.stringify(profile);
    return await AsyncStorage.setItem(profile.id.toString(), json);
  }
}

export default new ProfileService();
