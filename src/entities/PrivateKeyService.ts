// Errors
import {
  DecryptionError,
  EncryptionError,
  InvalidPasswordError,
} from '../errors';

// Utils
import { fromHexString, toHexString } from '../utils';

// Types
import { IBaseOptions, ILogger } from '../types';

export default class PrivateKeyService {
  // private variables
  private readonly ivSize: number = 16;
  private readonly iterations: number = 2500000;
  private readonly logger: ILogger | null;
  private readonly passwordTagKeyName: string = 'agora_wallet_pks_password_tag';
  private readonly privateKeyNamePrefix: string = 'agora_wallet_pks_account_';
  private readonly saltSize: number = 64;
  private readonly versionKeyName: string = 'agora_wallet_pks_version';

  // public variables
  public readonly name: string = 'PrivateKeyService';
  public readonly version: number = 0;

  constructor(options: IBaseOptions) {
    this.logger = options?.logger || null;
  }

  /**
   * Private functions
   */

  private async createDeriveKeyFromPassword(
    password: string,
    salt: Uint8Array
  ): Promise<CryptoKey> {
    const encoder: TextEncoder = new TextEncoder();
    const baseKey: CryptoKey = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return await window.crypto.subtle.deriveKey(
      {
        hash: 'SHA-512',
        iterations: this.iterations,
        name: 'PBKDF2',
        salt,
      },
      baseKey,
      {
        length: 256,
        name: 'AES-GCM',
      },
      false,
      ['decrypt', 'encrypt']
    );
  }

  /**
   * Decrypts some data using the supplied password.
   * @param {string} encryptedData - the encrypted data as hex string.
   * @param {string} password - the password used to decrypt the data.
   * @returns {string} the decrypted data.
   * @throws {DecryptionError} If the encrypted data is malformed, or the password is invalid.
   * @private
   */
  private async decrypt(
    encryptedData: string,
    password: string
  ): Promise<string> {
    const iv: Uint8Array = fromHexString(
      encryptedData.substring(0, this.ivSize)
    );
    let decoder: TextDecoder;
    let derivedKey: CryptoKey;
    let decryptedData: ArrayBuffer;
    let salt: Uint8Array;

    if (!iv || iv.length !== this.ivSize) {
      throw new DecryptionError('invalid initial vector');
    }

    salt = fromHexString(encryptedData.substring(this.ivSize, this.saltSize));

    if (!salt || salt.length !== this.saltSize) {
      throw new DecryptionError('invalid salt');
    }

    derivedKey = await this.createDeriveKeyFromPassword(password, salt);

    try {
      decryptedData = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        derivedKey,
        fromHexString(encryptedData.substring(this.ivSize + this.saltSize))
      );
    } catch (error) {
      this.logger &&
        this.logger.debug(`${this.name}#decrypt(): ${error.message}`);

      throw new DecryptionError(error.message);
    }

    decoder = new TextDecoder();

