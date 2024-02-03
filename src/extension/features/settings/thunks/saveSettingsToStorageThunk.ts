import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

// enums
import { NetworkTypeEnum, SettingsThunkEnum } from '@extension/enums';

// services
import SettingsService from '@extension/services/SettingsService';

// types
import type { ILogger } from '@common/types';
import type {
  IBaseAsyncThunkConfig,
  INetworkWithTransactionParams,
  ISettings,
} from '@extension/types';

// utils
import convertGenesisHashToHex from '@extension/utils/convertGenesisHashToHex';
import selectDefaultNetwork from '@extension/utils/selectDefaultNetwork';
import selectNetworkFromSettings from '@extension/utils/selectNetworkFromSettings';

const saveSettingsToStorageThunk: AsyncThunk<
  ISettings, // return
  ISettings, // args
  IBaseAsyncThunkConfig
> = createAsyncThunk<ISettings, ISettings, IBaseAsyncThunkConfig>(
  SettingsThunkEnum.SaveSettingsToStorage,
  async (settings, { dispatch, getState }) => {
    const logger: ILogger = getState().system.logger;
    const networks: INetworkWithTransactionParams[] = getState().networks.items;
    const settingsService: SettingsService = new SettingsService({
      logger,
    });
    let selectedNetwork: INetworkWithTransactionParams | null =
      selectNetworkFromSettings(networks, settings);

    // if the beta/main-net has been disallowed and the selected network is one of the disallowed, set it to a test one
    if (
      !selectedNetwork ||
      (!settings.advanced.allowBetaNet &&
        selectedNetwork.type === NetworkTypeEnum.Beta) ||
      (!settings.advanced.allowMainNet &&
        selectedNetwork.type === NetworkTypeEnum.Stable)
    ) {
      selectedNetwork = selectDefaultNetwork(networks);

      settings.general.preferredBlockExplorerIds[
        convertGenesisHashToHex(selectedNetwork.genesisHash).toUpperCase()
      ] = selectedNetwork.explorers[0]?.id || null;
      settings.general.selectedNetworkGenesisHash = selectedNetwork.genesisHash;
    }

    return await settingsService.saveAll(settings);
  }
);

export default saveSettingsToStorageThunk;
