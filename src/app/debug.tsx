import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { getBuildInfo } from '@/lib/runtime/build-info';

export default function DebugScreen() {
  const buildInfo = getBuildInfo();

  return (
    <>
      <Stack.Screen options={{ title: 'Diagnostics' }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>Build diagnostics</Text>
        <Text style={styles.description}>
          Support-safe release metadata only. Secrets and credentials must never appear here.
        </Text>

        {buildInfo.map((item) => (
          <View key={item.label} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text selectable style={styles.value}>
              {item.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  row: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
  },
});
