enum AccountsThunkEnum {
  FetchAccountsFromStorage = 'accounts/fetchAccountsFromStorage',
  RemoveAccountById = 'accounts/removeAccountById',
  SaveNewAccount = 'accounts/saveNewAccount',
  StartPollingForAccountInformation = 'accounts/startPollingForAccountInformation',
  StopPollingForAccountInformation = 'accounts/stopPollingForAccountInformation',
  UpdateAccountInformation = 'accounts/updateAccountInformation',
  UpdateAccountTransactionsForAccount = 'accounts/updateAccountTransactionsForAccount',
}

export default AccountsThunkEnum;
