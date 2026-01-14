import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useStore} from '../store/useStore';
import {colors} from '../theme/colors';

// Icons
import {
  HomeIcon,
  TreasureChestIcon,
  BarChartIcon,
  FactoryIcon,
  DashboardIcon,
  ProfileIcon,
} from '../components/icons';

// Auth Screens
import {LoginScreen} from '../screens/auth/LoginScreen';
import {CreateFamilyScreen} from '../screens/auth/CreateFamilyScreen';
import {AddChildScreen} from '../screens/auth/AddChildScreen';

// Child Screens
import {ChildHomeScreen} from '../screens/child/ChildHomeScreen';
import {RewardShopScreen} from '../screens/child/RewardShopScreen';
import {InvestmentsScreen} from '../screens/child/InvestmentsScreen';
import {FactoryScreen} from '../screens/child/FactoryScreen';

// Parent Screens
import {ParentHomeScreen} from '../screens/parent/ParentHomeScreen';
import {CreateTaskScreen} from '../screens/parent/CreateTaskScreen';
import {CreateRewardScreen} from '../screens/parent/CreateRewardScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ChildTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundLight,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.textWhite,
      }}>
      <Tab.Screen
        name="Home"
        component={ChildHomeScreen}
        options={{
          title: 'Hem',
          tabBarIcon: ({color, size}) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="RewardShop"
        component={RewardShopScreen}
        options={{
          title: 'Chokladkassan',
          tabBarIcon: ({color, size}) => (
            <TreasureChestIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Investments"
        component={InvestmentsScreen}
        options={{
          title: 'Fonder',
          tabBarIcon: ({color, size}) => (
            <BarChartIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Factory"
        component={FactoryScreen}
        options={{
          title: 'Chokladfabrik',
          tabBarIcon: ({color, size}) => (
            <FactoryIcon size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ParentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.textWhite,
      }}>
      <Stack.Screen
        name="ParentHome"
        component={ParentHomeScreen}
        options={{title: 'Föräldravy'}}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{title: 'Skapa uppgift'}}
      />
      <Stack.Screen
        name="CreateReward"
        component={CreateRewardScreen}
        options={{title: 'Skapa belöning'}}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const currentUser = useStore(state => state.currentUser);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!currentUser ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateFamily" component={CreateFamilyScreen} />
          <Stack.Screen name="AddChild" component={AddChildScreen} />
        </>
      ) : currentUser.role === 'child' ? (
        <Stack.Screen name="ChildTabs" component={ChildTabs} />
      ) : (
        <Stack.Screen name="ParentStack" component={ParentStack} />
      )}
    </Stack.Navigator>
  );
};

