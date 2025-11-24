import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { StatsService } from '../BullRushServices/StatsService';
import { JournalService } from '../BullRushServices/JournalService';
import { DreamStats } from '../BullRushData/gameData';
import BullRushHomeScreen from '../BullRushScreens/BullRushHomeScreen';
import BullRushPracticeScreen from '../BullRushScreens/BullRushPracticeScreen';
import BullRushJournalScreen from '../BullRushScreens/BullRushJournalScreen';
import BullRushInsightsScreen from '../BullRushScreens/BullRushInsightsScreen';
import BullRushProfileScreen from '../BullRushScreens/BullRushProfileScreen';
import {
  nightlyRituals,
  practiceModules,
  journalSeedEntries,
  NightlyRitual,
  PracticeModule,
  JournalEntry,
  deriveFocusFromStats,
} from '../BullRushData/appContent';

type TabKey = 'Home' | 'Practice' | 'Journal' | 'Insights' | 'Profile';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Home');
  const [stats, setStats] = useState<DreamStats>({
    totalDreams: 0,
    lucidDreams: 0,
    dreamRecallRate: 0,
    currentStreak: 0,
    longestStreak: 0,
    techniquesCompleted: 0,
    favoriteCategory: 'lucid-dreaming',
    averageDreamLength: 0,
    lastDreamDate: '',
    realityChecksToday: 0,
  });
  const [rituals, setRituals] = useState<NightlyRitual[]>(nightlyRituals);
  const [modules, setModules] = useState<PracticeModule[]>(practiceModules);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(journalSeedEntries);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const [loadedStats, savedEntries] = await Promise.all([
        StatsService.getStats(),
        JournalService.getEntries(),
      ]);
      setStats(loadedStats);
      setJournalEntries(savedEntries);
      setLoading(false);
    };

    bootstrap();
  }, []);

  const nightlyFocus = useMemo(() => deriveFocusFromStats(stats), [stats]);

  const handleRecordDream = async (type: 'lucid' | 'classic') => {
    const updated = await StatsService.updateDreamRecord(type === 'lucid', type);
    setStats(updated);
  };

  const handleRitualProgress = async (id: string) => {
    setRituals((prev) =>
      prev.map((ritual) =>
        ritual.id === id
          ? { ...ritual, progress: Math.min(100, ritual.progress + 12) }
          : ritual
      )
    );
    const updated = await StatsService.updateRealityCheck();
    setStats(updated);
  };

  const handleStartModule = async (id: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === id ? { ...module, progress: Math.min(100, module.progress + 10) } : module
      )
    );
    const updated = await StatsService.updateTechniqueCompletion(
      Number(id.replace(/\D/g, '')) || 1
    );
    setStats(updated);
  };

  const handleAddEntry = async (payload: {
    title: string;
    note: string;
    mood: JournalEntry['mood'];
    tags: string[];
  }) => {
    const updated = await JournalService.addEntry({
      ...payload,
      energy: 70,
      lucid: payload.tags.includes('lucid'),
    });
    setJournalEntries(updated);
  };

  const handleToggleFavorite = async (id: string) => {
    const updated = await JournalService.toggleFavorite(id);
    setJournalEntries(updated);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <BullRushHomeScreen
            stats={stats}
            nightlyFocus={nightlyFocus}
            rituals={rituals}
            onNavigate={(destination) => setActiveTab(destination)}
            onRecordDream={handleRecordDream}
            onRitualComplete={handleRitualProgress}
          />
        );
      case 'Practice':
        return <BullRushPracticeScreen modules={modules} onStartModule={handleStartModule} />;
      case 'Journal':
        return (
          <BullRushJournalScreen
            entries={journalEntries}
            onAddEntry={handleAddEntry}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'Insights':
        return <BullRushInsightsScreen stats={stats} />;
      case 'Profile':
        return (
          <BullRushProfileScreen
            stats={stats}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={() => setNotificationsEnabled((prev) => !prev)}
          />
        );
      default:
        return null;
    }
  };

  const tabs: { key: TabKey; label: string; emoji: string }[] = [
    { key: 'Home', label: 'Home', emoji: '🏠' },
    { key: 'Practice', label: 'Practice', emoji: '🧘' },
    { key: 'Journal', label: 'Journal', emoji: '📓' },
    { key: 'Insights', label: 'Pulse', emoji: '📊' },
    { key: 'Profile', label: 'Profile', emoji: '🌙' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#04000A" />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#FDD835" />
          <Text style={styles.loaderText}>Initializing BullRush...</Text>
        </View>
      ) : (
        <>
          <View style={styles.content}>{renderContent()}</View>
          <View style={styles.tabBar}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tab.emoji}</Text>
                  <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#04000A',
  },
  content: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04000A',
  },
  loaderText: {
    marginTop: 12,
    color: '#FFFFFF',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#080015',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
  },
  tabIcon: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
  },
  tabIconActive: {
    color: '#FDD835',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderColor: '#FDD835',
  },
  tabLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  tabLabelActive: {
    color: '#FDD835',
    fontWeight: '600',
  },
});

export default App;

