import { PostSelectWorkspaceResponse, WorkspacesResponseType } from '../types/workspace';
import { useSpaceStore } from '../utils/store';
import axios from './axios';

class WorkspaceService {
  async getWorkSpaces() {
    try {
      const { setWorkspaces } = useSpaceStore.getState();
      const res = await axios.get<WorkspacesResponseType>('/api/v3/members/organizations');
      if (res.data.organizations) {
        setWorkspaces(res.data.organizations);
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async postSelectWorkspace(workspaceId: string) {
    try {
      const res: any = await axios.post(`/api/v1/organizations/${workspaceId}/select`);
      return {
        data: res.data,
        onesignal: res?.onesignal,
        pubnub: res.pubnub,
        ['web-chat-version']: res['web-chat-version'],
      } as PostSelectWorkspaceResponse;
    } catch (error) {
      throw error;
    }
  }
}

export const workspaceService = Object.freeze(new WorkspaceService());
