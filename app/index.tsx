import { Link, router, useFocusEffect } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { getArticleForWord } from '../utils/searchGermanWords';
import { migrateCsvToDatabase } from '../utils/csvMigration';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
// @ts-ignore
import { coffeeIcon } from '@/assets/images/bmc-full-logo.svg.js';
import { Header } from '@/components/Header';
import { icon } from '@/assets/images/icon.svg.js';


export default function HomeScreen() {
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  const [result, setResult] = useState({
    article: '',
    word: '',
  });

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
    const articleResult = await getArticleForWord(searchTerm.trim());
    const resultData = articleResult;
    if(!resultData) {
      setErrorMessage('Word not found');
      return;
    }
    setResult({...resultData})
    router.push({ pathname: "/result", params: { ...resultData } });
  };

  // const colours = {
  //   m: '#6D67E4',
  //   f: '#ED9ED6',
  //   n: '#46C2CB',
  // };

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
            <View>
              <Searchbar
                placeholder="Search for a word (e.g. Katze)"
                onChangeText={updateSearch}
                value={searchTerm}
                 icon={(props) => (
                  <SvgXml
                    xml={icon}
                    width={24}
                    height={24}
                    fill={props.color}  // use the color provided by Paper for consistency
                  />
                )}
                onIconPress={() => handleSearch(searchTerm)}
                style={errorMessage ? styles.searchError : styles.searchBar}
                inputStyle={{
                  color: '#d8d2eb',
                }}
                iconColor="#d8d2eb"
                placeholderTextColor="#d8d2eb"
                selectionColor="#c6b4ff" // cursor/selection
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
                // disabled={!searchTerm}
                // labelStyle={{ fontFamily: 'RibeyeMarrow' }}
              >
                Search
              </Button>
            </View>

            <View style={styles.coffeeLink}>
              <Link href="https://buymeacoffee.com/zoesteel">
                <SvgXml xml={coffeeIcon} height="32" style={styles.image}/>
              </Link>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // justifyContent: 'space-between',
    backgroundColor: '#4f4085',
    paddingHorizontal: 20,
    color: '#c6b4ff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#1c1438',
    borderWidth: 3,
    borderColor: 'transparent',
    // fontFamily: 'Figtree',
    marginVertical: 10,
  },
  searchError: {
    backgroundColor: '#1c1438',
    borderColor: '#BE3144',
    borderWidth: 3,
  },
  coffeeLink: {
    height: '5%',
    width: '50%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  error: {
    borderRadius: 10,
    padding: 10,
    height: 50,
    color: '#c6b4ff',
    // fontFamily: 'Figtree',
  },
  searchButton: {
    marginTop: 30,
    // fontFamily: 'Figtree',
    color: '#c6b4ff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#c6b4ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#8b7db8',
    textAlign: 'center',
  },
  link: {},
  image: {
    height: '100%',
    borderRadius: '4%',
  },
});
