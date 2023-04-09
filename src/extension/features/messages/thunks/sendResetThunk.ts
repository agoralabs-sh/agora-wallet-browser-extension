import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import browser from 'webextension-polyfill';

// Enums
import { MessagesThunkEnum } from '@extension/enums';

// Events
import { ExtensionResetEvent } from '@extension/events';

// Types
import { ILogger } from '@common/types';
import { IMainRootState } from '@extension/types';

const sendResetThunk: AsyncThunk<
  void, // return
  undefined, // args
  Record<string, never>
> = createAsyncThunk<void, undefined, { state: IMainRootState }>(
  MessagesThunkEnum.SendReset,
  async (_, { getState }) => {
    const logger: ILogger = getState().application.logger;
    const event: ExtensionResetEvent = new ExtensionResetEvent();

    logger.debug(
      `${sendResetThunk.name}: sending "${event.event}" to the bridge`
    );

    // send the message
    await browser.runtime.sendMessage(event);
  }
);

export default sendResetThunk;