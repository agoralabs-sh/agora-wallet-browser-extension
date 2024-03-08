import BigNumber from 'bignumber.js';

// services
import AccountService from '@extension/services/AccountService';

// types
import type { IAccountInformation } from '@extension/types';
import type { IOptions, IState } from './types';

// utils
import calculateMinimumBalanceRequirementForStandardAssets from '@extension/utils/calculateMinimumBalanceRequirementForStandardAssets';

export default function useAddAssetStandardAssetSummaryContent({
  account,
  network,
}: IOptions): IState {
  const accountInformation: IAccountInformation | null =
    AccountService.extractAccountInformationForNetwork(account, network);
  let accountBalanceInAtomicUnits = new BigNumber('0');

  if (accountInformation) {
    accountBalanceInAtomicUnits = new BigNumber(
      accountInformation.atomicBalance
    );
  }

  return {
    accountBalanceInAtomicUnits,
    minimumBalanceRequirementInAtomicUnits:
      calculateMinimumBalanceRequirementForStandardAssets({
        account,
        network,
      }),
    minimumTransactionFeesInAtomicUnits: new BigNumber(network.minFee),
  };
}
