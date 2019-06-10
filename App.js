import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import AppNavigation from './components/AppNavigation'
import { purple } from './constants/Colors'
import { getDecks } from './utils/api'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: 30 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class App extends React.Component {

  state = {
    decks: {}
  }

  componentDidMount() {
    getDecks()
      .then((data) => {
        this.setState({
          decks: data,
        })
      })
      .then(() => {
        setLocalNotification()
      })
  }

  handleSaveDeckTitle = (title) => {
    this.setState({
      decks: {
        ...this.state.decks,
        [title]: {
          title,
          questions: []
        }
      }
    });
  }

  handleAddCardToDeck = (title, card) => {
    const updatedQuestions = [...this.state.decks[title].questions, card];

    this.setState({
      decks: {
        ...this.state.decks,
        [title]: {
          title,
          questions: updatedQuestions,
        }
      }
    });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <AppNavigation
          screenProps={{
            decks: this.state.decks,
            handleSaveDeckTitle: this.handleSaveDeckTitle,
            handleAddCardToDeck: this.handleAddCardToDeck,
          }}
        />
      </View>
    );
  }
}

export default App;