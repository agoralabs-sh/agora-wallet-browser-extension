import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { encodeAddress } from 'algosdk';
import { NavigateFunction } from 'react-router-dom';
import { sign } from 'tweetnacl';
import browser from 'webextension-polyfill';

// Constants
import {
  ACCOUNT_KEY_PREFIX,
  CREATE_PASSWORD_ROUTE,
} from '@extension/constants';

// Enums
import { RegisterThunkEnum } from '@extension/enums';

// Errors
import { BaseExtensionError, MalformedDataError } from '@extension/errors';

// Features
import { setError } from '@extension/features/application';
import { sendRegistrationCompletedThunk } from '@extension/features/messages';

// Services
import { PrivateKeyService, StorageManager } from '@extension/services';

// Types
import { ILogger } from '@common/types';
import {
  IAccount,
  INetwork,
  IPrivateKey,
  IRegistrationRootState,
} from '@extension/types';
import { ISaveCredentialsPayload } from '../types';

// Utils
import { initializeDefaultAccount } from '@extension/utils';

const saveCredentialsThunk: AsyncThunk<
  void, // return
  ISaveCredentialsPayload, // args
  Record<string, never>
> = createAsyncThunk<
  void,
  ISaveCredentialsPayload,
  { state: IRegistrationRootState }
>(
  RegisterThunkEnum.SaveCredentials,
  async ({ name, privateKey }, { dispatch, getState }) => {
    const logger: ILogger = getState().application.logger;
    const networks: INetwork[] = getState().networks.items;
    const navigate: NavigateFunction | null = getState().application.navigate;
    const password: string | null = getState().registration.password;
    let accounts: IAccount[];
    let address: string;
    let inputError: BaseExtensionError;
    let pksAccount: IPrivateKey | null;
    let privateKeyService: PrivateKeyService;
    let publicKey: Uint8Array;
    let storageManager: StorageManager;

    if (!password) {
      inputError = new MalformedDataError('no password found');

      logger.error(`${saveCredentialsThunk.name}: ${inputError.message}`);

      navigate && navigate(CREATE_PASSWORD_ROUTE);

      throw inputError;
    }

    try {
      logger.debug(`${saveCredentialsThunk.name}: inferring public key`);

      publicKey = sign.keyPair.fromSecretKey(privateKey).publicKey;
      privateKeyService = new PrivateKeyService({
        logger,
        passwordTag: browser.runtime.id,
      });
      address = encodeAddress(publicKey);

      logger.debug(
        `${saveCredentialsThunk.name}: saving private/public key pair for "${address}" to storage`
      );

      // reset any previous credentials, set the password and the account
      await privateKeyService.reset();
      await privateKeyService.setPassword(password);

      pksAccount = await privateKeyService.setPrivateKey(privateKey, password);
    } catch (error) {
      logger.error(`${saveCredentialsThunk.name}: ${error.message}`);

      dispatch(setError(error));

      throw error;
    }

    logger.debug(
      `${saveCredentialsThunk.name}: successfully saved credentials`
    );

    storageManager = new StorageManager();
    accounts = networks.map(
      (
        value // save a default account for each genesis hash
      ) =>
        initializeDefaultAccount({
          address,
          genesisHash: value.genesisHash,
          ...(pksAccount && {
            createdAt: pksAccount.createdAt,
          }),
          ...(name && {
            name,
          }),
        })
    );

    // save an account for each genesis hash to storage
    await storageManager.setItems(
      accounts.reduce(
        (acc, value) => ({
          ...acc,
          [`${ACCOUNT_KEY_PREFIX}${value.id}`]: value,
        }),
        {}
      )
    );

    logger.debug(
      `${saveCredentialsThunk.name}: saved accounts for "${address}" to storage`
    );

    // send a message that registration has been completed
    dispatch(sendRegistrationCompletedThunk());
  }
);

export default saveCredentialsThunk;
