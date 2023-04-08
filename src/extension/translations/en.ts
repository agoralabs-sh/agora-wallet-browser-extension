// Types
import { IResourceLanguage } from '@extension/types';

const translation: IResourceLanguage = {
  buttons: {
    addAccount: 'Add Account',
    cancel: 'Cancel',
    clearAllData: 'Clear All Data',
    connect: 'Connect',
    confirm: 'Confirm',
    create: 'Create',
    getStarted: 'Get Started',
    import: 'Import',
    next: 'Next',
    ok: 'OK',
    previous: 'Previous',
    removeAllSessions: 'Remove All Sessions',
    save: 'Save',
    sign: 'Sign',
  },
  captions: {
    addressCopied: 'Address copied!',
    addressDoesNotMatch: 'This address does not match the signer',
    allowBetaNet: 'Let BetaNet networks appear in the networks list.',
    allowDidTokenFormat:
      'The DID token format "did:algo:<public_address>" will be an option when sharing an address.',
    allowTestNet: 'Let TestNet networks appear in the networks list.',
    audienceDoesNotMatch:
      'The intended recipient of this token, does not match the host',
    changeTheme: 'Choose between dark and light mode.',
    clearAllData: 'Are you sure you want to clear all your data?',
    clearAllDataWarning:
      'Once this has been completed, it cannot be reversed. All your settings and accounts will be removed',
    connectRequest:
      'An application is requesting to connect. Select which accounts you would like to enable:',
    copied: 'Copied!',
    createNewAccount:
      'Create a new account. You will be prompted to save a mnemonic seed phrase.',
    createPassword1: `First, let's create a new password to secure this device.`,
    createPassword2:
      'This password will be used to encrypt your private keys, so make it strong!',
    importAccount: `Add your mnemonic phrase to import your account.`,
    importExistingAccount: `Import an existing account using you mnemonic seed phrase.`,
    importRekeyedAccount: `Import an existing account that has been rekeyed. You will need the mnemonic seed phrase of the authorized account and the address of the rekeyed account.`,
    invalidAlgorithm: `The suggested signing method does not match the method that will be used to sign this token`,
    minimumBalance: `Minimum balance is {{amount}} algo. Based on the account configuration, this is the minimum balance needed to keep the account open.`,
    mustEnterPasswordToSign: 'You must enter your password to sign.',
    nameAccount: `Give your account a nickname. Don't worry you can change this later on.`,
    offline: 'It looks like you are offline, some features may not work',
    passwordScoreInfo:
      'To conform with our Strong Password policy, you are required to use a sufficiently strong password. Password must be at least 8 characters.',
    removeAllSessions: 'Are you sure you want to remove all sessions?',
    removeAllAccountsWarning:
      'Removing all accounts will also remove this session',
    securityTokenExpired: 'This token has expired',
    signJwtRequest: 'An application is requesting to sign a security token.',
    signMessageRequest: 'An application is requesting to sign a message.',
    support:
      'Please <2>contact us</2> for further assistance so we can resolve this issue for you.',
  },
  errors: {
    descriptions: {
      code: `Something has gone wrong.`,
      code_2000: 'The password seems to be invalid.',
    },
    inputs: {
      invalidMnemonic: 'Invalid mnemonic phrase',
      passwordMinLength: 'Must be at least 8 characters',
      passwordTooWeak: 'This password is too weak',
      required: '{{name}} is required',
      unknown: `Something doesn't look right`,
    },
    titles: {
      code: 'Well this is embarrassing...',
      code_2000: 'Invalid password',
    },
  },
  headings: {
    beta: 'Beta',
    clearAllData: 'Clea All Data',
    createNewAccount: 'Create New Account',
    developer: 'Developer',
    importAccount: 'Import your account',
    importExistingAccount: 'Import An Existing Account',
    importRekeyedAccount: 'Import A Rekeyed Account',
    nameAccount: 'Name Your Account',
    noAccountsFound: 'No accounts found!',
    noSessionsFound: 'No sessions found!',
    removeAllSessions: 'Remove All Sessions',
    shareAddress: 'Share Address',
  },
  labels: {
    address: 'Address',
    addressToSign: 'Address to sign',
    accountName: 'Account Name',
    addAccount: 'Add Account',
    allowBetaNet: 'Allow BetaNet networks?',
    allowDidTokenFormat: 'Allow DID token format in address sharing?',
    allowTestNet: 'Allow TestNet networks?',
    audience: 'Audience',
    authorizedAccounts: 'Authorized accounts',
    authorizedAddresses: 'Authorized addresses',
    balance: 'Balance',
    dark: 'Dark',
    default: 'Default',
    did: 'DID',
    expirationDate: 'Expiration date',
    id: 'ID',
    information: 'Information',
    issueDate: 'Issue date',
    issuer: 'Issuer',
    light: 'Light',
    manageAccounts: 'Manage Accounts',
    message: 'Message',
    moreInformation: 'More Information',
    mnemonicPhrase: 'Mnemonic Phrase',
    password: 'Password',
    removeSession: 'Remove session',
    settings: 'Settings',
    shareAddress: 'Share address',
    signingMethod: 'Signing Method',
    theme: 'Theme',
    unknownApp: 'Unknown App',
    unknownHost: 'unknown host',
  },
  placeholders: {
    enterPassword: 'Enter password',
    nameAccount: 'Enter a name for this account (optional)',
  },
  titles: {
    page: '',
    page_accountSetup: 'Choose How To Add An Account',
    page_createPassword: 'Secure Your Device',
    page_advanced: 'Advanced',
    page_appearance: 'Appearance',
    page_security: 'Security',
    page_sessions: 'Sessions',
    page_settings: 'Settings',
  },
};

export default translation;
