import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StarterStatus } from '@/components/starter-status';
import { getRuntimeConfig } from '@/lib/runtime/config';

export default function HomeScreen() {
  const runtime = getRuntimeConfig();

  return (
    <View style={styles.container}>
      <StarterStatus environment={runtime.environment} gitSha={runtime.release.gitSha} />

      <Text style={styles.body}>
        Minimal executable baseline for the React Native production golden path.
      </Text>

      <Link href="/debug" asChild>
        <Pressable
          accessibilityRole="button"
          testID="open-diagnostics"
          style={styles.button}>
          <Text style={styles.buttonText}>Open diagnostics</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
