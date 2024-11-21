import { resolve } from 'node:path';
import type { Configuration } from 'webpack';

// constants
import { SRC_PATH } from '../constants';

/**
 * Creates a common config.
 * @returns {Configuration} a common configuration.
 */
export default function createCommonConfig(): Configuration {
  const commonPath = resolve(SRC_PATH, 'common');
  const extensionPath = resolve(SRC_PATH, 'extension');
  const externalPath = resolve(SRC_PATH, 'external');

  return {
    node: false,
    resolve: {
      alias: {
        // common
        ['@common/constants']: resolve(commonPath, 'constants'),
        ['@common/enums']: resolve(commonPath, 'enums'),
        ['@common/errors']: resolve(commonPath, 'errors'),
        ['@common/messages']: resolve(commonPath, 'messages'),
        ['@common/types']: resolve(commonPath, 'types'),
        ['@common/utils']: resolve(commonPath, 'utils'),
        ['@docs']: resolve(SRC_PATH, 'docs'),
        // extension
        ['@extension/components']: resolve(extensionPath, 'components'),
        ['@extension/config']: resolve(extensionPath, 'config'),
        ['@extension/constants']: resolve(extensionPath, 'constants'),
        ['@extension/contracts']: resolve(extensionPath, 'contracts'),
        ['@extension/enums']: resolve(extensionPath, 'enums'),
        ['@extension/errors']: resolve(extensionPath, 'errors'),
        ['@extension/events']: resolve(extensionPath, 'events'),
        ['@extension/features']: resolve(extensionPath, 'features'),
        ['@extension/fonts']: resolve(extensionPath, 'fonts'),
        ['@extension/hooks']: resolve(extensionPath, 'hooks'),
        ['@extension/icons']: resolve(extensionPath, 'icons'),
        ['@extension/images']: resolve(extensionPath, 'images'),
        ['@extension/managers']: resolve(extensionPath, 'managers'),
        ['@extension/message-brokers']: resolve(
          extensionPath,
          'message-brokers'
        ),
        ['@extension/message-handlers']: resolve(
          extensionPath,
          'message-handlers'
        ),
        ['@extension/modals']: resolve(extensionPath, 'modals'),
        ['@extension/models']: resolve(extensionPath, 'models'),
        ['@extension/pages']: resolve(extensionPath, 'pages'),
        ['@extension/repositories']: resolve(extensionPath, 'repositories'),
        ['@extension/routers']: resolve(extensionPath, 'routers'),
        ['@extension/selectors']: resolve(extensionPath, 'selectors'),
        ['@extension/services']: resolve(extensionPath, 'services'),
        ['@extension/styles']: resolve(extensionPath, 'styles'),
        ['@extension/theme']: resolve(extensionPath, 'theme'),
        ['@extension/translations']: resolve(extensionPath, 'translations'),
        ['@extension/types']: resolve(extensionPath, 'types'),
        ['@extension/utils']: resolve(extensionPath, 'utils'),
        // external
        ['@external/constants']: resolve(externalPath, 'constants'),
        ['@external/managers']: resolve(externalPath, 'managers'),
        ['@external/services']: resolve(externalPath, 'services'),
        ['@external/types']: resolve(externalPath, 'types'),
      },
      extensions: ['.css', '.js', '.ts', '.tsx'],
    },

    stats: {
      assetsSpace: 100,
      modules: false,
    },
  };
}
