// src/auth/handleRedirect.ts
import { AuthClient } from '@dfinity/auth-client';
import { DelegationIdentity } from '@dfinity/identity';

export async function handleRedirect(): Promise<DelegationIdentity> {
  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();

  if (!(identity instanceof DelegationIdentity)) {
    throw new Error('Identity is not a DelegationIdentity');
  }

  return identity;
}
