// features
import type { IAccountsState } from '@extension/features/accounts';
import type { IAddAssetState } from '@extension/features/add-asset';
import type { IARC0200AssetsState } from '@extension/features/arc0200-assets';
import type { IState as IARC0072AssetsState } from '@extension/features/arc0072-assets';
import type { IEventsState } from '@extension/features/events';
import type { INetworksState } from '@extension/features/networks';
import type { INotificationsState } from '@extension/features/notifications';
import type { IPasswordLockState } from '@extension/features/password-lock';
import type { ISendAssetsState } from '@extension/features/send-assets';
import type { ISessionsState } from '@extension/features/sessions';
import type { ISettingsState } from '@extension/features/settings';
import type { IStandardAssetsState } from '@extension/features/standard-assets';

// types
import IBaseRootState from './IBaseRootState';

interface IMainRootState extends IBaseRootState {
  accounts: IAccountsState;
  addAsset: IAddAssetState;
  arc0072Assets: IARC0072AssetsState;
  events: IEventsState;
  networks: INetworksState;
  notifications: INotificationsState;
  passwordLock: IPasswordLockState;
  sendAssets: ISendAssetsState;
  sessions: ISessionsState;
  settings: ISettingsState;
  standardAssets: IStandardAssetsState;
}

export default IMainRootState;
