import { AsyncStorage } from 'react-native'

const set = async (k, v) => {
  try {
    await AsyncStorage.setItem(`@NakamotoWallet:${k}`, v)
  } catch (error) {
    console.log(error)
  }
}

const get = async (k) => {
  try {
    const value = await AsyncStorage.getItem(`@NakamotoWallet:${k}`)
    if (value !== null) {
      return value
    }
   } catch (error) {
     console.log(error)
   }
}

const del = async (k) => {
  try {
    await AsyncStorage.removeItem(`@NakamotoWallet:${k}`)
   } catch (error) {
     console.log(error)
   }
}

export {
  set,
  get,
  del
}
