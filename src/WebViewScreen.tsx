import React, { useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewMessageEvent } from 'react-native-webview';
import type { AuthPostMessagePayload, AuthPostMessageResponse, WebViewScreenProps } from './type';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import { useSpaceStore } from './utils/store';
import superjson from 'superjson';

function WebViewScreen({ route }: WebViewScreenProps) {
  const { submissionUrl } = route.params;
  const webViewRef = useRef<WebView>(null);

  const accessToken = useSpaceStore.use.accessToken();

  /**
   * Handle the webview load event
   * Post a message to the webview with the access token
   */
  const handleOnLoad = useCallback(() => {
    if (!accessToken) {
      return toast.error('Access token not found', {
        position: ToastPosition.BOTTOM,
        isSwipeable: true,
      });
    }
    const message: AuthPostMessagePayload = {
      type: 'AUTH',
      data: { accessToken },
    };
    const payload = superjson.stringify(message);
    webViewRef.current?.postMessage(payload);
  }, [accessToken]);

  /**
   * Handle message from the webview
   */
  const handleMessage = (event: WebViewMessageEvent) => {
    // Check if the message is coming from the expected origin
    // Replace 'https://virtualspace.ai/' with your app's actual scheme
    // if (event.origin !== "https://virtualspace.ai/") return;
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
        onLoadEnd={handleOnLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
