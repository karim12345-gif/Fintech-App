import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/services/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserInactivityProvider } from '@/context/UserInactivity';

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="singUp"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.dark} />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <Link href={'/help'} replace asChild>
              <TouchableOpacity>
                <Ionicons name="help-circle-outline" size={24} color={Colors.dark} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }} />

      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerShown: false,
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />

      <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerTransparent: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="star-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/lock"
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/account"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-outline" size={34} color={'#fff'} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <UserInactivityProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <InitialLayout />
          </GestureHandlerRootView>
        </UserInactivityProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
