import { WorkspacesResponseType } from '../types/workspace';
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
      const { setSelectedWorkspace } = useSpaceStore.getState();
      const res = await axios.post(`/api/v1/organizations/${workspaceId}/select`);
      setSelectedWorkspace(workspaceId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const workspaceService = Object.freeze(new WorkspaceService());
