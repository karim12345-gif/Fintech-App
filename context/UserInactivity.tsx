import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'inactivty-storage',
});

export const UserInactivityProvider = ({ children }: any) => {
  const INACTIVITY_THRESHOLD = 3000; // 3 seconds
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background') {
      recordStartTime();
      console.log(nextAppState);
    } else if (nextAppState === 'active' && appState.current.match(/background/)) {
      const elapsed = Date.now() - (storage.getNumber('startTime') || 0);

      if (elapsed > INACTIVITY_THRESHOLD) {
        console.log('🚀 ~ handleAppStateChange ~ elapsed:', elapsed);
        router.replace('/(authenticated)/(modals)/lock');
      }
    }

    // ✅ Always update current state
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    console.log('Recording start time');
    storage.set('startTime', Date.now());
  };

  return children;
};
