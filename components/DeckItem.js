import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white, orange } from '../utils/colors';

function DeckItem ({ title, totalQuestions, onPress }) {
  return (
    <TouchableOpacity style={styles.deckItemContainer} onPress={onPress}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subTitle}>
        {totalQuestions} {totalQuestions === 1 ? 'card' : 'cards'}
      </Text>
      <View style = {styles.lineStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckItemContainer: {
    paddingTop: 20,
  },
  title: {
    color: white,
    fontSize: 30,
    textAlign: 'center',
  },
  subTitle: {
    color: orange,
    fontSize: 20,
    textAlign: 'center',
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor: white,
    marginBottom: 15,
    marginTop: 15,
  }
});

export default DeckItem