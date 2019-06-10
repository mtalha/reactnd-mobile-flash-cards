import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  AsyncStorage
} from 'react-native';
import ActionButton from '../components/ActionButton';
import { purple, lightPurp, orange, white, gray, red, green } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { getDeckObject, KEY_DECKS_STORAGE } from '../utils/api'

class AttemptQuiz extends React.Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  state = {
    title: null,
    currentQuestion: 0,
    viewFront: true,
    totalCorrect: 0,
    questions: [],
    loading: true,
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');

    const deck = await getDeckObject(title)
    if (deck !== null) {
      this.setState({
        title: deck.title,
        questions: deck.questions,
        loading: false
      })
      clearLocalNotification();
      setLocalNotification();
    } else {
      this.setState({
        loading: false
      })
    }
  }

  flipCard = () => {
    this.setState((prev) => ({
      viewFront: !prev.viewFront
    }));
  };

  correct = () => {
    this.setState((prev) => ({
      totalCorrect: ++prev.totalCorrect,
      currentQuestion: ++prev.currentQuestion,
      viewFront: true,
    }));
  };

  incorrect = () => {
    this.setState((prev) => ({
      currentQuestion: ++prev.currentQuestion,
      viewFront: true,
    }));
  };

  render() {
    const { questions, currentQuestion, viewFront, totalCorrect, title } = this.state;
    const { navigation } = this.props;

    if (questions.length && currentQuestion === questions.length) {
      //result view
      return (
        <View style={styles.container}>
          <Text style={styles.question}>
            You got {totalCorrect} out of {questions.length} questions correct!
          </Text>
          <ActionButton
            style={{ padding: 10, backgroundColor: gray }}
            outline
            onPress={() => {
              navigation.navigate('Deck', {
                title,
              });
            }}
          >
            Back To Deck
        </ActionButton>
          <ActionButton
            style={{ padding: 10, marginTop: 20, backgroundColor: gray }}
            onPress={() => {
              this.setState({
                currentQuestion: 0,
                viewFront: true,
                totalCorrect: 0,
              });
            }}
          >
            Attemp Again
            </ActionButton>
        </View>
      );
    }

    //display question
    return (
      <View style={styles.container}>
        {questions.length
          ? (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.count}> {currentQuestion + 1} / {questions.length} </Text>
              <Text style={styles.question}>
                {viewFront
                  ? questions[currentQuestion].question
                  : questions[currentQuestion].answer
                }
              </Text>

              <Button
                color={orange}
                title={viewFront ? 'Show Answer' : 'Show Question'}
                onPress={this.flipCard}
              />
              <ActionButton
                style={{ padding: 10, marginTop: 20, width: 300, backgroundColor: green }}
                onPress={this.correct}>
                Correct
              </ActionButton>
              <ActionButton
                style={{ padding: 10, marginTop: 20, width: 300, backgroundColor: red }}
                onPress={this.incorrect}>
                InCorrect
              </ActionButton>
            </ScrollView>
          )
          : (
            <Text style={styles.question}>
              {this.state.loading === true ? 'Loading questions' : 'No Questions in this Deck'}
            </Text>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightPurp,
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center'
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
    color: white,
    margin: 20,
  },
  count: {
    fontSize: 20,
    textAlign: 'center',
    color: orange,
    margin: 20
  },
});

export default AttemptQuiz