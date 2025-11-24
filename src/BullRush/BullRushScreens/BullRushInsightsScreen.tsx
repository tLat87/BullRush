import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { DreamStats } from '../BullRushData/gameData';
import { insightPalette } from '../BullRushData/appContent';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

interface BullRushInsightsScreenProps {
  stats: DreamStats;
}

const BullRushInsightsScreen: React.FC<BullRushInsightsScreenProps> = ({ stats }) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 390;

  const metrics = [
    { label: 'Lucidity', value: stats.lucidDreams * 4 },
    { label: 'Recall', value: stats.dreamRecallRate },
    { label: 'Streak', value: stats.currentStreak * 10 },
    { label: 'Practice', value: stats.techniquesCompleted * 15 },
  ].map((metric) => ({
    ...metric,
    value: Math.min(100, metric.value),
  }));

  return (
    <BackgroundImage>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dream analytics</Text>
        <Text style={styles.subtitle}>BullRush Pulse · realtime</Text>

        <TextBlockWithBackground style={styles.pulseCard}>
          <Text style={styles.pulseLabel}>Night rhythm</Text>
          <View style={styles.pulseBars}>
            {insightPalette.map((insight) => (
              <View key={insight.label} style={styles.pulseBarWrapper}>
                <View style={styles.pulseTrack}>
                  <View
                    style={[
                      styles.pulseFill,
                      { width: `${insight.value}%`, backgroundColor: insight.color },
                    ]}
                  />
                </View>
                <View style={styles.pulseItem}>
                  <Text style={styles.pulseValue}>{insight.value}%</Text>
                  <Text style={styles.pulseName}>{insight.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </TextBlockWithBackground>

        <View style={styles.metricGrid}>
          {metrics.map((metric) => (
            <TextBlockWithBackground
              key={metric.label}
              style={[styles.metricCard, isCompact && styles.metricCardCompact]}
            >
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricValue}>{metric.value}%</Text>
              <View style={styles.metricTrack}>
                <View style={[styles.metricFill, { width: `${metric.value}%` }]} />
              </View>
            </TextBlockWithBackground>
          ))}
        </View>

        <TextBlockWithBackground style={styles.timeline}>
          <Text style={styles.sectionTitle}>7-day cadence</Text>
          <View style={styles.timelineRow}>
            {[...Array(7)].map((_, index) => {
              const value =
                index === 6 ? stats.currentStreak * 12 : stats.dreamRecallRate - index * 6;
              return (
                <View key={index} style={styles.timelineItem}>
                  <View style={[styles.timelineBar, { height: Math.max(16, value) }]}>
                    <View style={styles.timelineGlow} />
                  </View>
                  <Text style={styles.timelineLabel}>
                    {new Date(Date.now() - (6 - index) * 86400000).toLocaleDateString('ru-RU', {
                      weekday: 'short',
                    })}
                  </Text>
                </View>
              );
            })}
          </View>
        </TextBlockWithBackground>
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
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 24,
  },
  pulseCard: {
    marginBottom: 24,
  },
  pulseLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  pulseBars: {
    gap: 18,
  },
  pulseBarWrapper: {
    gap: 6,
  },
  pulseTrack: {
    height: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  pulseFill: {
    height: '100%',
    borderRadius: 12,
  },
  pulseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pulseValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  pulseName: {
    color: 'rgba(255,255,255,0.7)',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metricCard: {
    flexBasis: '47%',
  },
  metricCardCompact: {
    flexBasis: '100%',
  },
  metricLabel: {
    color: '#C5B3FF',
    fontSize: 13,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 8,
  },
  metricTrack: {
    height: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  metricFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#FDD835',
  },
  timeline: {
    marginTop: 32,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timelineItem: {
    alignItems: 'center',
    flex: 1,
  },
  timelineBar: {
    width: 16,
    borderRadius: 16,
    backgroundColor: '#4A148C',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  timelineGlow: {
    width: '100%',
    height: 12,
    backgroundColor: '#FDD835',
  },
  timelineLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 6,
  },
});

export default BullRushInsightsScreen;

