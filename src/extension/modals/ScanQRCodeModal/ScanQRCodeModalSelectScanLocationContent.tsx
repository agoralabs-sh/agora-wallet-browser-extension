import {
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IoBrowsersOutline, IoVideocamOutline } from 'react-icons/io5';

// components
import Button from '@extension/components/Button';

// constants
import { DEFAULT_GAP } from '@extension/constants';

// hooks
import useDefaultTextColor from '@extension/hooks/useDefaultTextColor';

interface IProps {
  onCancelClick: () => void;
  onScanBrowserWindowClick: () => void;
  onScanUsingWebcamClick: () => void;
}

const ScanQRCodeModalSelectScanLocationContent: FC<IProps> = ({
  onCancelClick,
  onScanBrowserWindowClick,
  onScanUsingWebcamClick,
}: IProps) => {
  const { t } = useTranslation();
  // hooks
  const defaultTextColor: string = useDefaultTextColor();
  // handlers
  const handleCancelClick = () => onCancelClick();
  const handleScanUsingWebcamClick = () => onScanUsingWebcamClick();
  const handleScanBrowserWindowClick = () => onScanBrowserWindowClick();

  return (
    <>
      {/*header*/}
      <ModalHeader display="flex" justifyContent="center" px={DEFAULT_GAP}>
        <Heading color={defaultTextColor} size="md" textAlign="center">
          {t<string>('headings.scanQrCode')}
        </Heading>
      </ModalHeader>

      {/*body*/}
      <ModalBody display="flex" px={DEFAULT_GAP}>
        <VStack alignItems="center" flexGrow={1} w="full">
          {/*caption*/}
          <Text color={defaultTextColor} fontSize="md" textAlign="center">
            {t<string>('captions.selectScanLocation')}
          </Text>

          <VStack
            alignItems="center"
            flexGrow={1}
            justifyContent="center"
            spacing={DEFAULT_GAP}
            w="full"
          >
            {/*scan browser window*/}
            <Button
              onClick={handleScanBrowserWindowClick}
              rightIcon={<IoBrowsersOutline />}
              size="lg"
              variant="solid"
              w="full"
            >
              {t<string>('buttons.scanBrowserWindow')}
            </Button>

            {/*scan using webcam button*/}
            <Button
              onClick={handleScanUsingWebcamClick}
              rightIcon={<IoVideocamOutline />}
              size="lg"
              variant="solid"
              w="full"
            >
              {t<string>('buttons.scanUsingWebcam')}
            </Button>
          </VStack>
        </VStack>
      </ModalBody>

      {/*footer*/}
      <ModalFooter p={DEFAULT_GAP}>
        {/*cancel button*/}
        <Button
          onClick={handleCancelClick}
          size="lg"
          variant="outline"
          w="full"
        >
          {t<string>('buttons.cancel')}
        </Button>
      </ModalFooter>
    </>
  );
};

export default ScanQRCodeModalSelectScanLocationContent;
