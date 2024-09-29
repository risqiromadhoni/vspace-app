import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, GestureResponderEvent, Text } from 'react-native';
import type { FormSubmissionProps } from './type';
import { toast } from '@backpackapp-io/react-native-toast';
import { useSpaceStore } from './utils/store';
import { safeParse } from 'valibot';
import { spaceUrlSchema } from './utils/schema';

function FormSubmissionScreen({ navigation }: FormSubmissionProps) {
  const [submissionUrl, setSubmissionUrl] = useState('');

  const user = useSpaceStore.use.user();
  const selectedWorkspace = useSpaceStore.use.selectedWorkspace();

  const handleSubmitForm = (e: GestureResponderEvent) => {
    e.preventDefault();
    const submissionUrlParsed = safeParse(spaceUrlSchema, submissionUrl);
    if (submissionUrlParsed.success) {
      return navigation.navigate('WebView', {
        submissionUrl: submissionUrl,
      });
    }
    return toast.error(submissionUrlParsed.issues.map((issue) => issue.message).join('\n'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.workspace}>Workspace: {selectedWorkspace?.data?.data?.attributes?.name}</Text>
      <Text style={styles.info}>
        Signed as: {user?.email}
      </Text>
      <Text style={styles.info}>
        Copy and paste the form submission URL from the chat message.
      </Text>
      <TextInput
        multiline
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
    height: 80,
    textAlignVertical: 'top',
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
