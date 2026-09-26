import { StyleSheet, Text, View } from 'react-native';

import type { AppEnvironment } from '@/lib/runtime/config';

type StarterStatusProps = {
  environment: AppEnvironment;
  gitSha: string;
};

export function StarterStatus({ environment, gitSha }: StarterStatusProps) {
  return (
    <View accessibilityLabel="Starter runtime status" style={styles.container}>
      <Text style={styles.title}>Production Starter</Text>
      <Text style={styles.row}>Environment: {environment}</Text>
      <Text style={styles.row}>Revision: {gitSha}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  row: {
    fontSize: 16,
  },
});
