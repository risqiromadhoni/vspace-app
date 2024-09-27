import DeviceInfo from 'react-native-device-info';
import axios from './axios';
import { useSpaceStore } from '../utils/store';
import type { LoginResponseType } from '../types/user';

class AuthService {
  async getMacAddress() {
    return await DeviceInfo.getMacAddress();
  }
  async login(email: string, password: string) {
    try {
      const { setTokens, setUser } = useSpaceStore.getState();
      const macAddress = await this.getMacAddress();
      const res = await axios.post<LoginResponseType>('/api/v4/sign_in/authorization', {
        email,
        password,
      }, {
        headers: {
          'mac-address': macAddress,
        },
      });

      if (res.headers && res.headers.token && res.headers['refresh_token']) {
        setTokens(res.headers.token, res.headers['refresh_token']);
      }

      if (res.data?.message?.user) {
        setUser(res.data.message.user);
      }

      return res;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      const { resetStore } = useSpaceStore.getState();
      return resetStore();
    } catch (error) {
      throw error;
    }
  }
}

export const authService = Object.freeze(new AuthService());
