import { icon } from '@/assets/images/icon.svg.js';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

export const Header: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
          <SvgXml xml={icon} width="50" height="32" />
          <Text style={styles.text}>gender reveal</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    // // alignItems: 'center',
    // flexDirection: 'row',
    justifyContent: 'center',
    // // backgroundColor: '#1c1438ff',
    // width: '100%',
    // // // paddingBottom: 20,/
   
  },
  safeAreaContainer: {
    backgroundColor: '#1c1438',
    width: '100%',
    paddingTop: 30,
    // paddingVertical: 20,
    shadowColor: "#f8f8f8ff",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    color: '#d8d2eb',
    fontFamily: 'DynaPuff'
  },
});