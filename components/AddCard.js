import React from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { lightPurp, white, orange, gray } from '../utils/colors';
import ActionButton from '../components/ActionButton';
import { addNewCardToDeck } from '../utils/api';


class AddCard extends React.Component {

    static navigationOptions = {
        title: 'Add Card',
    };

    state = {
        question: '',
        answer: '',
    }

    handleSubmit = () => {

        const newCardQuestion = this.state.question
        const newCardAnswer = this.state.answer
        
        if (newCardQuestion.length === 0 && newCardAnswer.length === 0) {
            alert('Question & Answer cannot be empty')
            return
        }

        const { navigation } = this.props;
        const { handleAddCardToDeck } = this.props.screenProps;
        const title = navigation.getParam('title');

        addNewCardToDeck(title, this.state)
            .then(handleAddCardToDeck(title, this.state))
            .then(() => {
                this.setState({
                    question: '',
                    answer: '',
                });
                navigation.navigate('Decks')
            })

    }

    render() {
        const isEnabled = this.state.question.length > 0 && this.state.answer.length > 0;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Enter the Question
                </Text>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                />

                <Text style={styles.text}>
                    Enter the Answer
                </Text>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(answer) => this.setState({ answer })}
                    value={this.state.answer}
                />

                <ActionButton
                    style={{ padding: 10, backgroundColor: gray }} onPress={this.handleSubmit}>
                    Submit
                </ActionButton>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: lightPurp,
        flex: 1,
        paddingTop: 15,
    },
    text: {
        color: white,
        fontSize: 30,
        textAlign: 'center',
    },
    textInput: {
        alignSelf: 'stretch',
        color: gray,
        backgroundColor: 'white',
        borderColor: orange,
        borderWidth: 1,
        height: 40,
        margin: 20,
    }
});

export default AddCard