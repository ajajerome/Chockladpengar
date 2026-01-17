import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';
import {GradientBackground} from '../../components/GradientBackground';

export const CreateRewardScreen = ({navigation}: any) => {
  const createReward = useStore(state => state.createReward);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('');

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Fel', 'Ange en titel');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Fel', 'Ange en beskrivning');
      return;
    }

    const costValue = parseInt(cost, 10);
    if (isNaN(costValue) || costValue <= 0) {
      Alert.alert('Fel', 'Ange giltigt pris');
      return;
    }

    if (!category.trim()) {
      Alert.alert('Fel', 'Ange en kategori');
      return;
    }

    createReward(title, description, costValue, category);
    Alert.alert('Klart!', 'Belöningen har skapats');
    navigation.goBack();
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Skapa belöning</Text>
            <Text style={styles.subtitle}>Lägg till en ny belöning till shoppen</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Titel</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. Glass"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Beskrivning</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Beskriv belöningen"
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Pris (chokladpengar)</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. 50"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={cost}
              onChangeText={setCost}
            />

            <Text style={styles.label}>Kategori</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. Mat & Dryck"
              placeholderTextColor={colors.textMuted}
              value={category}
              onChangeText={setCategory}
            />

            <View style={styles.buttonContainer}>
              <Button title="Skapa belöning" onPress={handleCreate} variant="secondary" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: colors.textMuted,
    fontWeight: '500',
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 32,
  },
});

