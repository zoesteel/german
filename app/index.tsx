import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import {
    SafeAreaView
} from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { migrateCsvToDatabase } from '../utils/csvMigration';
import { getArticleForWord } from '../utils/searchGermanWords';
// @ts-ignore
import { icon } from '@/assets/images/icon.svg.js';
import { Header } from '@/components/Header';
import { Colors } from '../constants/theme';

import { AD_UNIT_IDS } from '@/constants/ads';
import analytics from '@react-native-firebase/analytics';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

export default function HomeScreen() {
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const bannerRef = useRef<BannerAd>(null);
  const [adLoaded, setAdLoaded] = useState(false)
  const [result, setResult] = useState({
    article: '',
    word: '',
  });

  useEffect(() => {
    const screenVisitAnalytics = async () => {
      try {
        await analytics().logScreenView({
          screen_name: 'HomeScreen',
          screen_class: 'HomeScreen',
        });
      } catch (error) {
        console.log('Firebase Analytics not ready');
      }
    }

    // Delay analytics call to ensure Firebase is initialized
    setTimeout(screenVisitAnalytics, 2000);
  }, [])

  // Reset search term when the screen comes into focus
  // useFocusEffect(() => {
  //   setSearchTerm('');
  //   // setErrorMessage('');
  // });

  // Initialize database on app start
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing database...');
        await migrateCsvToDatabase();
        console.log('Database ready!');
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setErrorMessage('Failed to initialize app. Please restart.');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    if(!searchTerm.trim()) {
      setErrorMessage('Please enter a word');
      return;
    };
    
    // Log search event - with error handling
    try {
      await analytics().logEvent('button_clicked', {
        button_name: 'word_search'
      });
    } catch (error) {
      // Analytics failed, continue with search
    }

    const articleResult = await getArticleForWord(searchTerm.trim());
    const resultData = articleResult;
    if(!resultData) {
      setErrorMessage('Word not found');
      return;
    }
    setResult({...resultData})
    router.push({ pathname: "/result", params: { ...resultData } });
  };

  const updateSearch = (searchTerm: any) => {
    setSearchTerm(searchTerm);
    if (!searchTerm.trim()) {
      setErrorMessage('');
    }
  };

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        {isInitializing ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Setting up app...</Text>
            <Text style={styles.loadingSubtext}>This only happens once</Text>
          </View>
        ) : (
          <>
            <View style={styles.contentWrapper}>
              <Searchbar
                placeholder="Search for a word (e.g. Katze)"
                onChangeText={updateSearch}
                value={searchTerm}
                 icon={(props) => (
                  <SvgXml
                    xml={icon}
                    width={24}
                    height={24}
                    fill={props.color}
                  />
                )}
                onIconPress={() => handleSearch(searchTerm)}
                style={errorMessage ? styles.searchError : styles.searchBar}
                inputStyle={{
                  color: Colors.dark.text,
                }}
                iconColor={Colors.dark.text}
                placeholderTextColor={Colors.dark.text}
                selectionColor={Colors.dark.text} // cursor/selection
              />
              <View style={styles.error}>
              {errorMessage && 
                <Text style={styles.error}>{errorMessage}</Text>
              }
              </View>
              <Button
                onPress={() => handleSearch(searchTerm)}
                mode='contained'
                dark={true}
                style={styles.searchButton}
                buttonColor={Colors.light.secondary}
                disabled={!searchTerm}
              >
                Search
              </Button>
            </View>
          </>
        )}
      </SafeAreaView>
      <BannerAd
        ref={bannerRef}
        unitId={AD_UNIT_IDS?.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => console.log('Failed to load banner', error)}
      />
      {!adLoaded && <View style={{width: 300, height: 60, alignSelf: 'center' }}></View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
    color: Colors.dark.text,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -150
  },
  searchBar: {
    backgroundColor: Colors.light.text,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  searchError: {
    backgroundColor: Colors.light.text,
    borderColor: Colors.light.primary,
    borderWidth: 3,
  },
  error: {
    borderRadius: 10,
    padding: 10,
    height: 50,
    color: Colors.light.text,
  },
  searchButton: {
    marginTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingSubtext: {
    fontSize: 14,
    color: Colors.light.text,
    textAlign: 'center',
  },
  link: {},
  image: {
    height: '100%',
    borderRadius: '4%',
  },
});
