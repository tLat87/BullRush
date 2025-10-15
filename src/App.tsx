import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import DreamPortalScreen from './screens/DreamPortalScreen';
import DreamGuideScreen from './screens/DreamGuideScreen';
import DreamHubScreen from './screens/DreamHubScreen';
import DreamTechniquesScreen from './screens/DreamTechniquesScreen';
import DreamJourneyScreen from './screens/DreamJourneyScreen';
import LucidTrainingScreen from './screens/LucidTrainingScreen';
import DreamRecordScreen from './screens/DreamRecordScreen';
import DreamMilestonesScreen from './screens/DreamMilestonesScreen';
import DreamAnalyticsScreen from './screens/DreamAnalyticsScreen';
import DreamSharingScreen from './screens/DreamSharingScreen';
import { StatsService } from './services/StatsService';
import { DreamStats } from './data/gameData';

type Screen = 
  | 'DreamPortal'
  | 'DreamGuide'
  | 'DreamHub'
  | 'DreamTechniques'
  | 'DreamJourney'
  | 'LucidTraining'
  | 'DreamRecord'
  | 'DreamMilestones'
  | 'DreamAnalytics'
  | 'DreamSharing';

interface DreamParams {
  techniqueId?: number;
  duration?: number;
  category?: string;
  isLucid?: boolean;
  completed?: boolean;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('DreamPortal');
  const [dreamParams, setDreamParams] = useState<DreamParams>({});
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

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const loadedStats = await StatsService.getStats();
    setStats(loadedStats);
  };

  const navigateTo = (screen: Screen, params?: DreamParams) => {
    setCurrentScreen(screen);
    if (params) {
      setDreamParams(params);
    }
  };

  const handleDreamRecord = async (techniqueId: number, isLucid: boolean, category: string) => {
    const updatedStats = await StatsService.updateDreamRecord(isLucid, category);
    await StatsService.updateTechniqueCompletion(techniqueId);
    setStats(updatedStats);
    navigateTo('DreamRecord', { techniqueId, isLucid, category, completed: true });
  };

  const handleRealityCheckComplete = async () => {
    const updatedStats = await StatsService.updateRealityCheck();
    setStats(updatedStats);
    navigateTo('DreamRecord', { category: 'reality-check', completed: true });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // case 'DreamPortal':
      //   // return <DreamPortalScreen onComplete={() => navigateTo('DreamGuide')} />;
      //   return <DreamPortalScreen onComplete={() => navigateTo('DreamGuide')} />;
      
      case 'DreamGuide':
        return <DreamGuideScreen onComplete={() => navigateTo('DreamHub')} />;
      
      case 'DreamHub':
        return <DreamHubScreen onNavigate={(screen: string) => navigateTo(screen as Screen)} />;
      
      case 'DreamTechniques':
        return (
          <DreamTechniquesScreen
            onNavigate={(screen: string, params?: DreamParams) => navigateTo(screen as Screen, params)}
            onBack={() => navigateTo('DreamHub')}
          />
        );
      
      case 'DreamJourney':
        return (
          <DreamJourneyScreen
            techniqueId={dreamParams.techniqueId || 1}
            onDreamRecord={handleDreamRecord}
            onBack={() => navigateTo('DreamTechniques')}
          />
        );
      
      case 'LucidTraining':
        return (
          <LucidTrainingScreen
            onRealityCheckComplete={handleRealityCheckComplete}
            onBack={() => navigateTo('DreamHub')}
          />
        );
      
      case 'DreamRecord':
        return (
          <DreamRecordScreen
            techniqueId={dreamParams.techniqueId}
            isLucid={dreamParams.isLucid || false}
            category={dreamParams.category || 'lucid-dreaming'}
            onContinue={() => navigateTo('DreamHub')}
            onShare={() => navigateTo('DreamSharing')}
          />
        );
      
      case 'DreamMilestones':
        return (
          <DreamMilestonesScreen
            onBackHome={() => navigateTo('DreamHub')}
            onViewAnalytics={() => navigateTo('DreamAnalytics')}
          />
        );
      
      case 'DreamAnalytics':
        return (
          <DreamAnalyticsScreen
            stats={stats}
            onBack={() => navigateTo('DreamHub')}
          />
        );
      
      case 'DreamSharing':
        return (
          <DreamSharingScreen
            onBack={() => navigateTo('DreamHub')}
          />
        );
      
      default:
        return <DreamGuideScreen onComplete={() => navigateTo('DreamHub')} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A148C" />
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
