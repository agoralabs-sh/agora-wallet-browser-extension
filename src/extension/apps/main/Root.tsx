import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';

// components
import AddAssetModal from '@extension/components/AddAssetModal';
import ConfirmModal from '@extension/components/ConfirmModal';
import EnableModal from '@extension/components/EnableModal';
import ErrorModal from '@extension/components/ErrorModal';
import MainLayout from '@extension/components/MainLayout';
import SendAssetModal from '@extension/components/SendAssetModal';
import SignBytesModal from '@extension/components/SignBytesModal';
import SignTxnsModal from '@extension/components/SignTxnsModal';
import WalletConnectModal from '@extension/components/WalletConnectModal';

// features
import { setAccountId } from '@extension/features/add-asset';
import {
  fetchAccountsFromStorageThunk,
  startPollingForAccountsThunk,
} from '@extension/features/accounts';
import { fetchArc200AssetsFromStorageThunk } from '@extension/features/arc200-assets';
import {
  setEnableRequest,
  setSignBytesRequest,
  setSignTxnsRequest,
} from '@extension/features/events';
import {
  fetchTransactionParamsFromStorageThunk,
  startPollingForTransactionsParamsThunk,
} from '@extension/features/networks';
import { reset as resetSendAsset } from '@extension/features/send-assets';
import {
  closeWalletConnectModal,
  fetchSessionsThunk,
  initializeWalletConnectThunk,
} from '@extension/features/sessions';
import { fetchSettings } from '@extension/features/settings';
import { fetchStandardAssetsFromStorageThunk } from '@extension/features/standard-assets';
import { setConfirm, setError, setNavigate } from '@extension/features/system';

// hooks
import useOnMainAppMessage from '@extension/hooks/useOnMainAppMessage';
import useOnNetworkConnectivity from '@extension/hooks/useOnNetworkConnectivity';
import useOnNewAssets from '@extension/hooks/useOnNewAssets';
import useNotifications from '@extension/hooks/useNotifications';

// selectors
import {
  useSelectAccounts,
  useSelectSelectedNetwork,
} from '@extension/selectors';

// types
import { IAccount, IAppThunkDispatch, INetwork } from '@extension/types';

const Root: FC = () => {
  const dispatch: IAppThunkDispatch = useDispatch<IAppThunkDispatch>();
  const navigate: NavigateFunction = useNavigate();
  // selectors
  const accounts: IAccount[] = useSelectAccounts();
  const selectedNetwork: INetwork | null = useSelectSelectedNetwork();
  // handlers
  const handleAddAssetClose = () => dispatch(setAccountId(null));
  const handleConfirmClose = () => dispatch(setConfirm(null));
  const handleEnableModalClose = () => dispatch(setEnableRequest(null));
  const handleErrorModalClose = () => dispatch(setError(null));
  const handleSendAssetModalClose = () => dispatch(resetSendAsset());
  const handleSignBytesModalClose = () => dispatch(setSignBytesRequest(null));
  const handleSignTxnsModalClose = () => dispatch(setSignTxnsRequest(null));
  const handleWalletConnectModalClose = () =>
    dispatch(closeWalletConnectModal());

  // 1. fetched required data from storage
  useEffect(() => {
    dispatch(setNavigate(navigate));
    dispatch(fetchSettings());
    dispatch(fetchSessionsThunk());
    dispatch(fetchStandardAssetsFromStorageThunk());
    dispatch(fetchArc200AssetsFromStorageThunk());
    dispatch(initializeWalletConnectThunk());
    dispatch(startPollingForAccountsThunk());
    dispatch(startPollingForTransactionsParamsThunk());
  }, []);
  // 2. when the selected network has been fetched from storage
  useEffect(() => {
    if (selectedNetwork) {
      // fetch accounts when no accounts exist
      if (accounts.length < 1) {
        dispatch(
          fetchAccountsFromStorageThunk({
            updateInformation: true,
            updateTransactions: true,
          })
        );
      }

      // fetch the most recent transaction params for the selected network
      dispatch(fetchTransactionParamsFromStorageThunk());
    }
  }, [selectedNetwork]);
  useOnNewAssets(); // handle new assets added
  useNotifications(); // handle notifications
  useOnNetworkConnectivity(); // listen to network connectivity
  useOnMainAppMessage(); // handle incoming messages

  return (
    <>
      <ErrorModal onClose={handleErrorModalClose} />
      <ConfirmModal onClose={handleConfirmClose} />
      <EnableModal onClose={handleEnableModalClose} />
      <SignTxnsModal onClose={handleSignTxnsModalClose} />
      <SignBytesModal onClose={handleSignBytesModalClose} />
      <AddAssetModal onClose={handleAddAssetClose} />
      <SendAssetModal onClose={handleSendAssetModalClose} />
      <WalletConnectModal onClose={handleWalletConnectModalClose} />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default Root;
