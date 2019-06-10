import { AsyncStorage } from 'react-native'

export const KEY_DECKS_STORAGE = 'Flashcards:decks';
export const KEY_NOTIFICATIONS = 'Flashcards:notifications';

/**
 * Loads a deck object with a specific if
 * @param {*} id 
 */
export async function getDeckObject(id) {
    const results = await AsyncStorage.getItem(KEY_DECKS_STORAGE)
    if (results !== null) {
        const parsedResults = JSON.parse(results)
        const deck = parsedResults[id]
        return deck
    } else {
        return null
    }
}

export function getDecks() {
    return AsyncStorage.getItem(KEY_DECKS_STORAGE)
        .then(parseDecksResults)
}

function parseDecksResults(results) {
    return results === null
        ? setInitialData()
        : JSON.parse(results)
}

function setInitialData() {
    console.log('>>> inside setInitialData')
    const initialData = {
        Grammatically: {
            title: 'Grammatically',
            questions: [
                {
                    question: 'This house needs to clean',
                    answer: 'This house needs cleaning'
                },
                {
                    question: 'He said her the whole story',
                    answer: 'He told her the whole story'
                },
                {
                    question: 'I am going at the bakery',
                    answer: 'I am going to the bakery'
                }
            ]
        },
        GrammarMistakes: {
            title: 'GrammarMistakes',
            questions: [
                {
                    question: 'An important part of my life have been the people who stood by me.',
                    answer: 'An important part of my life has been the people who stood by me.'
                },
                {
                    question: 'I do not believe its finally Friday',
                    answer: 'I do not believe it is finally Friday.'
                }
            ]
        },
    };

    AsyncStorage.setItem(KEY_DECKS_STORAGE, JSON.stringify(initialData))

    return initialData
}

/**
 * Saves the deck title
 * @param {*} title 
 */
export async function saveDeckTitle(title) {
    try {
        await AsyncStorage.mergeItem(KEY_DECKS_STORAGE, JSON.stringify({
            [title]: {
                title,
                questions: []
            }
        }));
    } catch (err) {
        console.error('Error while saving deck title ', err.message);
    }
}

export async function addNewCardToDeck(title, card) {
    const deck = await getDeckObject(title);
    if (deck !== null) {
        const updatedQuestions = [...deck.questions, card];
        AsyncStorage.mergeItem(KEY_DECKS_STORAGE, JSON.stringify({
            [title]: {
                title,
                questions: updatedQuestions,
            }
        }));
    }
}