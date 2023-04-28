// Enums
import { ErrorCodeEnum } from '../enums';

// Errors
import BaseExtensionError from './BaseExtensionError';

export default class PrivateKeyAlreadyExistsError extends BaseExtensionError {
  public readonly code: ErrorCodeEnum =
    ErrorCodeEnum.PrivateKeyAlreadyExistsError;
  public readonly name: string = 'PrivateKeyAlreadyExistsError';
}
