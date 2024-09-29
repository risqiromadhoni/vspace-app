import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewMessageEvent } from 'react-native-webview';
import type { AuthPostMessagePayload, AuthPostMessageResponse, WebViewScreenProps } from './type';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import { useSpaceStore } from './utils/store';
import { webviewOriginWhiteList } from './utils/schema';

function WebViewScreen({ route }: WebViewScreenProps) {
  const { submissionUrl } = route.params;
  const webViewRef = useRef<WebView>(null);

  const accessToken = useSpaceStore.use.accessToken();
  const selectedWorkspace = useSpaceStore.use.selectedWorkspace();

  /**
   * Alternative if postMessage is not working
   * @see https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#communicating-between-js-and-native
   */
  // useEffect(() => {
  //   if (webViewRef.current && accessToken && selectedWorkspace) {
  //     // Should set cookie for accessToken with key name is identity
  //     const cookie = `identity=${accessToken}; path=/; domain=.virtualspace.ai`;
  //     // Should set localStorage for selectedWorkspace with key name is vspace-selected-workspace
  //     const localStorage = `localStorage.setItem('vspace-selected-workspace', '${JSON.stringify(selectedWorkspace)}')`;
  //     const INJECT_SCRIPT = `
  //       (function() {
  //         document.cookie = '${cookie}';
  //         ${localStorage};
  //       })();
  //     `;
  //     webViewRef.current?.injectJavaScript(INJECT_SCRIPT);
  //   }
  // }, [webViewRef, accessToken, selectedWorkspace]);

  /**
   * Handle the webview load event
   * Post a message to the webview with the access token
   */
  useEffect(() => {
    if (webViewRef.current && accessToken && selectedWorkspace) {
      const message: AuthPostMessagePayload = {
        type: 'VSPACE_AUTH',
        data: { accessToken, selectedWorkspace },
      };
      const payload = JSON.stringify(message);
      webViewRef.current?.postMessage(payload);
    }
  }, [webViewRef, accessToken, selectedWorkspace]);

  /**
   * Handle message from the webview
   */
  const handleMessage = (event: WebViewMessageEvent) => {
    // Check if the message is coming from the expected origin
    // Replace 'https://virtualspace.ai/' with your app's actual scheme
    // if (event.origin !== "https://virtualspace.ai/") return;
    const eventData = JSON.parse(event.nativeEvent.data) as AuthPostMessageResponse;
    if (eventData.type !== 'VSPACE_AUTH_RESPONSE') {
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
        onMessage={handleMessage}
        source={{ uri: submissionUrl }}
        originWhitelist={webviewOriginWhiteList}
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
