import { Code, HStack, VStack } from '@chakra-ui/react';
import { Transaction } from 'algosdk';
import BigNumber from 'bignumber.js';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import AddressDisplay from '@extension/components/AddressDisplay';
import AssetAvatar from '@extension/components/AssetAvatar';
import AssetBadge from '@extension/components/AssetBadge';
import AssetDisplay from '@extension/components/AssetDisplay';
import AssetIcon from '@extension/components/AssetIcon';
import WarningIcon from '@extension/components/WarningIcon';
import SendAssetSummaryItem from './SendAssetSummaryItem';

// constants
import { DEFAULT_GAP } from '@extension/constants';

// enums
import { AssetTypeEnum } from '@extension/enums';

// hooks
import usePrimaryButtonTextColor from '@extension/hooks/usePrimaryButtonTextColor';
import useSubTextColor from '@extension/hooks/useSubTextColor';

// services
import AccountService from '@extension/services/AccountService';

// types
import {
  IAccount,
  IAssetTypes,
  INativeCurrency,
  INetworkWithTransactionParams,
} from '@extension/types';

// utils
import createIconFromDataUri from '@extension/utils/createIconFromDataUri';
import convertToAtomicUnit from '@common/utils/convertToAtomicUnit';

interface IProps {
  amountInStandardUnits: string;
  asset: IAssetTypes | INativeCurrency;
  fromAccount: IAccount;
  network: INetworkWithTransactionParams;
  note: string | null;
  toAddress: string;
  transactions: Transaction[];
}

