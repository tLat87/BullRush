import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { DreamStats } from '../BullRushData/gameData';
import { NightlyRitual } from '../BullRushData/appContent';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

interface BullRushHomeScreenProps {
  stats: DreamStats;
  nightlyFocus: string;
  rituals: NightlyRitual[];
  onNavigate: (destination: 'Practice' | 'Journal' | 'Insights') => void;
  onRecordDream: (type: 'lucid' | 'classic') => void;
  onRitualComplete: (id: string) => void;
}

const BullRushHomeScreen: React.FC<BullRushHomeScreenProps> = ({
  stats,
  nightlyFocus,
  rituals,
  onNavigate,
  onRecordDream,
  onRitualComplete,
}) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isTablet = width >= 768;
  const statCards = [
    { label: 'Dreams', value: stats.totalDreams, hint: 'last 30 days' },
    { label: 'Lucid', value: stats.lucidDreams, hint: 'this month' },
    { label: 'Streak', value: `${stats.currentStreak}d`, hint: 'no breaks' },
  ];
  const visibleRituals = rituals.slice(0, 3);
  const quickLinks = [
    { label: 'Training', action: () => onNavigate('Practice') },
    { label: 'Journal', action: () => onNavigate('Journal') },
    { label: 'Insights', action: () => onNavigate('Insights') },
  ];

  return (
    <BackgroundImage>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroLabel}>Today</Text>
              <Text style={styles.heroTitle}>BullRush Dream Studio</Text>
            </View>
            <TouchableOpacity style={styles.heroButton} onPress={() => onNavigate('Insights')}>
              <Text style={styles.heroButtonText}>✨ Pulse</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.heroFocus}>{nightlyFocus}</Text>
          <Image
            source={require('../BullRushAssets/img/man.png')}
            style={[styles.heroImage, isCompact && styles.heroImageCompact]}
            resizeMode="contain"
          />
          <View style={[styles.actionRow, isCompact && styles.actionRowStacked]}>
            <ButtonWithBackground
              text="Log a dream"
              onPress={() => onRecordDream('classic')}
              width={isCompact ? '100%' : undefined}
            />
            <ButtonWithBackground
              text="Lucid boost"
              onPress={() => onRecordDream('lucid')}
              textColor="#FFD700"
              style={styles.secondaryAction}
              width={isCompact ? '100%' : undefined}
            />
          </View>
        </View>

        <View style={[styles.cardGrid, isCompact && styles.cardGridStacked]}>
          {statCards.map((card) => (
            <View
              key={card.label}
              style={[styles.statCard, isCompact && styles.statCardCompact, isTablet && styles.statCardWide]}
            >
              <Text style={styles.statLabel}>{card.label}</Text>
              <Text style={styles.statValue}>{card.value}</Text>
              <Text style={styles.statHint}>{card.hint}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Evening rituals</Text>
            <TouchableOpacity onPress={() => onNavigate('Practice')}>
              <Text style={styles.linkText}>view practices</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ritualContainer}>
            {visibleRituals.map((ritual) => (
              <View key={ritual.id} style={[styles.ritualCard, isTablet && styles.ritualCardWide]}>
                <View style={styles.ritualHeader}>
                  <Text style={styles.ritualTitle}>{ritual.title}</Text>
                  <Text style={styles.ritualDuration}>{ritual.duration} min</Text>
                </View>
                <Text style={styles.ritualBenefit}>{ritual.benefit}</Text>
                <View style={styles.stepsRow}>
                  {ritual.steps.map((step) => (
                    <TextBlockWithBackground
                      key={step}
                      style={[
                        styles.stepBlock,
                        isCompact && styles.stepBlockCompact,
                        isTablet && styles.stepBlockWide,
                      ]}
                    >
                      {step}
                    </TextBlockWithBackground>
                  ))}
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${ritual.progress}%` }]} />
                </View>
                <View style={styles.ritualFooter}>
                  <Text style={styles.progressLabel}>{ritual.progress}% complete</Text>
                  <ButtonWithBackground
                    text="+ step"
                    onPress={() => onRitualComplete(ritual.id)}
                    width={isCompact ? 120 : 110}
                    height={38}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick jumps</Text>
          <View style={styles.quickContainer}>
            {quickLinks.map((link) => (
              <ButtonWithBackground
                key={link.label}
                text={link.label}
                onPress={link.action}
                width={isCompact ? '100%' : undefined}
                style={styles.quickButton}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  hero: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(26, 35, 126, 0.7)',
    marginTop: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroLabel: {
    color: '#E3DAFF',
    fontSize: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDD835',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    gap: 6,
  },
  heroButtonText: {
    color: '#240046',
    fontWeight: '600',
  },
  heroFocus: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 140,
    marginBottom: 12,
  },
  heroImageCompact: {
    height: 110,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionRowStacked: {
    flexDirection: 'column',
  },
  secondaryAction: {
    flex: 1,
  },
  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -40,
  },
  cardGridStacked: {
    flexDirection: 'column',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(20, 6, 36, 0.85)',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  statCardCompact: {
    marginHorizontal: 0,
  },
  statCardWide: {
    maxWidth: 200,
  },
  statLabel: {
    color: '#C5B3FF',
    fontSize: 13,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginVertical: 6,
  },
  statHint: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  linkText: {
    color: '#FDD835',
    fontSize: 14,
  },
  ritualCard: {
    backgroundColor: 'rgba(26, 19, 60, 0.9)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(253,216,53,0.12)',
  },
  ritualHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ritualContainer: {
    // gap: 12,
  },
  ritualCardWide: {
    width: 320,
  },
  ritualTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  ritualDuration: {
    color: '#FDD835',
    fontSize: 13,
  },
  ritualBenefit: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  stepsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 12,
  },
  stepBlock: {
    width: '48%',
  },
  stepBlockCompact: {
    width: '100%',
  },
  stepBlockWide: {
    width: '30%',
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FDD835',
  },
  ritualFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    color: '#C5B3FF',
    fontSize: 13,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickContainer: {
    gap: 12,
  },
  quickButton: {
    marginBottom: 8,
  },
});

export default BullRushHomeScreen;

