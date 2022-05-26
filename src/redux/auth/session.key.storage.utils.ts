import * as Keychain from 'react-native-keychain'


const TAG = 'storage/keychain'

interface SecureStorage {
  key: string
  value: string
  options?: Keychain.Options
}

export async function storeItem({ key, value, options = {} }: SecureStorage) {
  try {
    const result = await Keychain.setGenericPassword('CELO', value, {
      service: key,
      accessible: Keychain.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
      rules: Keychain.SECURITY_RULES.NONE,
      ...options,
    })
    if (result === false) {
      throw new Error('Store result false')
    }

    // check that we can correctly read the keychain before proceeding
    const retrievedResult = await retrieveStoredItem(key)
    if (retrievedResult !== value) {
      await removeStoredItem(key)

      console.log(`${TAG}@storeItem`,
        `Retrieved value for key '${key}' does not match stored value`
      )

      throw new Error(`Retrieved value for key '${key}' does not match stored value`)
    }

    return result
  } catch (error) {
    console.log(TAG, 'Error storing item', error, true, value)
    throw error
  }
}

export async function retrieveStoredItem(key: string, options: Keychain.Options = {}) {
  try {
    const item = await Keychain.getGenericPassword({
      service: key,
      ...options,
    })
    if (!item) {
      return null
    }
    return item.password
  } catch (error) {
    console.log(TAG, 'Error retrieving stored item', error, true)
    // throw error
  }
}

export async function removeStoredItem(key: string) {
  try {
    return Keychain.resetGenericPassword({
      service: key,
    })
  } catch (error) {
    console.log(TAG, 'Error clearing item', error, true)
    // throw error
  }
}
