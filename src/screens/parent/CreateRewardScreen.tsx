import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';

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
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Titel</Text>
        <TextInput
          style={styles.input}
          placeholder="T.ex. Glass"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Beskrivning</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Beskriv belöningen"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Pris (chokladpengar)</Text>
        <TextInput
          style={styles.input}
          placeholder="T.ex. 50"
          keyboardType="numeric"
          value={cost}
          onChangeText={setCost}
        />

        <Text style={styles.label}>Kategori</Text>
        <TextInput
          style={styles.input}
          placeholder="T.ex. Mat & Dryck"
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.buttonContainer}>
          <Button title="Skapa belöning" onPress={handleCreate} variant="secondary" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
  },
});

