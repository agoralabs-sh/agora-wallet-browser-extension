import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

import { NETWORK_TRANSACTION_PARAMS_ITEM_KEY_PREFIX } from '@extension/constants';

// enums
import { NetworksThunkEnum } from '@extension/enums';

// services
import { StorageManager } from '@extension/services';

// types
import { ILogger } from '@common/types';
import {
  IMainRootState,
  INetworkWithTransactionParams,
  ITransactionParams,
} from '@extension/types';

// utils
import {
  convertGenesisHashToHex,
  selectNetworkFromSettings,
} from '@extension/utils';
import { updateTransactionParams } from '../utils';

const fetchTransactionParamsFromStorageThunk: AsyncThunk<
  INetworkWithTransactionParams[], // return
  undefined, // args
  Record<string, never>
> = createAsyncThunk<
  INetworkWithTransactionParams[],
  undefined,
  { state: IMainRootState }
>(
  NetworksThunkEnum.FetchTransactionParamsFromStorageThunk,
  async (_, { getState }) => {
    const logger: ILogger = getState().system.logger;
    const networks: INetworkWithTransactionParams[] = getState().networks.items;
    const online: boolean = getState().system.online;
    const selectedNetwork: INetworkWithTransactionParams | null =
      selectNetworkFromSettings(networks, getState().settings);
    const storageManager: StorageManager = new StorageManager();
    let storageItems: Record<string, unknown>;
    let updatedNetworks: INetworkWithTransactionParams[];

    logger.debug(
      `${NetworksThunkEnum.FetchTransactionParamsFromStorageThunk}: fetching transaction params from storage`
    );

    storageItems = await storageManager.getAllItems();

    updatedNetworks = Object.keys(storageItems).reduce<
      INetworkWithTransactionParams[]
    >((acc, key) => {
      let storedEncodedGenesisHash: string;
      let storedTransactionParams: ITransactionParams;

      // if this is not a network transaction params item, ignore
      if (!key.startsWith(NETWORK_TRANSACTION_PARAMS_ITEM_KEY_PREFIX)) {
        return acc;
      }

      storedEncodedGenesisHash = key.replace(
        NETWORK_TRANSACTION_PARAMS_ITEM_KEY_PREFIX,
        ''
      );
      storedTransactionParams = storageItems[key] as ITransactionParams;

      // only use the transaction params of the network config, if the stored transaction params are newer
      return acc.map<INetworkWithTransactionParams>((value) =>
        convertGenesisHashToHex(value.genesisHash).toUpperCase() ===
          storedEncodedGenesisHash &&
        storedTransactionParams.updatedAt > value.updatedAt
          ? {
              ...value,
              ...storedTransactionParams,
            }
          : value
      );
    }, networks);

    // if we are not online or there is no selected network, do not fetch the latest transaction params
    if (!online || !selectedNetwork) {
      return updatedNetworks;
    }

    // otherwise, update the transaction params
    return await Promise.all(
      updatedNetworks.map(async (value) =>
        value.genesisHash === selectedNetwork.genesisHash
          ? await updateTransactionParams(selectedNetwork, { logger })
          : value
      )
    );
  }
);

export default fetchTransactionParamsFromStorageThunk;
