import { configureStore, Store, Reducer } from '@reduxjs/toolkit';

// Features
import { setError, setNavigate, setToast } from '../features/application';

// Types
import { IBaseRootState } from '../types';

export default function makeStore<T extends IBaseRootState>(
  reducer: Reducer<T>
): Store<T> {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [setError.type, setNavigate.type, setToast.type],
          ignoredPaths: [
            'application.error',
            'application.logger.debug',
            'application.logger.error',
            'application.logger.info',
            'application.logger.warn',
            'application.navigate',
            'application.toast',
          ],
        },
      }),
    reducer,
  });
}
