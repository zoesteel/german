import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import {
  SafeAreaView
} from 'react-native-safe-area-context';

import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

export default function ResultScreen() {
  const { 'article': article, 'word': word } = useLocalSearchParams<{ 'article': string, 'word': string }>();

  const [bgColor, setBgColor] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [displayArticle, setDisplayArticle] = useState('');
  const [adLoaded, setAdLoaded] = useState(false)

  const bannerRef = useRef<BannerAd>(null); 
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  const genders = {
    m: 'der',
    f: 'die',
    n: 'das',
  };

  // const colours = {
  //   m: '#77BEF0',
  //   f: '#f47373',
  //   n: '#e9f066',
  // };
  const colours = {
    m: {
      bg: '#375785',
      button: '#0E2B57'
    },
    f: {
      bg: '#d86b9c',
      button: '#A5235E'
    },
    n: {
      bg: '#4EA699',
      button: '#187E70'
    },
    // 4cc9f0
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
      {/* <Header /> */}
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
          {/* <View style={{width: 320, height: 50, backgroundColor:'red', alignSelf: 'center' }}></View> */}
          {/* <View style={styles.coffeeLink}>
            <Link href='https://buymeacoffee.com/zoesteel'>
              {/* <Image
                source={require('@/assets/images/violet-button.png')}
                style={styles.image}
              /> */}

              {/* <SvgXml xml={coffeeIcon} height="32" style={styles.image}/>
            </Link>
          </View> */}
        </View>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => console.log('Failed to load banner', error)}
      />
      {!adLoaded && <View style={{width: 320, height: 60, alignSelf: 'center' }}></View>}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
    // color: '#c6b4ff',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    // height: '100%',
    justifyContent: 'center',
    // backgroundColor: '#4f4085',
    paddingHorizontal: 20,
    paddingVertical: 20,
    // color: '#ffffff',
  },
  container: {
    justifyContent: 'space-evenly',
    // height: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Figtree',
    textAlign: 'center',
    color: '#ffffff',
  },
  backButton: {
    marginTop: 10,
    width: '100%',
  },
  coffeeLink: {
    height: '5%',
    width: '50%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    borderRadius: '4%',
  },
});