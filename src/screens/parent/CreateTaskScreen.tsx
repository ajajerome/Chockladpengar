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
import {Picker} from '@react-native-picker/picker';

export const CreateTaskScreen = ({navigation}: any) => {
  const currentUser = useStore(state => state.currentUser);
  const family = useStore(state =>
    state.families.find(f => f.id === currentUser?.familyId)
  );
  const children = useStore(state =>
    state.users.filter(u => family?.childIds.includes(u.id))
  );
  const createTask = useStore(state => state.createTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [assignedTo, setAssignedTo] = useState(children[0]?.id || '');

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Fel', 'Ange en titel');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Fel', 'Ange en beskrivning');
      return;
    }

    const pointsValue = parseInt(points, 10);
    if (isNaN(pointsValue) || pointsValue <= 0) {
      Alert.alert('Fel', 'Ange giltiga poäng');
      return;
    }

    if (!assignedTo) {
      Alert.alert('Fel', 'Välj ett barn');
      return;
    }

    createTask(title, description, pointsValue, assignedTo);
    Alert.alert('Klart!', 'Uppgiften har skapats');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Titel</Text>
        <TextInput
          style={styles.input}
          placeholder="T.ex. Diska"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Beskrivning</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Beskriv uppgiften"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Poäng (chokladpengar)</Text>
        <TextInput
          style={styles.input}
          placeholder="T.ex. 10"
          keyboardType="numeric"
          value={points}
          onChangeText={setPoints}
        />

        <Text style={styles.label}>Tilldela till</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={assignedTo}
            onValueChange={setAssignedTo}
            style={styles.picker}>
            {children.map(child => (
              <Picker.Item key={child.id} label={child.name} value={child.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Skapa uppgift" onPress={handleCreate} variant="primary" />
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
  pickerContainer: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: colors.text,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

