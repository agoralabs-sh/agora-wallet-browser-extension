import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

// enums
import { CredentialLockActivationStateEnum } from '@extension/enums';
import { ThunkEnum } from '../enums';

// services
import CredentialLockService from '@extension/services/CredentialLockService';

// types
import type { IBaseAsyncThunkConfig, IMainRootState } from '@extension/types';

/**
 * Fetches the activated state. This just checks whether the credential lock alarm is active or not.
 */
const fetchActivatedThunk: AsyncThunk<
  CredentialLockActivationStateEnum | null, // return
  void, // args
  IBaseAsyncThunkConfig<IMainRootState>
> = createAsyncThunk<
  CredentialLockActivationStateEnum | null,
  void,
  IBaseAsyncThunkConfig<IMainRootState>
>(ThunkEnum.FetchActivated, async (_, { getState }) => {
  const logger = getState().system.logger;
  const enabled = getState().settings.security.enableCredentialLock;
  const duration = getState().settings.security.credentialLockTimeoutDuration;
  const credentialLockService = new CredentialLockService({
    logger,
  });
  const alarm = await credentialLockService.getAlarm();

  if (!enabled) {
    return null;
  }

  // if there is no alarm and the duration is not set to 0 ("never"), the lock is active
  return !alarm && duration > 0
    ? CredentialLockActivationStateEnum.Active
    : CredentialLockActivationStateEnum.Inactive;
});

export default fetchActivatedThunk;