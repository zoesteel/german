import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import {
  SafeAreaView
} from 'react-native-safe-area-context';

import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';
// import { AD_UNIT_IDS } from '@/constants/ads';

import { Colors } from '../constants/theme';

export default function ResultScreen() {
  const { 'article': article, 'word': word } = useLocalSearchParams<{ 'article': string, 'word': string }>();

  const [bgColor, setBgColor] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [displayArticle, setDisplayArticle] = useState('');
  // const [adLoaded, setAdLoaded] = useState(false)

  // const bannerRef = useRef<BannerAd>(null);

  // useForeground(() => {
  //   Platform.OS === 'ios' && bannerRef.current?.load();
  // });

  const genders = {
    m: 'der',
    f: 'die',
    n: 'das',
  };

  const colours = {
    m: {
      bg: '#375785',
      button: '#0E2B57'
    },
    f: {
      bg: '#F57373',
      button: '#D24747'
    },
    n: {
      bg: '#4EA699',
      button: '#187E70'
    },
  };

  useEffect(() => {
    switch(article) {
      case 'm':
        setBgColor(colours.m.bg);
        setButtonColor(colours.m.button);
        setDisplayArticle(genders.m);
        return;
      case 'f':
        setBgColor(colours.f.bg);
        setButtonColor(colours.f.button);
        setDisplayArticle(genders.f);
        return;
      case 'p':
        setBgColor(colours.f.bg);
        setButtonColor(colours.f.button);
        setDisplayArticle(genders.f);
        return;
      case 'n':
        setBgColor(colours.n.bg);
        setButtonColor(colours.n.button);
        setDisplayArticle(genders.n);
        return;
    }
  }, [article])

  return (
    <>
      <SafeAreaView style={[styles.outerContainer, { backgroundColor: bgColor }]}>
        <View style={styles.container}>
          <Text style={styles.text}>{`${displayArticle} ${word}`}</Text>
          <Button
            onPress={() => router.push('/')}
            mode='contained'
            dark={true}
            style={[styles.backButton, { backgroundColor: buttonColor }]}
            labelStyle={{ fontFamily: 'Figtree' }}
          >
            Search again
          </Button>
        </View>
      </SafeAreaView>
      {/* <BannerAd
        ref={bannerRef}
        unitId={AD_UNIT_IDS?.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => console.log('Failed to load banner', error)}
      />
      {!adLoaded && <View style={{width: 300, height: 60, alignSelf: 'center' }}></View>}
       */}
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Figtree',
    textAlign: 'center',
    color: Colors.dark.text,
  },
  backButton: {
    marginTop: 10,
    width: '100%',
  },
  image: {
    height: '100%',
    borderRadius: '4%',
  },
});
