import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'plantapp_jwt_token';
const EMAIL_KEY = 'plantapp_user_email';

export const authStorage = {
  async saveSession(token: string, email: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(EMAIL_KEY, email);
  },

  async getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  async getEmail(): Promise<string | null> {
    return SecureStore.getItemAsync(EMAIL_KEY);
  },

  async clearSession(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(EMAIL_KEY);
  },

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  },
};
