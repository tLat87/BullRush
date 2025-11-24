import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, useWindowDimensions } from 'react-native';
import { DreamStats } from '../BullRushData/gameData';
import { favoriteAffirmations } from '../BullRushData/appContent';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';

interface BullRushProfileScreenProps {
  stats: DreamStats;
  onToggleNotifications: () => void;
  notificationsEnabled: boolean;
}

const BullRushProfileScreen: React.FC<BullRushProfileScreenProps> = ({
  stats,
  onToggleNotifications,
  notificationsEnabled,
}) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 420;
  const achievements = [
    { label: 'Gold Streak', value: `${stats.currentStreak} nights in a row`, emoji: '🔥' },
    { label: 'Lucid Explorer', value: `${stats.lucidDreams} lucid runs`, emoji: '✨' },
    { label: 'Studio Architect', value: `${stats.techniquesCompleted} practice loops`, emoji: '🏗️' },
  ];

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>BullRush Navigator</Text>
          <Text style={styles.role}>Night architect · storyteller</Text>
        </View>

        <View style={[styles.achievementGrid, isCompact && styles.achievementGridStacked]}>
          {achievements.map((item) => (
            <TextBlockWithBackground
              key={item.label}
              style={[styles.achievementCard, isCompact && styles.achievementCardFull]}
            >
              <Text style={styles.achievementEmoji}>{item.emoji}</Text>
              <Text style={styles.achievementLabel}>{item.label}</Text>
              <Text style={styles.achievementValue}>{item.value}</Text>
            </TextBlockWithBackground>
          ))}
        </View>
{/* 
        <TextBlockWithBackground style={styles.section}>
          <Text style={styles.sectionTitle}>My settings</Text>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Reminders</Text>
              <Text style={styles.settingHint}>Evening rituals & day checklists</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={onToggleNotifications}
              trackColor={{ false: '#4A148C', true: '#FDD835' }}
              thumbColor="#240046"
            />
          </View>
          <TouchableOpacity style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Theme switcher</Text>
              <Text style={styles.settingHint}>BullRush palette saved</Text>
            </View>
            <Text style={styles.settingEmoji}>🎨</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Journal export</Text>
              <Text style={styles.settingHint}>PDF or Apple Notes</Text>
            </View>
            <Text style={styles.settingEmoji}>📤</Text>
          </TouchableOpacity>
          <ButtonWithBackground text="Contact support" onPress={() => {}} />
        </TextBlockWithBackground> */}

        <TextBlockWithBackground style={styles.section}>
          <Text style={styles.sectionTitle}>Affirmations</Text>
          {favoriteAffirmations.map((text) => (
            <View key={text} style={styles.affirmationCard}>
              <Text style={styles.affirmationEmoji}>✨</Text>
              <Text style={styles.affirmationText}>{text}</Text>
            </View>
          ))}
        </TextBlockWithBackground>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  role: {
    color: 'rgba(255,255,255,0.6)',
  },
  achievementGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementGridStacked: {
    flexDirection: 'column',
  },
  achievementCard: {
    flex: 1,
    gap: 8,
  },
  achievementEmoji: {
    fontSize: 22,
  },
  achievementCardFull: {
    width: '100%',
  },
  achievementLabel: {
    color: '#C5B3FF',
    fontSize: 13,
  },
  achievementValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingEmoji: {
    fontSize: 20,
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  settingHint: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  affirmationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  affirmationEmoji: {
    fontSize: 18,
  },
  affirmationText: {
    color: '#EDE7F6',
    flex: 1,
    lineHeight: 20,
  },
});

export default BullRushProfileScreen;

