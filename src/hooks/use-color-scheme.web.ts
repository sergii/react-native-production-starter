import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Return the platform color scheme without introducing hydration-only component state.
 *
 * The production starter does not use this helper in its root navigation. It remains available
 * for generated example components until those components are removed.
 */
export function useColorScheme() {
  return useRNColorScheme() ?? 'light';
}
