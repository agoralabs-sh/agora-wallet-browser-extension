// enums
import { AssetTypeEnum, TransactionTypeEnum } from '@extension/enums';

// types
import { IResourceLanguage } from '@extension/types';

const translation: IResourceLanguage = {
  buttons: {
    activate: 'Activate',
    add: 'Add',
    addAccount: 'Add Account',
    addAsset: 'Add Asset',
    addCustomNode: 'Add Custom Node',
    addPasskey: 'Add Passkey',
    allow: 'Allow',
    approve: 'Approve',
    cancel: 'Cancel',
    changePassword: 'Change Password',
    clearAllData: 'Clear All Data',
    confirm: 'Confirm',
    connect: 'Connect',
    copy: 'Copy',
    copyURI: 'Copy URI',
    copySeedPhrase: 'Copy Seed Phrase',
    create: 'Create',
    deactivate: 'Deactivate',
    disconnectAllSessions: 'Disconnect All Sessions',
    dismiss: 'Dismiss',
    download: 'Download',
    encrypt: 'Encrypt',
    getStarted: 'Get Started',
    hide: 'Hide',
    import: 'Import',
    moreDetails: 'More Details',
    next: 'Next',
    ok: 'OK',
    previous: 'Previous',
    receive: 'Receive',
    reKey: 'Re-Key',
    reject: 'Reject',
    remove: 'Remove',
    removePasskey: 'Remove Passkey',
    reset: 'Reset',
    save: 'Save',
    scanAWindow: 'Scan A Window',
    scanCurrentTab: 'Scan Current Tab',
    scanUsingCamera: 'Scan Using Camera',
    selectAccounts: 'Select Accounts',
    send: 'Send',
    sign: 'Sign',
    tryAgain: 'Try Again',
    undo: 'Undo',
    unlock: 'Unlock',
    view: 'View',
    yesImIn: `Yes, I'm In`,
  },
  captions: {
    accountAlreadyAdded: 'Account {{address}} already added.',
    addAsset:
      'Enter an asset ID, name, symbol or application ID (for ARC-200).',
    addAssetConfirming:
      'Please wait while we confirm the opt-in of the asset {{symbol}} with the network.',
    [`addAssetConfirming_${AssetTypeEnum.ARC0200}`]: 'Adding asset {{symbol}}.',
    addAssetForWatchAccount: 'Enter an application ID (for ARC-200).',
    addAssetForWatchAccountWarning:
      'This is a watch account and only ARC-0200 assets can be added.',
    addAssetURI:
      'You are about to add the following asset. Select which account your would like to add the asset to.',
    addedAccount: 'Account {{address}} has been added.',
    addedAccounts: 'Added {{amount}} accounts.',
    addPasskey1:
      'Adding a passkey allows you to sign transactions without your password.',
    addPasskey2: `The passkey will be used to to encrypt/decrypt the private keys of your accounts.`,
    addPasskeyInstruction: `To begin, you will be asked to add a supported passkey.`,
    addressDoesNotMatch: 'This address does not match the signer',
    addWatchAccount: 'Add a watch account by providing a valid address.',
    addWatchAccountComplete: `Press save to confirm adding the watch account.`,
    algodToken: `This is the 'X-Algo-API-Token' header that will be used to authenticate REST calls to the algod node.`,
    allowActionTracking:
      'By tracking certain actions, you can earn rewards. See <2>here</2> for more information.',
    allowBetaNet: 'Let BetaNet networks appear in the networks list.',
    allowDidTokenFormat:
      'The DID token format "did:algo:<public_address>" will be an option when sharing an address.',
    allowMainNet: 'Let MainNet networks appear in the networks list.',
    allowMainNetConfirm: 'Are you sure you want to allow MainNet networks?',
    allowMainNetWarning:
      'Kibisis is still in the early development so allow MainNet networks at your own risk!',
    applicationIdCopied: 'Application ID copied!',
    appOnComplete: 'This transaction will run the application.',
    [`appOnComplete_${TransactionTypeEnum.ApplicationClearState}`]: `This transaction will clear any application data associated with the sender's account.`,
    [`appOnComplete_${TransactionTypeEnum.ApplicationCloseOut}`]: `This transaction will run the application and clear any application data associated with the sender's account.`,
    [`appOnComplete_${TransactionTypeEnum.ApplicationCreate}`]:
      'This transaction will create a new application.',
    [`appOnComplete_${TransactionTypeEnum.ApplicationDelete}`]:
      'This transaction will delete the application.',
    [`appOnComplete_${TransactionTypeEnum.ApplicationOptIn}`]: `This transaction will opt the sender's account into the application by allocating some local state.`,
    [`appOnComplete_${TransactionTypeEnum.ApplicationUpdate}`]:
      'This transaction will update the application, replacing the approval and clear programs. The application ID will not be changed.',
    audienceDoesNotMatch:
      'The intended recipient of this token, does not match the host',
    cameraQRCodeScanNotAllowed1: 'Camera access has been denied.',
    cameraQRCodeScanNotAllowed2:
      'You will need to go into your settings and allow access.',
    changePassword1: 'Enter your new password.',
    changePassword2:
      'You will be prompted to enter your current password when you press "Change Password".',
    changeTheme: 'Choose between dark and light mode.',
    charactersRemaining: '{{amount}} characters remaining',
    checkingAuthenticationCredentials: 'Checking authentication credentials.',
    confirmingTransaction:
      'Your transaction(s) are being sent to the network to be processed.',
    confirmingTransactionWithAmount:
      '{{number}} transaction(s) are being sent to the network to be processed.',
    connectingToWalletConnect: 'Attempting to connect to WalletConnect.',
    copied: 'Copied!',
    createNewAccount:
      'Create a new account. You will be prompted to save a seed phrase.',
    createPassword1: `First, let's create a new password to secure this device.`,
    createPassword2:
      'This password will be used to encrypt your private keys, so make it strong!',
    customNodeAdded: '"{{name}}" added for network "{{genesisID}}".',
    customNodes:
      'Here you can add a custom node which will appear in the network selection list.',
    debugLogging:
      'Debugging information will be output to the extension console.',
    defaultConfirm: 'Are you sure?',
    deleteApplication: 'Be careful, deleting an application is irreversible!',
    destroyAsset: 'Be careful, destroying an asset is irreversible!',
    disconnectAllSessions: 'Are you sure you want to disconnect all sessions?',
    displayingCountOfTotal: 'Displaying {{count}} of {{total}}',
    enablePasswordLock:
      'Passwords will only need to be entered due to inactivity.',
    enableRequest:
      'An application is requesting to connect. Select which accounts you would like to enable:',
    encryptWithPasskeyInstruction1: `1. You will be asked to enter your password to decrypt your private keys.`,
    encryptWithPasskeyInstruction2: `2. After your password has been confirmed, you will then be asked to use your passkey to re-encrypt the private keys.`,
    enterSeedPhrase: `Add your seed phrase to import your account.`,
    enterWatchAccountAddress:
      'Enter the address of the account you would like to watch.',
    exportAccount: 'Select which accounts you would like to export.',
    extraPayment:
      'An extra network payment has been applied as this is the first time the recipient has interacted with the {{symbol}} asset.',
    factoryReset: 'This will remove all accounts, settings and the password.',
    factoryResetModal: 'Are you sure you want to perform a factory reset?',
    factoryResetWarning:
      'Once this has been completed, it cannot be reversed. All your accounts, settings and password will be removed',
    failedToGetCustomNodeDetails:
      'Unable to connect to custom node at "{{url}}".',
    fetchingCustomNodes: 'Fetching custom nodes from storage',
    fetchingNetworkDetails: 'Fetching the network details for the node.',
    freezeManagerAddressDoesNotMatch:
      'This account does not have the authority to freeze/unfreeze this asset. This transaction will likely fail.',
    groupIdCopied: 'Group ID copied!',
    higherFee:
      'The fee is higher as this is the first time the recipient has interacted with the {{symbol}} asset.',
    indexerToken: `This is the 'X-Indexer-API-Token' header that will be used to authenticate REST calls to the indexer.`,
    importAccounts: 'You are about to import the following account(s).',
    importAccountViaQRCode: `Import an account, including any assets, by scanning a QR code.`,
    importAccountViaSeedPhrase: `Import an existing account using a seed phrase.`,
    importAccountViaSeedPhraseComplete: `To finalize we will encrypt your account keys with your password and you will be able to start using this account.`,
    importingAccount: 'Importing new account and adding assets.',
    initializingWalletConnect:
      'Putting the final touches into your WalletConnect interface.',
    invalidAlgorithm: `The suggested signing method does not match the method that will be used to sign this token`,
    keyRegistrationURI:
      'You are about to register a participation key {{status}}.',
    loadingCameraStream: 'Loading your camera stream.',
    managerAddressDoesNotMatch:
      'This account does not have the authority to alter this asset. This transaction will likely fail.',
    maximumNativeCurrencyTransactionAmount:
      'The maximum {{nativeCurrencyCode}} amount is calculated by: the balance ({{balance}}), minus the minimum balance needed to keep the account open ({{minBalance}}), minus the minimum transaction fee ({{minFee}})',
    minimumBalance: `Minimum balance is {{amount}} {{code}}. Based on the account configuration, this is the minimum balance needed to keep the account open.`,
    minimumBalanceTooLow: `Your current balance will fall below the minimum balance requirement with this transaction. You need at least {{cost}} {{symbol}} to complete this transaction. Your current balance is {{balance}} {{symbol}}.`,
    mustEnterPasswordToAuthorizeOptIn:
      'You must enter your password to authorize an opt-in transaction.',
    mustEnterPasswordToAuthorizeOptOut:
      'You must enter your password to authorize an opt-out transaction.',
    mustEnterPasswordToAuthorizeReKey:
      'You must enter your password to authorize the re-keying of the account.',
    mustEnterPasswordToAuthorizeUndoReKey:
      'You must enter your password to authorize the undo re-key.',
    mustEnterPasswordToConfirm: 'You must enter your password to confirm.',
    mustEnterPasswordToDecryptPrivateKeys: `Enter your password to decrypt the private keys.`,
    mustEnterPasswordToImportAccount:
      'You must enter your password to import this account.',
    mustEnterPasswordToReEncryptPrivateKeys: `Enter your password to re-encrypt the private keys.`,
    mustEnterPasswordToSign: 'Enter your password to sign.',
    mustEnterPasswordToSignSecurityToken:
      'Enter your password to sign this security token.',
    mustEnterPasswordToSignTransaction:
      'Enter your password to sign this transaction.',
    mustEnterPasswordToSignTransactions:
      'Enter your password to sign these transactions.',
    mustEnterPasswordToSendTransaction:
      'You must enter your password to send transaction.',
    mustEnterPasswordToUnlock: 'You must enter your password to unlock.',
    nameYourAccount: `Give your account a nickname. Don't worry you can change this later on.`,
    networkNotAllowed:
      'Network "{{genesisID}}" is not allowed. Check your settings to see which networks have been enabled.',
    newAccountComplete:
      'We are almost done. Before we safely secure your new account on this device, we just need you to confirm you have copied your seed phrase.',
    noAccountsToImport: 'No accounts to import.',
    noAccountsFound:
      'You can create a new account or import an existing account.',
    noAssetsFound: 'You have not added any assets. Try adding one now.',
    noBlockExplorersAvailable: 'No block explorers available',
    noNFTExplorersAvailable: 'No NFT explorers available',
    noNFTsFound: `You don't have any NFTs.`,
    noSessionsFound: 'Enabled dApps will appear here.',
    noThemesAvailable: 'No themes available',
    offline: 'It looks like you are offline, some features may not work',
    openOn: 'Open on {{name}}',
    openUrl: 'Open URL in your browser',
    optInFee:
      'Standard assets require an "opt-in" fee. This is a transaction of the asset with a "0" amount sent to yourself.',
    optOutFee:
      'Standard assets require an "opt-out" fee. This is a transaction of the asset with a "0" amount sent to yourself.',
    passkeyAdded: 'Passkey {{name}} added!',
    passkeyRemoved: 'Passkey {{name}} removed.',
    passkeyNotSupported1:
      'Unfortunately your browser does not support passkeys.',
    passkeyNotSupported2:
      'Try updating your browser to the latest or a newer version.',
    passwordLockDescription: 'Please re-enter your password to unlock.',
    passwordScoreInfo:
      'To conform with our <2>Strong Password Policy</2>, you are required to use a sufficiently strong password. Password must be at least 8 characters.',
    preferredBlockExplorer: 'Used when opening chain information in new tabs.',
    preferredNFTExplorer: 'Used when opening NFTs.',
    questComplete: 'You have successfully completed a quest!',
    reEncryptingKeys: 'Re-encrypting {{count}} of {{total}} accounts.',
    reKeyAccount:
      'You are about to re-key an account with an authorized address.',
    reKeyAccountConfirming: 'Please wait while the account is re-keyed.',
    reKeyFee:
      'Re-keying accounts requires a "re-key" fee. This is a transaction of with a "0" amount sent to yourself.',
    removeAccount: 'Are you sure you want to remove account "{{address}}"?',
    removeAccountWarning:
      'To add this account back you will need the seed phrase',
    removeAllAccountsWarning:
      'Removing all accounts will also remove this session',
    removeAsset:
      'Are you sure you want to remove {{symbol}}? You will have to opt-in to this asset again.',
    [`removeAsset_${AssetTypeEnum.ARC0200}`]:
      'Are you sure you want to hide {{symbol}}? You can re-add it back to your asset holdings again.',
    removeAssetConfirming:
      'Please wait while we confirm the opt-out of the asset {{symbol}} with the network.',
    [`removeAssetConfirming_${AssetTypeEnum.ARC0200}`]:
      'Hiding asset {{symbol}}.',
    removeCredentialLock: 'You will need to authenticate to unlock.',
    removeCredentialLock_passkey:
      'You will need to authenticate with your passkey to unlock.',
    removeCredentialLock_password:
      'You will need to enter your password to unlock.',
    removeCustomNodeConfirm: 'Are you sure you want to remove "{{name}}"?',
    removedCustomNode: 'The custom node {{name}} has been removed.',
    removePasskey:
      'You are about to remove the passkey "{{name}}". This action will re-enable password authentication.',
    removePasskeyInstruction1:
      '1. Before you can remove the passkey, you will need to enter your password which will be used to re-encrypt your keys.',
    removePasskeyInstruction2:
      '2. After your password has been confirmed, you will then be asked to use your passkey to decrypt the private keys.',
    requestingPasskeyPermission:
      'Requesting permission from the passkey "{{name}}".',
    saveMnemonicPhrase1:
      'Here is your 25 word mnemonic seed phrase; it is the key to your account.',
    saveMnemonicPhrase2: `Make sure you save this in a secure place.`,
    scannedQrCodes: 'Scanning {{count}} of {{total}} codes',
    scanningForQrCode:
      'Scanning for a QR Code. Make sure the QR code is visible in the background.',
    screenCaptureViaQRCodeScanNotAllowed1:
      'Screen capture access has been denied.',
    screenCaptureViaQRCodeScanNotAllowed2:
      'You will need to go into your settings and allow access.',
    selectScanLocation: 'Choose how you would like to scan the QR code.',
    securityTokenExpired: 'This token has expired',
    signJwtRequest: 'An application is requesting to sign a security token.',
    signMessageRequest: 'An application is requesting to sign a message.',
    signTransactionRequest:
      'An application is requesting to sign a transaction.',
    signTransactionsRequest:
      'An application is requesting to sign multiple transactions.',
    support:
      'Please <2>contact us</2> for further assistance so we can resolve this issue for you.',
    transactionIdCopied: 'Transaction ID copied!',
    transactionsSentSuccessfully:
      '{{amount}} transaction(s) were successfully sent.',
    undoReKeyAccount:
      'You are about to remove the authorized account from a re-keyed account.',
    undoReKeyAccountConfirming:
      'Please wait while the the authorized account is removed from the re-keyed account.',
    unknownAVMNetwork: 'Network "{{genesisID}}" not supported.',
    unknownQRCode: 'The QR code provided is not recognized.',
    updatingAssetInformation: 'Updating asset information',
    viewSeedPhrase1: 'Select an account to view the seed phrase.',
    viewSeedPhrase2: 'You will be prompted to enter your password.',
  },
  errors: {
    descriptions: {
      code: `Please contact support with code "{{code}}" and describe what happened.`,
      code_1002: `Failed to parse the "{{type}}" data.`,
      code_2000: 'The password seems to be invalid.',
      code_2003: 'This account already exists.',
      code_4001: 'Your balance will fall below the minimum balance required.',
      code_4002: 'Standard assets must have a zero balance.',
      code_6000: 'There was an error starting the camera.',
      code_8000: 'The device does not support passkey for encryption.',
      code_8001: 'Failed to create a passkey on the device.',
      code_8002:
        'Failed to communicate with the passkey device. Please try again',
    },
    inputs: {
      copySeedPhraseRequired:
        'You must confirm you have copied the seed phrase',
      invalidAddress: 'Invalid address',
      invalidMnemonic: 'Invalid seed phrase',
      invalidPassword: 'Invalid password',
      passwordMinLength: 'Must be at least 8 characters',
      passwordTooWeak: 'This password is too weak',
      required: '{{name}} is required',
      tooLong: 'Too long',
      unknown: `Something doesn't look right`,
    },
    titles: {
      code: 'Well This Is Embarrassing...',
      code_1002: '1002 Parsing Error',
      code_2000: '2000 Invalid Password',
      code_2003: '2003 Account Already Exists',
      code_4001: '4001 Minimum Balance Required',
      code_4002: '4002 Assets Need A Zero Balance',
      code_6000: '6000 Camera Error',
      code_8000: '8000 Passkey Not Supported',
      code_8001: '8001 Passkey Creation Failure',
      code_8002: '8002 Passkey Communication Failed',
    },
  },
  headings: {
    accountAlreadyAdded: 'Account Already Added',
    accounts: 'Accounts',
    addAsset: 'Add Asset',
    addCustomNode: 'Add Custom Node',
    addedAccount: 'Added Account',
    addedAccounts: 'Added Account(s)',
    addedAsset: 'Added Asset {{symbol}}!',
    addPasskey: 'Add Passkey',
    addWatchAccount: 'Add A Watch Account',
    algodDetails: 'Algod Details',
    allowMainNetConfirm: 'Allow MainNet Networks',
    analyticsAndTracking: 'Analytics & Tracking',
    almostThere: 'Almost There...',
    assetDetails: 'Asset Details',
    authentication: 'Authentication',
    beta: 'Beta',
    cameraDenied: 'Camera Denied',
    cameraLoading: 'Camera Loading',
    comingSoon: 'Coming Soon!',
    confirm: 'Confirm',
    congratulations: 'Congratulations!',
    createNewAccount: 'Create A New Account',
    customNode: 'Custom Node',
    customNodeAdded: 'Custom Node Added!',
    dangerZone: 'Danger Zone',
    details: 'Details',
    developer: 'Developer',
    disconnectAllSessions: 'Disconnect All Sessions',
    enterAnAddress: 'Enter an address',
    enterYourSeedPhrase: 'Enter your seed phrase',
    factoryReset: 'Factory Reset',
    failedToGetCustomNodeDetails: 'Failed To Connect To Node',
    general: 'General',
    generateSeedPhrase: 'Generate seed phrase',
    hiddenAsset: 'Asset {{symbol}} Hidden!',
    importAccount: 'Import Account',
    importAccountViaQRCode: 'Import An Account Via A QR Code',
    importAccountViaSeedPhrase: 'Import An Account Via Seed Phrase',
    indexerDetails: 'Indexer Details',
    nameYourAccount: 'Name your account',
    network: 'Network',
    networkNotAllowed: 'Network Not Allowed',
    newAccountComplete: 'Almost There...',
    noAccountsFound: 'No accounts found',
    noAssetsFound: 'No assets found',
    noCustomNodesFound: 'No custom nodes found',
    noItemsFound: 'No items found',
    noNetworksFound: 'No networks found',
    noNFTsFound: 'No NFTs found',
    noTransactionsFound: 'No transactions found',
    noSessionsFound: 'No sessions found',
    numberOfTransactions: '{{number}} transaction',
    numberOfTransactions_multiple: '{{number}} atomic transactions',
    offline: 'Offline',
    passkeyAdded: 'Passkey Added!',
    passkeyRemoved: 'Passkey Removed',
    passwordChanged: 'Password Changed!',
    reKeyAccount: 'Re-key Account 🔒',
    reKeyAccountSuccessful: 'Successfully Re-Keyed Account!',
    removeAccount: 'Remove Account',
    removeAsset: 'Remove {{symbol}}',
    [`removeAsset_${AssetTypeEnum.ARC0200}`]: 'Hide {{symbol}}',
    removedAsset: 'Asset {{symbol}} Removed!',
    [`removedAsset_${AssetTypeEnum.ARC0200}`]: 'Asset {{symbol}} Hidden!',
    removeCustomNode: 'Remove Custom Node',
    removedCustomNode: 'Removed Custom Node',
    removePasskey: 'Remove Passkey',
    scanQrCode: 'Scan QR Code(s)',
    selectAccount: 'Select Account',
    selectAccounts: 'Select Accounts',
    selectAsset: 'Select Asset',
    selectAssets: 'Select Assets',
    selectANetwork: 'Select A Network',
    selectAnOption: 'Select An Option',
    sendAsset: 'Send {{asset}}',
    shareAddress: 'Share Address',
    screenCaptureDenied: 'Screen Capture Denied',
    screenCaptureLoading: 'Screen Capture Loading',
    transaction: 'Unknown Transaction 💀',
    [`transaction_${TransactionTypeEnum.AccountReKey}`]: 'Re-Key Account 🔒',
    [`transaction_${TransactionTypeEnum.AccountUndoReKey}`]:
      'Undo Re-Key Account 🔓',
    [`transaction_${TransactionTypeEnum.ApplicationClearState}`]:
      'Application Interaction ⚙️',
    [`transaction_${TransactionTypeEnum.ApplicationCloseOut}`]:
      'Application Interaction ⚙️',
    [`transaction_${TransactionTypeEnum.ApplicationCreate}`]:
      'Application Creation ✨',
    [`transaction_${TransactionTypeEnum.ApplicationDelete}`]:
      'Application Deletion 💥',
    [`transaction_${TransactionTypeEnum.ApplicationNoOp}`]:
      'Application Interaction ⚙️',
    [`transaction_${TransactionTypeEnum.ApplicationOptIn}`]:
      'Application Opt-In 🎟️',
    [`transaction_${TransactionTypeEnum.ApplicationUpdate}`]:
      'Application Update 🛠️',
    [`transaction_${TransactionTypeEnum.AssetConfig}`]:
      'Asset Re-configuration 🛠️',
    [`transaction_${TransactionTypeEnum.AssetCreate}`]: 'Asset Creation ✨',
    [`transaction_${TransactionTypeEnum.AssetDestroy}`]: 'Asset Destruction 💥',
    [`transaction_${TransactionTypeEnum.AssetFreeze}`]: 'Asset Freeze 🧊',
    [`transaction_${TransactionTypeEnum.AssetOptIn}`]: 'Asset Op-In 🎟️',
    [`transaction_${TransactionTypeEnum.AssetTransfer}`]: 'Asset Transfer 🪙',
    [`transaction_${TransactionTypeEnum.ARC0200AssetTransfer}`]:
      'Asset Transfer 🪙',
    [`transaction_${TransactionTypeEnum.AssetUnfreeze}`]: 'Asset Unfreeze 🚀',
    [`transaction_${TransactionTypeEnum.KeyRegistrationOffline}`]:
      'Offline Key Registration 🔑',
    [`transaction_${TransactionTypeEnum.KeyRegistrationOnline}`]:
      'Online Key Registration 🔑',
    [`transaction_${TransactionTypeEnum.Payment}`]: 'Payment 💸',
    transactionsSuccessful: 'Transaction(s) Successful!',
    undoReKey: 'Undo Re-Key 🔓',
    undoReKeyAccountSuccessful: 'Successfully Removed Re-key!',
    unknownAccount: 'Unknown Account',
    unknownAVMNetwork: 'Network Not Supported',
    unknownNetwork: 'Unknown Network',
    unknownQRCode: 'Unknown QR Code',
    welcomeBack: 'Welcome back',
  },
  labels: {
    account: 'Account',
    activate: 'Activate',
    activated: 'Activated',
    activateOnAdd: 'Activate on add?',
    activity: 'Activity',
    address: 'Address',
    addressToSign: 'Address To Sign',
    advanced: 'Advanced',
    accountName: 'Account Name',
    accountToFreeze: 'Account To Freeze',
    accountToUnfreeze: 'Account To Unfreeze',
    addAccount: 'Add Account',
    algorithm: 'Algorithm',
    allowActionTracking: 'Allow certain actions to be tracked?',
    allowBetaNet: 'Allow BetaNet networks?',
    allowDidTokenFormat: 'Allow DID token format in address sharing?',
    allowMainNet: 'Allow MainNet networks?',
    alreadyAdded: 'Already Added',
    amount: 'Amount',
    applicationId: 'Application ID',
    asset: 'Asset',
    assetId: 'Asset ID',
    assets: 'Assets',
    audience: 'Audience',
    authorizedAccounts: 'Authorized Accounts',
    authorizedAddresses: 'Authorized Addresses',
    balance: 'Balance',
    capabilities: 'Capabilities',
    chain: 'Chain',
    clawbackAccount: 'Clawback Account',
    connectWallet: 'Connect Wallet',
    copyAddress: 'Copy Address',
    copyApplicationId: 'Copy Application ID',
    copyAssetId: 'Copy Asset ID',
    copyCredentialID: 'Copy Credential ID',
    copyDeviceID: 'Copy Device ID',
    copyExtensionID: 'Copy Extension ID',
    copyGroupId: 'Copy Group ID',
    copyId: 'Copy ID',
    copyPublicKey: 'Copy Public Key',
    copySeedPhraseConfirm:
      'I confirm I have copied my seed phrase to a secure place.',
    copyTransactionId: 'Copy Transaction ID',
    copyUserID: 'Copy User ID',
    copyValue: 'Copy {{value}}',
    creatorAccount: 'Creator Account',
    credentialID: 'Credential ID',
    currentAuthorizedAccount: 'Current Authorized Account',
    dark: 'Dark',
    date: 'Date',
    deactivate: 'Deactivate',
    decimals: 'Decimals',
    default: 'Default',
    defaultFrozen: 'Default Frozen',
    deviceID: 'Device ID',
    did: 'DID',
    disabled: 'Disabled',
    disconnect: 'Disconnect',
    editAccountName: 'Rename account',
    enabled: 'Enabled',
    enablePasswordLock: 'Enable password lock?',
    experimental: 'Experimental',
    expirationDate: 'Expiration Date',
    extensionId: 'Extension ID',
    extraPayment: 'Extra Payment',
    factoryReset: 'Factory Reset',
    fee: 'Fee',
    firstRound: 'First Round',
    freezeAccount: 'Freeze Account',
    freezeAccountBalance: 'Freeze Account Balance',
    freezeManagerAccount: 'Freeze Manager Account',
    frozenAccountBalance: 'Frozen Account Balance',
    from: 'From',
    fromAccount: 'From Account',
    groupId: 'Group ID',
    hideAsset: 'Hide Asset',
    id: 'ID',
    information: 'Information',
    innerTransactions: 'Inner Transactions',
    issueDate: 'Issue Date',
    issuer: 'Issuer',
    lastRound: 'Last Round',
    light: 'Light',
    debugLogging: 'Debug Logging',
    manage: 'Manage',
    managerAccount: 'Manager Account',
    max: 'Max',
    message: 'Message',
    moreInformation: 'More Information',
    name: 'Name',
    network: 'Network',
    newPassword: 'New Password',
    nfts: 'NFTs',
    no: 'No',
    noAuthAddressAvailable:
      'This account has been re-keyed to the account {{address}}, but the address is not available or is a watch account',
    note: 'Note',
    notSupported: 'Not Supported',
    openSelectModal: 'Open select modal',
    optional: '(optional)',
    passkeyName: 'Passkey name',
    password: 'Password',
    passwordLockDuration: 'Never',
    passwordLockDuration_60000: '1 minute',
    passwordLockDuration_120000: '2 minutes',
    passwordLockDuration_300000: '5 minutes',
    passwordLockDuration_600000: '10 minutes',
    passwordLockDuration_900000: '15 minutes',
    passwordLockDuration_1800000: '30 minutes',
    passwordLockTimeout: 'Password lock timeout',
    port: 'Port',
    preferredBlockExplorer: 'Preferred Block Explorer',
    preferredNFTExplorer: 'Preferred NFT Explorer',
    publicKey: 'Public Key',
    reKey: 'Re-key',
    reKeyed: 'Re-keyed',
    reKeyedAccount: 'Re-keyed Account',
    reKeyedFrom: 'Re-keyed From',
    reKeyedToAccount: 'This account has been re-keyed to {{address}}',
    reKeyedTo: 'Re-keyed To',
    reKeyTo: 'Re-key To',
    remove: 'Remove',
    removeAccount: 'Remove Account',
    removeAsset: 'Remove Asset',
    [`removeAsset_${AssetTypeEnum.ARC0200}`]: 'Hide Asset',
    removedAccount: 'Removed Account',
    removeSession: 'Remove Session',
    reserveAccount: 'Reserve Account',
    scanQRCode: 'Scan QR Code',
    seedPhrase: 'Seed Phrase',
    selectAccount: 'Select Account',
    selectAllAccounts: 'Select All Accounts',
    selectAllAssets: 'Select All Assets',
    selectAsset: 'Select Asset',
    selectionKey: 'VRF Public Key',
    selectWalletAccount: 'Select wallet account',
    sendAsset: 'Send {{nativeCurrency}}/Asset',
    settings: 'Settings',
    shareAddress: 'Share Address',
    signingMethod: 'Signing Method',
    stateProofKey: 'State Proof Public Key',
    symbol: 'Symbol',
    theme: 'Theme',
    to: 'To',
    token: 'Token',
    tokenId: 'Token ID',
    totalSupply: 'Total Supply',
    type: 'Type',
    undoReKey: 'Undo Re-key',
    unitName: 'Unit Name',
    unknown: 'Unknown',
    unknownApp: 'Unknown App',
    unknownHost: 'unknown host',
    url: 'URL',
    userID: 'User ID',
    value: 'Value',
    version: 'Version',
    view: 'View',
    voteFirst: 'Voting First Round',
    voteKey: 'Participation Public Key',
    voteKeyDilution: 'Key Dilution',
    voteLast: 'Voting Last Round',
    yes: 'Yes',
    watch: 'Watch',
  },
  placeholders: {
    customNodeName: 'e.g. Awesome Node',
    enterAddress: 'Enter address',
    enterANameForYourAccount: 'Enter a name for your account',
    enterNote: 'Enter an optional note',
    enterPassword: 'Enter password',
    nameAccount: 'Enter a name for this account',
    passkeyName: 'e.g. Kibisis',
    pleaseSelect: 'Please select...',
    port: 'e.g. 3000',
    url: 'e.g. https://awesome.network',
  },
  titles: {
    strongPasswordPolicy: 'Strong Password Policy',
    page: '',
    page_about: 'About',
    page_accountSetup: 'Choose How To Add An Account',
    page_advanced: 'Advanced',
    page_addWatchAccount: 'Add A Watch Account',
    page_appearance: 'Appearance',
    page_changePassword: 'Change Password',
    page_createNewAccount: 'Create A New Account',
    page_createPassword: 'Secure Your Device',
    page_customNodes: 'Custom Nodes',
    page_exportAccount: 'Export Account',
    page_general: 'General',
    page_importAccountViaQRCode: 'Import An Account Via QR Code',
    page_importAccountViaSeedPhrase: 'Import An Account Via Seed Phrase',
    page_passwordLock: 'Enter Your Password',
    page_passkey: 'Passkey',
    page_privacy: 'Privacy',
    page_security: 'Security',
    page_sessions: 'Sessions',
    page_settings: 'Settings',
    page_viewSeedPhrase: 'View Seed Phrase',
  },
  values: {
    appOnComplete: 'Application Operation',
    [`appOnComplete_${TransactionTypeEnum.ApplicationClearState}`]:
      'Clear State',
    [`appOnComplete_${TransactionTypeEnum.ApplicationCloseOut}`]: 'Close Out',
    [`appOnComplete_${TransactionTypeEnum.ApplicationCreate}`]:
      'Create Application',
    [`appOnComplete_${TransactionTypeEnum.ApplicationDelete}`]:
      'Delete Application',
    [`appOnComplete_${TransactionTypeEnum.ApplicationOptIn}`]:
      'Application Opt-In',
    [`appOnComplete_${TransactionTypeEnum.ApplicationUpdate}`]:
      'Update Application',
  },
};

export default translation;
