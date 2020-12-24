import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../models/Profile';

/**
 * This service class abstracts **asynchronous** CRUD functionality on
 * `Profile`s. As of now it is backed by local storage; it does not send HTTP
 * requests to a server.
 */
class ProfileService {
  /**
   * Get all existing profiles as a list of `Profile`s.
   */
  async getAllProfiles() {
    const allKeys = await AsyncStorage.getAllKeys();
    const allProfiles = await AsyncStorage.multiGet(allKeys);
    const allNonNullProfiles = allProfiles.filter(([_k, v]) => v !== null) as [
      string,
      string,
    ][];
    const result: Profile[] = allNonNullProfiles.map(([_k, v]) =>
      JSON.parse(v),
    );
    return result;
  }

  /**
   * Delete all existing profiles.
   */
  async deleteAllProfiles() {
    const allKeys = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiRemove(allKeys);
  }

  /**
   * Add a new `Profile` to store, if the ID was already associated with a
   * `Profile`, that `Profile` will be overridden. Hence this function also
   * fucntions as an `updateProfile`.
   *
   * @param profile the `Profile` to be added, *must be serializable to JSON*.
   */
  async addProfile(profile: Profile) {
    const json = JSON.stringify(profile);
    return await AsyncStorage.setItem(profile.id.toString(), json);
  }

  /**
   * Delete the `Profile` associated with the given ID. If the
   * given ID is not associated with a `Profile`, this is a no-op.
   *
   * @param id the ID of the `Profile` to be deleted
   */
  async deleteProfile(id: number) {
    return await AsyncStorage.removeItem(id.toString());
  }

  /**
   * Get the `Profile` associated with the given ID, and return it serialized
   * as a JSON string (wrapped in a `Promise`). If the given ID is not
   * associated with a profile, then this will return `null` (again, wrapped
   * in a `Promise`).
   *
   * @param id the ID of the `Profile` to be retrieved
   */
  async getProfileById(id: number): Promise<string | null> {
    return await AsyncStorage.getItem(id.toString());
  }
}

export default new ProfileService();
