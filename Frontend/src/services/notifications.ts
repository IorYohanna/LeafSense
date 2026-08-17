import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseFrequencyToDays } from './wateringSchedule';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const REMINDERS_KEY = 'leafsense_reminders';

export interface WateringReminder {
  id: string;              // notificationId retourné par expo-notifications
  scientificName: string;
  commonName: string;
  frequencyDays: number;
  createdAt: string;
}

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function getReminders(): Promise<WateringReminder[]> {
  const json = await AsyncStorage.getItem(REMINDERS_KEY);
  return json ? JSON.parse(json) : [];
}

async function saveReminders(reminders: WateringReminder[]): Promise<void> {
  await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
}

export async function hasReminder(scientificName: string): Promise<boolean> {
  const reminders = await getReminders();
  return reminders.some((r) => r.scientificName === scientificName);
}

export async function scheduleWateringReminder(
  scientificName: string,
  commonName: string,
  wateringFrequency?: string
): Promise<void> {
  const granted = await requestNotificationPermission();
  if (!granted) throw new Error('Permission de notification refusée');

  const days = parseFrequencyToDays(wateringFrequency);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: '💧 Il est temps d\'arroser',
      body: `${commonName} a besoin d'eau aujourd'hui !`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: days * 24 * 60 * 60,
      repeats: true,
    },
  });

  const reminders = await getReminders();
  reminders.push({
    id: notificationId,
    scientificName,
    commonName,
    frequencyDays: days,
    createdAt: new Date().toISOString(),
  });
  await saveReminders(reminders);
}

export async function cancelWateringReminder(scientificName: string): Promise<void> {
  const reminders = await getReminders();
  const target = reminders.find((r) => r.scientificName === scientificName);
  if (target) {
    await Notifications.cancelScheduledNotificationAsync(target.id);
    await saveReminders(reminders.filter((r) => r.scientificName !== scientificName));
  }
}

export async function cancelAllReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await saveReminders([]);
}