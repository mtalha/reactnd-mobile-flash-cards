import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ActionButton from '../components/ActionButton'
import { lightPurp, white, orange, gray } from '../utils/colors'

class Deck extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Deck'),
        };
    };

    render() {
        const { navigation } = this.props
        const title = navigation.getParam('title')
        const totalQuestions = navigation.getParam('totalQuestions')

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subTitle}>
                    {totalQuestions} {totalQuestions === 1 ? 'card' : 'cards'}
                </Text>
                <ActionButton
                    style={{ padding: 10, backgroundColor: gray }} onPress={() => {
                        this.props.navigation.navigate('AddCard', { title })

                    }}>
                    Add Card
                </ActionButton>
                <ActionButton
                    style={{ padding: 10, marginTop: 20, backgroundColor: gray }} onPress={() => {
                        this.props.navigation.navigate('AttemptQuiz', { title })
                    }}>
                    Start Quiz
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
    },
    title: {
        color: white,
        fontSize: 30,
        paddingTop: 80,
        textAlign: 'center',
    },
    subTitle: {
        color: orange,
        fontSize: 20,
        paddingBottom: 60,
        textAlign: 'center',
    },
});

export default Deck