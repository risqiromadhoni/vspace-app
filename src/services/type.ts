import type { AxiosResponse } from 'axios';

interface MetaProps {
  token: string;
  refreshToken: string;
}

interface PubnubProps {
  ['auth-key']: string;
}

interface OnesignalProps {
  external_user_id: string;
  organization_user_id: string;
}

export interface SpaceAxiosResponse extends AxiosResponse {
  meta?: MetaProps;
  pubnub?: PubnubProps;
  onesignal?: OnesignalProps;
}
