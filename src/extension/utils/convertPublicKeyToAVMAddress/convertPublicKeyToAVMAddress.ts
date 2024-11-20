import { encodeAddress } from 'algosdk';

// repositories
import AccountRepository from '@extension/repositories/AccountRepository';

/**
 * Convenience function that simply converts a public key to a base32 encoded AVM address.
 * @param {Uint8Array | } publicKey - A raw or hexadecimal encoded public key.
 * @returns {string} A base32 encoded AVM address derived from a public key.
 */
export default function convertPublicKeyToAVMAddress(
  publicKey: Uint8Array | string
): string {
  if (typeof publicKey === 'string') {
    return encodeAddress(AccountRepository.decode(publicKey));
  }

  return encodeAddress(publicKey);
}
