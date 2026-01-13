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
import { Task } from '../../types';
import { ProfileIcon, CheckboxIcon } from '../../components/icons';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const CreateTaskScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser, users, addTask } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [recurring, setRecurring] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');

  const children = users.filter(
    (u) => u.role === 'child' && u.familyId === currentUser?.familyId
  );

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Fel', 'Ange en titel');
      return;
    }

    const pointsNum = parseInt(points);
    if (isNaN(pointsNum) || pointsNum <= 0) {
      Alert.alert('Fel', 'Ange ett giltigt poängvärde');
      return;
    }

    if (!selectedChild && children.length > 0) {
      Alert.alert('Fel', 'Välj vilket barn uppgiften är till');
      return;
    }

    if (children.length === 0) {
      Alert.alert('Fel', 'Du måste lägga till barn först');
      return;
    }

    if (!currentUser) return;

    const task: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      points: pointsNum,
      status: 'pending',
      createdBy: currentUser.id,
      assignedTo: selectedChild || children[0]?.id,
      createdAt: new Date(),
      recurring: recurring !== 'none' ? recurring : undefined,
    };

    addTask(task);
    
    const selectedChildName = children.find(c => c.id === selectedChild)?.name || children[0]?.name;
    Alert.alert('Uppgift skapad!', `${selectedChildName} har fått en ny uppgift!`);
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
              placeholder="T.ex. Städa rummet"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Beskrivning</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Vad ska göras?"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Poängvärde (chokladpengar) *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="0"
                value={points}
                onChangeText={setPoints}
                keyboardType="number-pad"
                placeholderTextColor={colors.textMuted}
              />
              <View style={styles.coinIcon}>
                <View style={styles.coinInner} />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Återkommande</Text>
            <View style={styles.optionsRow}>
              {[
                { value: 'none', label: 'Aldrig' },
                { value: 'daily', label: 'Dagligen' },
                { value: 'weekly', label: 'Veckovis' },
                { value: 'monthly', label: 'Månadsvis' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    recurring === option.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => setRecurring(option.value as any)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      recurring === option.value && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tilldela till vilket barn? *</Text>
            {children.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Inga barn tillagda</Text>
                <Text style={styles.emptySubtext}>
                  Lägg till barn från familjeinställningar
                </Text>
              </View>
            ) : (
              <View style={styles.childrenList}>
                {children.map((child) => (
                  <TouchableOpacity
                    key={child.id}
                    style={[
                      styles.childOption,
                      selectedChild === child.id && styles.childOptionSelected,
                    ]}
                    onPress={() => setSelectedChild(child.id)}
                  >
                    <ProfileIcon size={40} />
                    <View style={styles.childInfo}>
                      <Text
                        style={[
                          styles.childName,
                          selectedChild === child.id && styles.childNameSelected,
                        ]}
                      >
                        {child.name}
                      </Text>
                      <Text style={styles.childRole}>Barn</Text>
                    </View>
                    {selectedChild === child.id && (
                      <CheckboxIcon size={24} checked={true} status="approved" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Tips: Barnet får en notis när uppgiften skapas och kan börja arbeta på den direkt!
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Skapa uppgift"
              onPress={handleCreate}
              variant="primary"
              size="large"
              fullWidth
              disabled={children.length === 0}
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
    height: 120,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coinIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.chocolate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.secondaryLight,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.backgroundLight,
  },
  childrenList: {
    gap: 12,
  },
  childOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  childOptionSelected: {
    backgroundColor: '#FFF8F0',
    borderColor: colors.primary,
    borderWidth: 3,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  childNameSelected: {
    color: colors.primary,
  },
  childRole: {
    fontSize: 12,
    color: colors.textMuted,
  },
  emptyState: {
    backgroundColor: colors.backgroundLight,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: colors.textMuted,
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
