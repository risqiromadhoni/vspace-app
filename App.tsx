import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/LoginScreen';
import WorkspaceListScreen from './src/WorkspaceListScreen';
import WebViewScreen from './src/WebViewScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { RootStackParamList } from './src/type';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toasts } from '@backpackapp-io/react-native-toast';
import FormSubmissionScreen from './src/FormSubmissionScreen';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="WorkspaceList" component={WorkspaceListScreen} options={{ title: 'Select Workspace' }} />
            <Stack.Screen name="FormSubmission" component={FormSubmissionScreen} options={{ title: 'Form Submission URL' }} />
            <Stack.Screen name="WebView" component={WebViewScreen} options={{ title: 'Submit Form' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toasts />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
