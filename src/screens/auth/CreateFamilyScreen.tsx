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
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const CreateFamilyScreen: React.FC<Props> = ({ navigation }) => {
  const [familyName, setFamilyName] = useState('');
  const [parentName, setParentName] = useState('');
  const { setCurrentUser, addUser } = useStore();

  const handleCreateFamily = () => {
    if (!familyName.trim()) {
      Alert.alert('Fel', 'Ange ett familjenamn');
      return;
    }

    if (!parentName.trim()) {
      Alert.alert('Fel', 'Ange ditt namn');
      return;
    }

    // Create unique family ID
    const familyId = `family_${Date.now()}`;

    // Create parent user
    const parent: User = {
      id: Date.now().toString(),
      name: parentName.trim(),
      role: 'parent',
      familyId: familyId,
    };

    addUser(parent);
    setCurrentUser(parent);

    Alert.alert(
      'Familj skapad!',
      `Välkommen ${parentName}! Du kan nu lägga till barn i din familj.`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to add child screen
            navigation.replace('AddChild', { isFirstChild: true });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🏠</Text>
            </View>
            <Text style={styles.title}>Skapa Familj</Text>
            <Text style={styles.subtitle}>
              Börja använda Chokladpengar genom att skapa din familj
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Familjenamn *</Text>
              <TextInput
                style={styles.input}
                placeholder="T.ex. Familjen Andersson"
                value={familyName}
                onChangeText={setFamilyName}
                autoCapitalize="words"
                placeholderTextColor={colors.textMuted}
              />
              <Text style={styles.hint}>
                Detta namn används endast för identifiering
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Ditt namn (Förälder) *</Text>
              <TextInput
                style={styles.input}
                placeholder="T.ex. Anna"
                value={parentName}
                onChangeText={setParentName}
                autoCapitalize="words"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Nästa steg:</Text>
              <Text style={styles.infoText}>
                Efter att du skapat familjen kan du lägga till dina barn och
                börja använda appen!
              </Text>
            </View>

            <Button
              title="Skapa Familj"
              onPress={handleCreateFamily}
              variant="primary"
              size="large"
              fullWidth
            />

            <Button
              title="Tillbaka"
              onPress={() => navigation.goBack()}
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
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  logoText: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
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

