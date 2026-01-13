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
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const AddParentScreen: React.FC<Props> = ({ navigation }) => {
  const [parentName, setParentName] = useState('');
  const { currentUser, addUser } = useStore();

  const handleAddParent = () => {
    if (!parentName.trim()) {
      Alert.alert('Fel', 'Ange förälderns namn');
      return;
    }

    if (!currentUser) {
      Alert.alert('Fel', 'Ingen användare inloggad');
      return;
    }

    // Create parent user in same family
    const newParent: User = {
      id: Date.now().toString(),
      name: parentName.trim(),
      role: 'parent',
      familyId: currentUser.familyId,
    };

    addUser(newParent);

    Alert.alert(
      'Förälder tillagd!',
      `${parentName} har lagts till som förälder i familjen!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ProfileIcon size={80} />
            <Text style={styles.title}>Lägg till Förälder</Text>
            <Text style={styles.subtitle}>
              Lägg till ytterligare en förälder som kan hantera familjen
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Förälderns namn *</Text>
              <TextInput
                style={styles.input}
                placeholder="T.ex. Pappa, Mamma, etc."
                value={parentName}
                onChangeText={setParentName}
                autoCapitalize="words"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Förälderbehörigheter:</Text>
              <Text style={styles.infoText}>• Skapa och godkänna uppgifter</Text>
              <Text style={styles.infoText}>• Skapa belöningar</Text>
              <Text style={styles.infoText}>• Se alla barns framsteg</Text>
              <Text style={styles.infoText}>• Hantera familjeinställningar</Text>
            </View>

            <Button
              title="Lägg till Förälder"
              onPress={handleAddParent}
              variant="primary"
              size="large"
              fullWidth
            />

            <Button
              title="Avbryt"
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
  infoBox: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 22,
  },
});

