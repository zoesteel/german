import { icon } from '@/assets/images/icon.svg.js';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { Colors } from '../constants/theme';

export const Header: React.FC = () => {
  return (
    <View style={styles.shadowWrapper}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <SvgXml xml={icon} width={140} height={140} style={styles.icon} />
        <View style={styles.container}>
          <Text style={styles.text}>gender reveal</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: Colors.light.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.50,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 100,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center',
    top: -12,
    left: -16,
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeAreaContainer: {
    backgroundColor: Colors.light.primary,
    width: '100%',
    paddingTop: 16,
    paddingBottom: 12,
  },
  text: {
    fontSize: 20,
    color: Colors.dark.text,
    fontFamily: 'DynaPuff'
  },
});