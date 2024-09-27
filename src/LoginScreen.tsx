import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import type { LoginScreenProps } from './type';
import { toast } from '@backpackapp-io/react-native-toast';
import { safeParse } from 'valibot';
import { loginFormSchema } from './utils/schema';
import { authService } from './services/auth';
import { workspaceService } from './services/workspace';
import { useSpaceStore } from './utils/store';

function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcess, setIsProcess] = useState(false);

  const resetStore = useSpaceStore.use.resetStore();

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    const tId = toast.loading('Logging in...');
    const validateLogin = safeParse(loginFormSchema, { email, password });
    if (!validateLogin.success) {
      setIsProcess(false);
      return toast.error(validateLogin.issues.map((issue) => issue.message).join('\n'));
    }
    setIsProcess(true);
    try {
      await authService.login(email, password);
      await workspaceService.getWorkSpaces();
      return navigation.navigate('WorkspaceList');
    } catch (error) {
      console.error('Login failed:', error);
      resetStore();
      return toast.error('Login failed. Please try again.');
    } finally {
      setIsProcess(false);
      toast.dismiss(tId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} disabled={isProcess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