    return decoder.decode(decryptedData);
  }

  /**
   * Encrypts some data using the supplied password.
   * @param {string} password - the password used to encrypt the data.
   * @param {string} data - the data to encrypt.
   * @throws {EncryptionError} If the data to be encrypted exceeds 2^39−256 bytes.
   * @private
   */
  private async encrypt(password: string, data: string): Promise<string> {
    const encoder: TextEncoder = new TextEncoder();
    const iv: Uint8Array = this.generateRandomBytes(this.ivSize);
    const salt: Uint8Array = this.generateRandomBytes(this.saltSize);
    const derivedKey: CryptoKey = await this.createDeriveKeyFromPassword(
      password,
      salt
    );
    let encryptedData: ArrayBuffer;

    try {
      encryptedData = await window.crypto.subtle.encrypt(
        {
          name: '',
          iv,
        },
        derivedKey,
        encoder.encode(data)
      );
    } catch (error) {
      this.logger &&
        this.logger.error(`${this.name}#encrypt(): ${error.message}`);

      throw new EncryptionError(error.message);
    }

    return (
      toHexString(iv) +
      toHexString(salt) +
      toHexString(new Uint8Array(encryptedData))
    );
  }

  /**
   * Convenience function that generates a random amount of bytes.
   * @param {number} size - [optional] the number of random bytes to generate. Defaults to 32.
   * @returns {Uint8Array} random bytes defined by the size.
   * @private
   */
  private generateRandomBytes(size: number = 32): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(size));
  }

  /**
   * Convenience function that just gets the value stored in storage for a given key.
   * @param {string} key - the key of the value to get.
   * @returns {string | null} the value of the item stored with the key, or null if no key/value exists.
   * @private
   */
  private async getItem(key: string): Promise<string | null> {
    const item: Record<string, string> = await browser.storage.local.get(key);

    return item[key] || null;
  }

  /**
   * Gets all the encrypted private keys in storage.
   * @returns {Record<string, string>>} all the encrypted private keys.
   * @private
   */
  private async getEncryptedPrivateKeys(): Promise<Record<string, string>> {
    const items: Record<string, string> = await browser.storage.local.get();

    return Object.keys(items).reduce(
      (acc, key) =>
        key.startsWith(this.privateKeyNamePrefix)
          ? { ...acc, [key]: items[key] }
          : acc,
      {}
    );
  }

  /**
   * Public functions
   */

  /**
   * Gets the decrypted private key from local storage.
   * @param {string} publicKey - the public key of the private key.
   * @param {string} password - the password used to encrypt the private key.
   * @returns {string | null} the decrypted private key, or null if no private key is stored.
   * @throws {InvalidPasswordError} If the password is invalid.
   * @throws {DecryptionError} If there was a problem with the decryption.
   */
  public async getPrivateKey(
    publicKey: string,
    password: string
  ): Promise<string | null> {
    const isPasswordValid: boolean = await this.verifyPassword(password);
    let encryptedPrivateKey: string | null;

    if (!isPasswordValid) {
      this.logger &&
        this.logger.debug(`${this.name}#getPrivateKey(): password is invalid`);

      throw new InvalidPasswordError();
    }

    encryptedPrivateKey = await this.getItem(
      `${this.privateKeyNamePrefix}${publicKey}`
    );

    if (!encryptedPrivateKey) {
      this.logger &&
        this.logger.debug(
          `${this.name}#getPrivateKey(): no private key stored for public key "${publicKey}"`
        );

      return null;
    }

    this.logger &&
      this.logger.debug(
        `${this.name}#getPrivateKey(): decrypting private key for public key "${publicKey}"`
      );

    return await this.decrypt(password, encryptedPrivateKey);
  }

  /**
   * Gets a list of all the public keys.
   * @returns {string[]} a list of all the public keys. This returns an empty list if the private key storage has not
   * been initialized.
   */
  public async getPublicKeys(): Promise<string[]> {
    const isInitialized: boolean = await this.isInitialized();
    let encryptedPrivateKeys: Record<string, string>;

    if (!isInitialized) {
      this.logger &&
        this.logger.debug(
          `${this.name}#getPublicKeys(): private key service has not been initialized`
        );

      return [];
    }

    encryptedPrivateKeys = await this.getEncryptedPrivateKeys();

    return Object.keys(encryptedPrivateKeys).map((key) =>
      key.replace(this.privateKeyNamePrefix, '')
    );
  }

  /**
   * Simply checks if the private key store has been initialized. The definition of "initialized" is whether there is
   * an encrypted password tag present.
   * @returns {boolean} true if the private key store has been initialized, false otherwise.
   */
  public async isInitialized(): Promise<boolean> {
    const encryptedPasswordTag: string | null = await this.getItem(
      this.passwordTagKeyName
    );

    return !!encryptedPasswordTag;
  }

  /**
   * Removes all private keys and the password tag from local storage.
   */
  public async reset(): Promise<void> {
    const items: Record<string, unknown> = await browser.storage.local.get();
    const filteredKeyNames: string[] = Object.keys(items).filter((value) =>
      value.startsWith(this.privateKeyNamePrefix)
    );

    await browser.storage.local.remove([
      ...filteredKeyNames,
      this.passwordTagKeyName, // remove the password tag too
    ]);
  }

  /**
   * Sets the private key into local storage, encrypted, using the password.
   * @param {string} publicKey - used in the key name of the key/value pair.
   * @param {string} privateKey - the unencrypted private key to store.
   * @param {string} password - the password used to initialize the private key storage.
   * @throws {InvalidPasswordError} If the password is invalid.
   * @throws {EncryptionError} If there was a problem with the encryption.
   */
  public async setPrivateKey(
    publicKey: string,
    privateKey: string,
    password: string
  ): Promise<void> {
    const isPasswordValid: boolean = await this.verifyPassword(password);
    let encryptedPrivateKey: string;

    if (!isPasswordValid) {
      this.logger &&
        this.logger.debug(`${this.name}#setPrivateKey(): password is invalid`);

      throw new InvalidPasswordError();
    }

    this.logger &&
      this.logger.debug(
        `${this.name}#setPrivateKey(): encrypting private key for public key "${publicKey}"`
      );

    encryptedPrivateKey = await this.encrypt(password, privateKey);

    this.logger &&
      this.logger.debug(
        `${this.name}#setPrivateKey(): storing private key for public key "${publicKey}"`
      );

    return await browser.storage.local.set({
      [`${this.privateKeyNamePrefix}${publicKey}`]: encryptedPrivateKey,
    });
  }

  /**
   * Changes the current password to the new password. If the storage has not been initialized, a new password is set.
   *
   * NOTE: the new password will re-encrypt all private keys.
   * @param {string} newPassword - the new password.
   * @param {string} currentPassword - [optional] the current password.
   * @throws {InvalidPasswordError} if the private key storage has been initialized and the current password is invalid.
   */
  public async setPassword(
    newPassword: string,
    currentPassword?: string
  ): Promise<void> {
    const encryptedPasswordTag: string = await this.encrypt(
      newPassword,
      browser.runtime.id
    ); // encrypt the password tag (the extension id) with the new password
    const isInitialized: boolean = await this.isInitialized();
    let encryptedPrivateKeys: Record<string, string>;
    let isPasswordValid: boolean;
    let newEncryptedPrivateKeys: Record<string, string>;

    // if no password exists, we can just set the new one
    if (!isInitialized) {
      this.logger &&
        this.logger.debug(
          `${this.name}#setPassword(): private key service has not been initialized, removing any previous private keys`
        );

      await this.reset(); // first remove any previously saved private keys

      this.logger &&
        this.logger.debug(
          `${this.name}#setPassword(): saving new password tag to storage`
        );

      return await browser.storage.local.set({
        [this.passwordTagKeyName]: encryptedPasswordTag,
        [this.versionKeyName]: this.version, // set the version
      });
    }

    // if we have a password tag stored and no password, throw an error
    if (!currentPassword) {
      this.logger &&
        this.logger.debug(
          `${this.name}#setPassword(): private key service has been initialized but no password was supplied to validate`
        );

      throw new InvalidPasswordError();
    }

    isPasswordValid = await this.verifyPassword(currentPassword);

    if (!isPasswordValid) {
      this.logger &&
        this.logger.debug(
          `${this.name}#setPassword(): private key service has been initialized but supplied password is invalid`
        );

      throw new InvalidPasswordError();
    }

    this.logger &&
      this.logger.debug(
        `${this.name}#setPassword(): re-encrypting private keys`
      );

    encryptedPrivateKeys = await this.getEncryptedPrivateKeys();
    newEncryptedPrivateKeys = {};

    // with a new password, we need to re-encrypt all the private keys
    await Promise.all(
      Object.keys(encryptedPrivateKeys).map(async (key) => {
        const encryptedPrivateKey: string = encryptedPrivateKeys[key];
        const decryptedPrivateKey: string = await this.decrypt(
          currentPassword,
          encryptedPrivateKey
        );

        newEncryptedPrivateKeys[key] = await this.encrypt(
          newPassword,
          decryptedPrivateKey
        );
      })
    );

    this.logger &&
      this.logger.debug(
        `${this.name}#setPassword(): saving new password tag and re-encrypted keys to storage`
      );

    // add the new password tag and the re-encrypted keys
    return await browser.storage.local.set({
      [this.passwordTagKeyName]: encryptedPasswordTag,
      ...newEncryptedPrivateKeys,
    });
  }

  /**
   * Verifies if the supplied password is valid. This function fetches the encrypted password tag, i.e. the encrypted
   * extension ID, from storage and decrypts it using the supplied password. If the decryption is successful, the
   * password is valid.
   * @param {string} password - the password to verify.
   * @returns {boolean} true if the password is valid, false otherwise.
   */
  public async verifyPassword(password: string): Promise<boolean> {
    const encryptedPasswordTag: string | null = await this.getItem(
      this.passwordTagKeyName
    );
    let decryptedPasswordTag: string;

    // if we have the decrypted password tag, decrypt it and check it matches the extension id
    if (encryptedPasswordTag) {
      this.logger &&
        this.logger.debug(
          `${this.name}#setPassword(): password tag found, attempting to validate`
        );

      try {
        decryptedPasswordTag = await this.decrypt(
          password,
          encryptedPasswordTag
        );
      } catch (error) {
        this.logger &&
          this.logger.debug(
            `${this.name}#verifyPassword(): failed to decrypt password tag`
          );

        return false;
      }

      return decryptedPasswordTag === browser.runtime.id;
    }

    return false;
  }
}
