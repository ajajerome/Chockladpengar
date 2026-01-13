import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/useStore';
import { colors } from '../theme/colors';

// Icons
import {
  HomeIcon,
  TreasureChestIcon,
  BarChartIcon,
  FactoryIcon,
  SettingsIcon,
} from '../components/icons';

// Auth screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { CreateFamilyScreen } from '../screens/auth/CreateFamilyScreen';
import { AddChildScreen } from '../screens/auth/AddChildScreen';
import { AddParentScreen } from '../screens/auth/AddParentScreen';

// Child screens
import { ChildHomeScreen } from '../screens/child/ChildHomeScreen';
import { RewardShopScreen } from '../screens/child/RewardShopScreen';
import { InvestmentsScreen } from '../screens/child/InvestmentsScreen';
import { FactoryScreen } from '../screens/child/FactoryScreen';

// Parent screens
import { ParentHomeScreen } from '../screens/parent/ParentHomeScreen';
import { CreateTaskScreen } from '../screens/parent/CreateTaskScreen';
import { CreateRewardScreen } from '../screens/parent/CreateRewardScreen';
import { ManageTasksScreen } from '../screens/parent/ManageTasksScreen';
import { ChildDetailsScreen } from '../screens/parent/ChildDetailsScreen';
import { FamilySettingsScreen } from '../screens/parent/FamilySettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ChildTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundLight,
          borderTopColor: colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        headerStyle: {
          backgroundColor: colors.backgroundLight,
        },
        headerTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ChildHomeScreen}
        options={{
          title: 'Hem',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ opacity: focused ? 1 : 0.6 }}>
              <HomeIcon size={24} color={color} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="RewardShop"
        component={RewardShopScreen}
        options={{
          title: 'Belöningar',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ opacity: focused ? 1 : 0.6 }}>
              <TreasureChestIcon size={24} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Investments"
        component={InvestmentsScreen}
        options={{
          title: 'Fonder',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ opacity: focused ? 1 : 0.6 }}>
              <BarChartIcon size={24} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Factory"
        component={FactoryScreen}
        options={{
          title: 'Fabrik',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ opacity: focused ? 1 : 0.6 }}>
              <FactoryIcon size={24} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const ParentTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundLight,
          borderTopColor: colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        headerStyle: {
          backgroundColor: colors.backgroundLight,
        },
        headerTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ParentHomeScreen}
        options={{
          title: 'Hem',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ opacity: focused ? 1 : 0.6 }}>
              <HomeIcon size={24} color={color} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={FamilySettingsScreen}
        options={{
          title: 'Inställningar',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ opacity: focused ? 1 : 0.6 }}>
              <SettingsIcon size={24} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { currentUser } = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backgroundLight,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {!currentUser ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateFamily"
              component={CreateFamilyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddChild"
              component={AddChildScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : currentUser.role === 'child' ? (
          <>
            <Stack.Screen
              name="Main"
              component={ChildTabs}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={ParentTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateTask"
              component={CreateTaskScreen}
              options={{ title: 'Skapa uppgift' }}
            />
            <Stack.Screen
              name="CreateReward"
              component={CreateRewardScreen}
              options={{ title: 'Skapa belöning' }}
            />
            <Stack.Screen
              name="ManageTasks"
              component={ManageTasksScreen}
              options={{ title: 'Hantera uppgifter' }}
            />
            <Stack.Screen
              name="ChildDetails"
              component={ChildDetailsScreen}
              options={{ title: 'Barndetaljer' }}
            />
            <Stack.Screen
              name="AddChild"
              component={AddChildScreen}
              options={{ title: 'Lägg till barn' }}
            />
            <Stack.Screen
              name="AddParent"
              component={AddParentScreen}
              options={{ title: 'Lägg till förälder' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
