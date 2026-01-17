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
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Skapa uppgift</Text>
            <Text style={styles.subtitle}>Lägg till en ny uppgift för ditt barn</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Titel</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. Diska"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Beskrivning</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Beskriv uppgiften"
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Poäng (chokladpengar)</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. 10"
              placeholderTextColor={colors.textMuted}
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
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    color: colors.text,
  },
  buttonContainer: {
    marginTop: 32,
  },
});

