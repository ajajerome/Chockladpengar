import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './navigation/AppNavigator';
import { useStore } from './store/useStore';
import { colors } from './theme/colors';

const App: React.FC = () => {
  const { loadData, processFactoryProduction, updateInvestmentValues } = useStore();

  useEffect(() => {
    // Load persisted data on app start
    loadData();

    // Set up periodic tasks (in production, this would be better with background tasks)
    const factoryInterval = setInterval(() => {
      processFactoryProduction();
    }, 60000); // Check every minute

    // Update investments weekly (for demo, check more frequently)
    const investmentInterval = setInterval(() => {
      updateInvestmentValues();
    }, 300000); // Check every 5 minutes (in production, this would be weekly)

    return () => {
      clearInterval(factoryInterval);
      clearInterval(investmentInterval);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;

