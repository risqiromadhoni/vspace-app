import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, GestureResponderEvent, Text } from 'react-native';
import type { FormSubmissionProps } from './type';
import { toast } from '@backpackapp-io/react-native-toast';
import { useSpaceStore } from './utils/store';

function FormSubmissionScreen({ navigation }: FormSubmissionProps) {
  const [submissionUrl, setSubmissionUrl] = useState('');

  const user = useSpaceStore.use.user();
  const selectedWorkspaceId = useSpaceStore.use.selectedWorkspace();
  const workspace = useSpaceStore.use.workspaces()
    .find((w) => w.id === selectedWorkspaceId);

  const handleSubmitForm = (e: GestureResponderEvent) => {
    e.preventDefault();
    if (submissionUrl) {
      return navigation.navigate('WebView', {
        submissionUrl,
      });
    }
    return toast.error('Please enter a valid URL');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.workspace}>Workspace: {workspace?.name}</Text>
      <Text style={styles.info}>
        Signed as: {user?.email}
      </Text>
      <Text style={styles.info}>
        Copy and paste the form submission URL from the chat message.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Form Submission URL"
        value={submissionUrl}
        onChangeText={setSubmissionUrl}
        keyboardType="url"
        autoCapitalize="none"
      />
      <Button title="Submit Form" onPress={handleSubmitForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  workspace: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  info: {
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default FormSubmissionScreen;
