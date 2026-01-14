import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from './navigation/AppNavigator';
import {useStore} from './store/useStore';
import {colors} from './theme/colors';

const App = () => {
  const loadData = useStore(state => state.loadData);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

