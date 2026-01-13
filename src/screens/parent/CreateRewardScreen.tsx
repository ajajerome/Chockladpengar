import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Reward } from '../../types';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const CreateRewardScreen: React.FC<Props> = ({ navigation }) => {
  const { addReward } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState<'activity' | 'privilege' | 'thing'>('thing');

  const categories = [
    { value: 'activity', label: 'Aktivitet', icon: '🎮', color: '#E3F2FD' },
    { value: 'privilege', label: 'Privilegium', icon: '⭐', color: '#FFF3E0' },
    { value: 'thing', label: 'Sak', icon: '🎁', color: '#F3E5F5' },
  ];

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Fel', 'Ange en titel');
      return;
    }

    const costNum = parseInt(cost);
    if (isNaN(costNum) || costNum <= 0) {
      Alert.alert('Fel', 'Ange ett giltigt pris');
      return;
    }

    const reward: Reward = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      cost: costNum,
      category,
      available: true,
    };

    addReward(reward);
    Alert.alert('Belöning skapad! 🎁', 'Barnet kan nu köpa denna belöning');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Titel *</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. Extra datortid"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Beskrivning</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Beskriv belöningen"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Kostnad (🍫) *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="0"
                value={cost}
                onChangeText={setCost}
                keyboardType="number-pad"
                placeholderTextColor={colors.textMuted}
              />
              <Text style={styles.inputIcon}>🍫</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Kategori *</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  style={[
                    styles.categoryCard,
                    { backgroundColor: cat.color },
                    category === cat.value && styles.categoryCardSelected,
                  ]}
                  onPress={() => setCategory(cat.value as any)}
                >
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                  {category === cat.value && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Spara belöning"
              onPress={handleCreate}
              variant="primary"
              size="large"
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputIcon: {
    fontSize: 32,
  },
  categoryGrid: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    position: 'relative',
  },
  categoryCardSelected: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  categoryLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  selectedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadgeText: {
    color: colors.backgroundLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 16,
  },
});
