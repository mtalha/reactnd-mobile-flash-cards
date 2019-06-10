


# “UdaciCards” Project

This is the final assessment project for Udacity's React-Redux course, which is a part of the [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019). 

This is a `react native` app that lets a user play the `flash cards` game. The game goes like this: 

A user is presented with a list of some flashcards categorized as decks, user taps on a deck and goes in the details section to play the cards or add a new card. 

In the play section, user makes a guess against a question as either correct or incorrect. User has the option to see the answer of the question and navigate back and forth between question & answer view. User gets score for each correct answer and at the end gets the total score as x/y questions answered correctly.

User can create a deck by providing a deck name in the `Add a Deck` screen. User can also create a card in a deck by providing a question and an answer in a create card screen. The card is associated with a deck. 

## Technologies used:

* React
* React Native
* React Asynchronous Storage for iOS & Android

## To run it locally:
This project has been tested in an Android Emulator.

* install all project dependencies with `npm install`
* start the app with with `npm start`
* Follow instruction on the command line to run the project on appropriate emulator or device

## Note

This project uses an initial data set of some decks with some sample questions. 

## Screens

 - The projects loads with two tabs: one containing a list of all the decks with the name of each deck as title and also the number of cards in that deck. The other tab shows the `Add Deck` screen, where user can create a new Deck
 - The deck screen shows the same information as the `title` of the deck and the `total cards` in the deck. There are two navigation buttons to add a new `card` in the deck or start the `quiz`
 - In the `Quiz` screen, user is presented with `correct` & `incorrect` buttons and a `show answer` button. The correct & incorrect buttons also recored the score accordingly. User can first guess the answer and then tap of the `show answer` button to see the answer. 
