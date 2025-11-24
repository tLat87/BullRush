import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { PracticeModule } from '../BullRushData/appContent';
import BackgroundImage from '../BullRushComponents/BackgroundImage';
import ButtonWithBackground from '../BullRushComponents/ButtonWithBackground';
import TextBlockWithBackground from '../BullRushComponents/TextBlockWithBackground';

interface BullRushPracticeScreenProps {
  modules: PracticeModule[];
  onStartModule: (id: string) => void;
}

const BullRushPracticeScreen: React.FC<BullRushPracticeScreenProps> = ({
  modules,
  onStartModule,
}) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 400;
  const visibleModules = modules.slice(0, 3);

  return (
    <BackgroundImage>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Practice path</Text>
        <Text style={styles.subtitle}>Craft your BullRush routine</Text>

        {visibleModules.map((module) => (
          <View
            key={module.id}
            style={[
              styles.moduleCard,
              { borderColor: module.color },
              isCompact && styles.moduleCardCompact,
            ]}
          >
            <View style={styles.moduleHeader}>
              <View>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleMeta}>
                  {module.duration} · {module.focus}
                </Text>
              </View>
              <TextBlockWithBackground style={styles.badge}>{module.badge}</TextBlockWithBackground>
            </View>

            <View style={styles.moduleBody}>
              <TextBlockWithBackground
                style={[styles.metaChip, isCompact && styles.metaChipCompact]}
              >
                {module.difficulty}
              </TextBlockWithBackground>
              <View style={styles.moduleProgress}>
                <View style={[styles.moduleProgressFill, { width: `${module.progress}%` }]} />
              </View>
              <Text style={styles.progressLabel}>{module.progress}% complete</Text>
            </View>

            <ButtonWithBackground
              text="Continue"
              onPress={() => onStartModule(module.id)}
              width="100%"
            />
          </View>
        ))}

        <TextBlockWithBackground style={styles.tipCard}>
          Pair breath cycles with journaling—the brain shifts to alpha faster.
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
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
  },
  moduleCard: {
    backgroundColor: 'rgba(20, 6, 36, 0.85)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  moduleCardCompact: {
    padding: 16,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  moduleTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  moduleMeta: {
    color: 'rgba(255,255,255,0.7)',
  },
  badge: {
    minWidth: 90,
  },
  moduleBody: {
    gap: 12,
  },
  metaChip: {
    alignSelf: 'flex-start',
  },
  metaChipCompact: {
    width: '100%',
  },
  moduleProgress: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  moduleProgressFill: {
    height: '100%',
    backgroundColor: '#FDD835',
  },
  progressLabel: {
    color: '#C5B3FF',
    fontSize: 13,
  },
  tipCard: {
    marginTop: 10,
  },
});

export default BullRushPracticeScreen;

