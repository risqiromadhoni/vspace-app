import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { UserType } from './types/user';
import type { Organization, PostSelectWorkspaceResponse } from './types/workspace';

export type RootStackParamList = {
  Login: undefined;
  WorkspaceList: undefined;
  FormSubmission: undefined;
  WebView: {
    submissionUrl: string;
  };
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type WebViewScreenProps = NativeStackScreenProps<RootStackParamList, 'WebView'>;
export type FormSubmissionProps = NativeStackScreenProps<RootStackParamList, 'FormSubmission'>;
export type WorkspaceListScreenProps = NativeStackScreenProps<RootStackParamList, 'WorkspaceList'>;

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export interface SpaceStateType {
  workspaces: Organization[];
  selectedWorkspace: PostSelectWorkspaceResponse | null;
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface SpaceActionsType {
  setWorkspaces: (workspaces: any[]) => void;
  setSelectedWorkspace: (workspace: any) => void;
  setUser: (user: UserType) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  resetStore: () => void;
}

export type SpaceStoreType = SpaceStateType & SpaceActionsType;

/**
 * Post message payload for authentication
 */
export type AuthPostMessagePayload = {
  type: 'VSPACE_AUTH';
  /**
   * Authentication jwt token from mmkv
   */
  data: {
    accessToken: string;
    selectedWorkspace: PostSelectWorkspaceResponse;
  };
}

/**
 * Post message response for authentication
 */
export type AuthPostMessageResponse = {
  type: 'VSPACE_AUTH_RESPONSE';
  /**
   * Success status of the authentication
   */
  success: boolean;
  /**
   * Error message if any
   */
  message: string;
}
