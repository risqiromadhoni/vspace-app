import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import type { GestureResponderEvent, ListRenderItemInfo } from 'react-native';
import type { WorkspaceListScreenProps } from './type';
import { useSpaceStore } from './utils/store';
import { authService } from './services/auth';
import type { Organization } from './types/workspace';
import { workspaceService } from './services/workspace';
import { toast } from '@backpackapp-io/react-native-toast';

function WorkspaceListScreen({ navigation }: WorkspaceListScreenProps) {
  const workspaces = useSpaceStore.use.workspaces();
  const setSelectedWorkspace = useSpaceStore.use.setSelectedWorkspace();

  const handleOnLogout = async (e: GestureResponderEvent) => {
    e.preventDefault();
    await authService.logout();
    return navigation.navigate('Login');
  };

  const handleWorkspaceSelect = async (e: GestureResponderEvent, workspace: Organization) => {
    e.preventDefault();
    try {
      const resSelectWorkspace = await workspaceService.postSelectWorkspace(workspace.id);
      setSelectedWorkspace(resSelectWorkspace);
      return navigation.navigate('FormSubmission');
    } catch (error) {
      console.error('Failed to select workspace:', error);
      return toast.error('Failed to select workspace. Please try again.');
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Organization>) => (
    <TouchableOpacity
      style={styles.item}
      onPress={(e) => handleWorkspaceSelect(e, item)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workspaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Logout" onPress={handleOnLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default WorkspaceListScreen;
