import React, { Component } from 'react'
import { Platform } from 'react-native'
import {
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation'
import Decks from './Decks'
import Deck from './Deck'
import AddDeck from './AddDeck'
import AddCard from './AddCard'
import AttemptQuiz from './AttemptQuiz'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { purple, white, lightPurp, gray } from '../utils/colors'

const RouteConfigs = {
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    }
};

const navigatorConfigs = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};

const Tabs = Platform.OS === 'ios'
    ? createBottomTabNavigator(RouteConfigs, navigatorConfigs)
    : createMaterialTopTabNavigator(RouteConfigs, navigatorConfigs)

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null,
        },
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        })
    },
    AttemptQuiz: {
        screen: AttemptQuiz,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        })
    }
});

export default createAppContainer(MainNavigator)