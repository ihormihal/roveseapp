import { AsyncStorage, Alert } from 'react-native'

export default {
  getValue: async (key) => {
    try {
			await AsyncStorage.getItem(key);
		} catch (error) {
			Alert.alert("AsyncStorage error:", error.message)
		}
  },
  setValue : async (key, value) => {
    try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			Alert.alert("AsyncStorage error:", error.message)
		}
  },
}