const SendAssetModalSummaryContent: FC<IProps> = ({
  amountInStandardUnits,
  asset,
  fromAccount,
  network,
  note,
  toAddress,
  transactions,
}: IProps) => {
  const { t } = useTranslation();
  // hooks
  const primaryButtonTextColor: string = usePrimaryButtonTextColor();
  const subTextColor: string = useSubTextColor();
  // misc
  const atomicUnitAmount: BigNumber = convertToAtomicUnit(
    new BigNumber(amountInStandardUnits),
    asset.decimals
  );
  const totalFee: BigNumber = new BigNumber(
    transactions.reduce((acc, value) => acc + value.fee, 0)
  );
  // renders
  const renderAssetDisplay = () => {
    switch (asset.type) {
      case AssetTypeEnum.ARC0200:
        return (
          <AssetDisplay
            atomicUnitAmount={atomicUnitAmount}
            amountColor={subTextColor}
            decimals={asset.decimals}
            displayUnit={true}
            fontSize="sm"
            icon={
              <AssetAvatar
                asset={asset}
                fallbackIcon={
                  <AssetIcon
                    color={primaryButtonTextColor}
                    networkTheme={network.chakraTheme}
                    h={3}
                    w={3}
                  />
                }
                size="2xs"
              />
            }
            unit={asset.symbol}
          />
        );
      case AssetTypeEnum.Native:
        return (
          <AssetDisplay
            atomicUnitAmount={atomicUnitAmount}
            amountColor={subTextColor}
            decimals={asset.decimals}
            displayUnit={false}
            fontSize="sm"
            icon={createIconFromDataUri(asset.iconUrl, {
              color: subTextColor,
              h: 3,
              w: 3,
            })}
            unit={asset.symbol}
          />
        );
      case AssetTypeEnum.Standard:
        return (
          <AssetDisplay
            atomicUnitAmount={atomicUnitAmount}
            amountColor={subTextColor}
            decimals={asset.decimals}
            displayUnit={true}
            fontSize="sm"
            icon={
              <AssetAvatar
                asset={asset}
                fallbackIcon={
                  <AssetIcon
                    color={primaryButtonTextColor}
                    networkTheme={network.chakraTheme}
                    h={3}
                    w={3}
                  />
                }
                size="2xs"
              />
            }
            unit={asset.unitName || undefined}
          />
        );
      default:
        return null;
    }
  };
  const renderExtraPaymentItem = () => {
    let extraPaymentInAtomicUnits: BigNumber;

    // only arc0200 with one-time box storage will need to show extra payment
    if (asset.type !== AssetTypeEnum.ARC0200 || transactions.length <= 1) {
      return null;
    }

    // get all the payment transactions
    extraPaymentInAtomicUnits = new BigNumber(
      String(
        transactions.reduce(
          (acc, value) =>
            value.type === 'pay' ? (value.amount as bigint) + acc : acc,
          BigInt(0)
        )
      )
    );

    return (
      <SendAssetSummaryItem
        fontSize="sm"
        item={
          <HStack spacing={2}>
            <AssetDisplay
              atomicUnitAmount={extraPaymentInAtomicUnits}
              amountColor={subTextColor}
              decimals={network.nativeCurrency.decimals}
              fontSize="sm"
              icon={createIconFromDataUri(network.nativeCurrency.iconUrl, {
                color: subTextColor,
                h: 3,
                w: 3,
              })}
              unit={network.nativeCurrency.symbol}
            />

            <WarningIcon
              tooltipLabel={t<string>('captions.extraPayment', {
                symbol: asset.symbol,
              })}
            />
          </HStack>
        }
        label={t<string>('labels.extraPayment')}
      />
    );
  };

  return (
    <VStack
      alignItems="flex-start"
      justifyContent="flex-start"
      spacing={DEFAULT_GAP - 2}
      w="full"
    >
      {/*amount/asset*/}
      <SendAssetSummaryItem
        fontSize="sm"
        item={renderAssetDisplay()}
        label={t<string>('labels.amount')}
      />

      {/*from account*/}
      <SendAssetSummaryItem
        fontSize="sm"
        item={
          <AddressDisplay
            address={AccountService.convertPublicKeyToAlgorandAddress(
              fromAccount.publicKey
            )}
            ariaLabel="From address"
            color={subTextColor}
            fontSize="sm"
            network={network}
          />
        }
        label={t<string>('labels.from')}
      />

      {/*to address*/}
      <SendAssetSummaryItem
        fontSize="sm"
        item={
          <AddressDisplay
            address={toAddress}
            ariaLabel="To address"
            color={subTextColor}
            fontSize="sm"
            network={network}
          />
        }
        label={t<string>('labels.to')}
      />

      {/*type*/}
      {asset.type !== AssetTypeEnum.Native && (
        <SendAssetSummaryItem
          fontSize="sm"
          item={<AssetBadge type={asset.type} />}
          label={t<string>('labels.type')}
        />
      )}

      {/*fee*/}
      <SendAssetSummaryItem
        fontSize="sm"
        item={
          <HStack spacing={2}>
            <AssetDisplay
              atomicUnitAmount={totalFee}
              amountColor={subTextColor}
              decimals={network.nativeCurrency.decimals}
              fontSize="sm"
              icon={createIconFromDataUri(network.nativeCurrency.iconUrl, {
                color: subTextColor,
                h: 3,
                w: 3,
              })}
              unit={network.nativeCurrency.symbol}
            />

            {/*show a warning for higher arc0200 fees for one-time box storage*/}
            {asset.type === AssetTypeEnum.ARC0200 &&
              transactions.length > 1 && (
                <WarningIcon
                  tooltipLabel={t<string>('captions.higherFee', {
                    symbol: asset.symbol,
                  })}
                />
              )}
          </HStack>
        }
        label={t<string>('labels.fee')}
      />

      {/*extra payment*/}
      {renderExtraPaymentItem()}

      {/*note*/}
      {note && note.length > 0 && (
        <SendAssetSummaryItem
          fontSize="sm"
          item={
            <Code borderRadius="md" fontSize="sm" wordBreak="break-word">
              {note}
            </Code>
          }
          label={t<string>('labels.note')}
        />
      )}
    </VStack>
  );
};

export default SendAssetModalSummaryContent;
