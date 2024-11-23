// errors
import { BaseExtensionError } from '@extension/errors';

// types
import type IBaseMessage from './IBaseMessage';

interface IBaseResponseMessage<Result, Reference, Error = BaseExtensionError>
  extends IBaseMessage<Reference> {
  error: Error | null;
  requestID: string;
  result: Result | null;
}

export default IBaseResponseMessage;
