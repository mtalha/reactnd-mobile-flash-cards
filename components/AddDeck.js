import React from 'react'
import { Platform, View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import { white, blue, gray, lightPurp, purple } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'

function SubmitBtn({ onPress }) {
    return (
        <TouchableHighlight
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            underlayColor={lightPurp}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableHighlight>
    )
}

class AddDeck extends React.Component {

    static navigationOptions = {
        title: 'New Deck',
    };

    state = {
        title: ''
    }

    handleCreateDeck = () => {
        const { navigation } = this.props;
        const { handleSaveDeckTitle } = this.props.screenProps;

        if (this.state.title.length === 0) {
            return
        }

        saveDeckTitle(this.state.title);
        handleSaveDeckTitle(this.state.title);

        navigation.navigate('Deck', {
            title: this.state.title,
            questionsNum: 0,
        });

        // reset state for title
        this.setState({
            title: ''
        });
    }

    render() {
        const isEnabled = this.state.title.length > 0;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                />

                <SubmitBtn onPress={this.handleCreateDeck} disabled={!isEnabled} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: white,
        flex: 1,
        paddingTop: 15,
    },
    text: {
        color: blue,
        fontSize: 30,
        textAlign: 'center',
    },
    textInput: {
        alignSelf: 'stretch',
        borderColor: gray,
        backgroundColor: 'white',
        borderWidth: 1,
        height: 40,
        margin: 20,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});

export default AddDeck