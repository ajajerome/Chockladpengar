import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { User } from '../../types';
import { ProfileIcon } from '../../components/icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { isFirstChild?: boolean } }, 'params'>;
}

export const AddChildScreen: React.FC<Props> = ({ navigation, route }) => {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const { currentUser, addUser } = useStore();
  const isFirstChild = route.params?.isFirstChild || false;

  const handleAddChild = () => {
    if (!childName.trim()) {
      Alert.alert('Fel', 'Ange barnets namn');
      return;
    }

    if (!currentUser) {
      Alert.alert('Fel', 'Ingen förälder inloggad');
      return;
    }

    // Create child user
    const child: User = {
      id: Date.now().toString(),
      name: childName.trim(),
      role: 'child',
      familyId: currentUser.familyId,
    };

    addUser(child);

    Alert.alert(
      'Barn tillagt!',
      `${childName} har lagts till i familjen!`,
      [
        {
          text: isFirstChild ? 'Lägg till fler' : 'Lägg till ett till',
          onPress: () => {
            setChildName('');
            setChildAge('');
          },
        },
        {
          text: 'Klar',
          style: 'default',
          onPress: () => {
            if (isFirstChild) {
              // First time setup - go to parent home
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            } else {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  const handleSkip = () => {
    if (isFirstChild) {
      Alert.alert(
        'Hoppa över?',
        'Du kan lägga till barn senare från inställningarna.',
        [
          { text: 'Avbryt', style: 'cancel' },
          {
            text: 'Hoppa över',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ProfileIcon size={80} />
            <Text style={styles.title}>Lägg till Barn</Text>
            <Text style={styles.subtitle}>
              {isFirstChild
                ? 'Lägg till ditt första barn för att komma igång'
                : 'Lägg till ytterligare ett barn i familjen'}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Barnets namn *</Text>
              <TextInput
                style={styles.input}
                placeholder="T.ex. Emma"
                value={childName}
                onChangeText={setChildName}
                autoCapitalize="words"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Ålder (valfritt)</Text>
              <TextInput
                style={styles.input}
                placeholder="T.ex. 8"
                value={childAge}
                onChangeText={setChildAge}
                keyboardType="number-pad"
                maxLength={2}
                placeholderTextColor={colors.textMuted}
              />
              <Text style={styles.hint}>
                Åldern används endast för statistik
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Kom ihåg:</Text>
              <Text style={styles.infoText}>
                Barnet får ett eget konto där de kan se sina uppgifter,
                tjäna chokladpengar och bygga sin chokladfabrik!
              </Text>
            </View>

            <Button
              title="Lägg till Barn"
              onPress={handleAddChild}
              variant="primary"
              size="large"
              fullWidth
            />

            <Button
              title={isFirstChild ? 'Hoppa över (lägg till senare)' : 'Avbryt'}
              onPress={handleSkip}
              variant="outline"
              size="medium"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  infoBox: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 20,
  },
});

