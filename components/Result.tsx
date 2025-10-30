import {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router, useLocalSearchParams, Link } from 'expo-router';
import { Header } from './Header';

type ResultProps = {
  word: string,
  article: string
};

export const Result: React.FC<ResultProps> = ({ word, article }) => {
  const [bgColor, setBgColor] = useState('purple');
  const [displayArticle, setDisplayArticle] = useState('');

  const genders = {
    m: 'der',
    f: 'die',
    n: 'das',
  };

  // const colours = {
  //   m: '#77BEF0',
  //   f: '#FF8383',
  //   n: '#A1D6CB',
  // };

  const colours = {
    m: '#375785',
    f: '#d86b9c',
    n: '#4EA699',
  };

  useEffect(() => {
    switch(article) {
      case 'm':
        setBgColor(colours.m);
        setDisplayArticle(genders.m);
        return;
      case 'f':
        setBgColor(colours.f);
        setDisplayArticle(genders.f);
        return;
      case 'n':
        setBgColor(colours.n);
        setDisplayArticle(genders.n);
        return;
    }
  }, [article])

  return (
    <>
      <Header />
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={styles.text}>{`${displayArticle} ${word}`}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
