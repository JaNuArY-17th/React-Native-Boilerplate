import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/shared/themes';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Boilerplate Mobile App</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          This is a clean boilerplate for mobile app development.
        </Text>
        <Text style={styles.description}>
          Start building your features here!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  header: {
    marginVertical: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    // secondary text color is under the `text` object
    color: colors.text.secondary,
  },
  content: {
    marginVertical: spacing.lg,
  },
  description: {
    fontSize: 14,
    // reuse primary text color for body text
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
});

export default HomeScreen;