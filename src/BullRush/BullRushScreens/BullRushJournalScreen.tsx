import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { JournalEntry } from '../BullRushData/appContent';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

interface BullRushJournalScreenProps {
  entries: JournalEntry[];
  onAddEntry: (payload: { title: string; note: string; mood: JournalEntry['mood']; tags: string[] }) => void;
  onToggleFavorite: (id: string) => void;
}

const moods: JournalEntry['mood'][] = ['Calm', 'Curious', 'Energized', 'Restless'];

const BullRushJournalScreen: React.FC<BullRushJournalScreenProps> = ({
  entries,
  onAddEntry,
  onToggleFavorite,
}) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 390;
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('Calm');
  const recentEntries = entries.slice(0, 3);

  const handleSubmit = () => {
    if (!title.trim() || !note.trim()) {
      return;
    }

    onAddEntry({
      title: title.trim(),
      note: note.trim(),
      mood,
      tags: ['nightly'],
    });
    setTitle('');
    setNote('');
  };

  return (
    <BackgroundImage>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>BullRush journal</Text>
        <Text style={styles.subtitle}>Capture insights right after waking up</Text>

        <View style={styles.formCard}>
          <Text style={styles.formLabel}>Quick capture</Text>
          <TextInput
            placeholder="Dream title"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="What did you feel? Any symbols?"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={note}
            onChangeText={setNote}
            style={[styles.input, styles.multiline]}
            multiline
          />
          <View style={styles.moodRow}>
            {moods.map((moodOption) => (
              <TouchableOpacity
                key={moodOption}
                onPress={() => setMood(moodOption)}
                style={[styles.moodTouchable, isCompact && styles.moodTouchableCompact]}
                activeOpacity={0.85}
              >
                <TextBlockWithBackground
                  style={[
                    styles.moodChip,
                    mood === moodOption && styles.moodChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.moodChipText,
                      mood === moodOption && styles.moodChipTextActive,
                    ]}
                  >
                    {moodOption}
                  </Text>
                </TextBlockWithBackground>
              </TouchableOpacity>
            ))}
          </View>
          <ButtonWithBackground text="Save dream" onPress={handleSubmit} />
        </View>

        {recentEntries.length > 0 ? (
          <View style={styles.entryContainer}>
            {recentEntries.map((entry) => (
              <TextBlockWithBackground key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <View>
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                    <Text style={styles.entryMeta}>
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => onToggleFavorite(entry.id)}
                    style={styles.favoriteBtn}
                  >
                    <Text style={[styles.favoriteText, entry.favorite && styles.favoriteActive]}>
                      {entry.favorite ? '★' : '☆'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.entryMood}>{entry.mood}</Text>
                <Text style={styles.entryNote} numberOfLines={isCompact ? 3 : undefined}>
                  {entry.note}
                </Text>
                <View style={styles.entryFooter}>
                  <View style={styles.tagRow}>
                    {entry.tags.map((tag) => (
                      <View key={tag} style={styles.tagPill}>
                        <Text style={styles.tagText}>#{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.energyText}>{entry.energy || 60}% energy</Text>
                </View>
              </TextBlockWithBackground>
            ))}
          </View>
        ) : (
          <TextBlockWithBackground style={styles.emptyState}>
            Start your first entry to see it here ✨
          </TextBlockWithBackground>
        )}
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 22,
  },
  formCard: {
    backgroundColor: 'rgba(20, 6, 36, 0.9)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(253,216,53,0.12)',
  },
  formLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  moodTouchable: {
    width: '48%',
  },
  moodTouchableCompact: {
    width: '100%',
  },
  moodChip: {
    width: '100%',
  },
  moodChipActive: {
    backgroundColor: '#FFD700',
  },
  moodChipText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  moodChipTextActive: {
    color: '#240046',
    fontWeight: '700',
  },
  entryCard: {
    width: '100%',
    marginBottom: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  entryContainer: {
    gap: 16,
  },
  favoriteBtn: {
    paddingHorizontal: 6,
  },
  favoriteText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  favoriteActive: {
    color: '#FFD700',
  },
  entryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  entryMeta: {
    color: 'rgba(255,255,255,0.6)',
  },
  entryMood: {
    color: '#FDD835',
    fontWeight: '600',
    marginBottom: 8,
  },
  entryNote: {
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 12,
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  energyText: {
    color: '#C5B3FF',
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BullRushJournalScreen;

