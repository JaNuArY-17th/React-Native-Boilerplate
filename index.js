// index.js
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Nhận thông báo ở Background:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);