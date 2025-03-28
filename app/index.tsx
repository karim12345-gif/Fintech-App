import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Page = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          isMuted
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you earn!</Text>
      </View>

      <View style={styles.buttons}>
        {/* sign up */}
        <Link
          href={'/singUp'}
          style={[
            defaultStyles.pillButton,
            {
              flex: 1,
              backgroundColor: Colors.dark,
            },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Sign Up</Text>
          </TouchableOpacity>
        </Link>

        {/* Login */}
        <Link
          href={'/login'}
          style={[
            defaultStyles.pillButton,
            {
              flex: 1,
              backgroundColor: 'white',
            },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: 'dark', fontSize: 22, fontWeight: '500' }}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  titleContainer: {
    marginTop: 80,
    padding: 20,
  },

  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
    gap: 20,
  },
});
