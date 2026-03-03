import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Alert, PermissionsAndroid, Platform, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { HomeScreen } from './src/features/home';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const setupFirebase = async () => {
      // 1. Yêu cầu quyền (Bắt buộc cho iOS và Android 13+)
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Quyền thông báo đã được cấp:', authStatus);
        
        // 2. Lấy FCM Token
        const token = await messaging().getToken();
        console.log('FCM Token của bạn là:', token);
        // Gửi token này lên Server của bạn để lưu trữ
      }
    };

    setupFirebase();

    // 3. Lắng nghe thông báo khi ứng dụng đang mở (Foreground)
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'Thông báo mới!',
        JSON.stringify(remoteMessage?.notification?.body)
      );
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: safeAreaInsets.top, marginBottom: safeAreaInsets.bottom }}>
        Hello, World!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
