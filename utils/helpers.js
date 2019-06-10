import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { KEY_NOTIFICATIONS } from './api'

export async function clearLocalNotification() {
    try {
        await AsyncStorage.removeItem(KEY_NOTIFICATIONS);
    } catch (error) {
        console.error('Error while removing notification ' + error.message);
    }
    return Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
    return {
        title: 'Decks Reminder!',
        body: "👋 do not forget to play Flashcards!",
        ios: {
            sound: true,
        },
        android: {
            priority: 'high',
            sound: true,
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(KEY_NOTIFICATIONS)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            AsyncStorage.setItem(KEY_NOTIFICATIONS, JSON.stringify(true));
                        }
                    })
            }
        })
}