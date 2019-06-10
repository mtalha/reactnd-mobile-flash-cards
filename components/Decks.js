import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import DeckItem from '../components/DeckItem'
import { lightPurp } from '../utils/colors'

class Decks extends React.Component {

  static navigationOptions = {
    title: 'Decks',
  };

  navigateToDeck = (deck) => {
    this.props.navigation.navigate('Deck', {
      title: deck.title,
      totalQuestions: deck.questions.length,
    });
  }

  render() {
    const { decks } = this.props.screenProps;
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        {
          decks && Object.keys(decks).map((deckID) => {
            const deck = decks[deckID];
            const totalQuestions = (deck !== null && deck.questions !== null) ? deck.questions.length : 0
            return (
              <DeckItem
                title={deck.title}
                totalQuestions={totalQuestions}
                key={deck.title}
                onPress={() => { this.navigateToDeck(deck) }}
              />
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightPurp,
  },
});

export default Decks