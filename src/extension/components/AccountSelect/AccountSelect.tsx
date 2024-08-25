import {
  HStack,
  Stack,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronDownOutline } from 'react-icons/io5';

// components
import AccountItem from '@extension/components/AccountItem';
import IconButton from '@extension/components/IconButton';
import Label from '@extension/components/Label';

// constants
import { DEFAULT_GAP, INPUT_HEIGHT } from '@extension/constants';

// modals
import AccountSelectModal from './AccountSelectModal';

// types
import type { IAccountWithExtendedProps } from '@extension/types';
import type { IProps } from './types';

// utils
import convertPublicKeyToAVMAddress from '@extension/utils/convertPublicKeyToAVMAddress';

const AccountSelect: FC<IProps> = ({
  _context,
  accounts,
  allowWatchAccounts,
  disabled = false,
  label,
  onSelect,
  required = false,
  value,
}) => {
  const { t } = useTranslation();
  const {
    isOpen: isAccountSelectModalOpen,
    onClose: onAccountSelectClose,
    onOpen: onAccountSelectModalOpen,
  } = useDisclosure();
  // handlers
  const handleAccountClick = () => onAccountSelectModalOpen();
  const handleOnAccountSelect = (_value: IAccountWithExtendedProps[]) =>
    onSelect(_value[0]);

  return (
    <>
      {/*account select modal*/}
      <AccountSelectModal
        _context={_context}
        accounts={accounts}
        allowWatchAccounts={allowWatchAccounts}
        isOpen={isAccountSelectModalOpen}
        multiple={false}
        onClose={onAccountSelectClose}
        onSelect={handleOnAccountSelect}
      />

      <VStack alignItems="flex-start" spacing={DEFAULT_GAP / 3} w="full">
        {/*label*/}
        {label && <Label label={label} required={required} />}

        <HStack justifyContent="center" spacing={DEFAULT_GAP / 3} w="full">
          {/*account view*/}
          <Stack
            borderRadius="md"
            borderWidth={1}
            flexGrow={1}
            height={INPUT_HEIGHT}
            justifyContent="center"
            px={DEFAULT_GAP - 2}
            w="full"
          >
            <AccountItem
              address={convertPublicKeyToAVMAddress(value.publicKey)}
              {...(value.name && { name: value.name })}
            />
          </Stack>

          {/*open select modal button*/}
          <Tooltip label={t<string>('labels.selectAccount')}>
            <IconButton
              aria-label={t<string>('labels.selectAccount')}
              disabled={disabled}
              icon={IoChevronDownOutline}
              onClick={handleAccountClick}
              size="lg"
              variant="ghost"
            />
          </Tooltip>
        </HStack>
      </VStack>
    </>
  );
};

export default AccountSelect;
