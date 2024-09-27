import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import type { AuthPostMessagePayload, AuthPostMessageResponse, WebViewScreenProps } from './type';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import { useSpaceStore } from './utils/store';
import superjson from 'superjson';

export default function WebViewScreen({ route }: WebViewScreenProps) {
  const { submissionUrl } = route.params;
  const webViewRef = useRef<WebView>(null);

  const accessToken = useSpaceStore.use.accessToken();

  useEffect(() => {
    if (accessToken) {
      const timer = setTimeout(() => {
        const message: AuthPostMessagePayload = {
          type: 'AUTH',
          data: { accessToken },
        };
        webViewRef.current?.postMessage(superjson.stringify(message));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [accessToken]);

  const handleMessage = (event: WebViewMessageEvent) => {
    const eventData = JSON.parse(event.nativeEvent.data) as AuthPostMessageResponse;
    if (eventData.type !== 'AUTH_RESPONSE') {
      return;
    }
    if (eventData.success) {
      return toast.success('Authentication successful', { 
        position: ToastPosition.BOTTOM,
        isSwipeable: true,
      });
    }
    return toast.error('Authentication failed', {
      position: ToastPosition.BOTTOM,
      isSwipeable: true,
    });
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: submissionUrl }}
        onMessage={handleMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
