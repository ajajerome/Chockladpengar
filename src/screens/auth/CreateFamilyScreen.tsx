import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Alert} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';

export const CreateFamilyScreen = ({navigation}: any) => {
  const {createFamily} = useStore();
  const [familyName, setFamilyName] = useState('');
  const [parentName, setParentName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!familyName.trim()) {
      Alert.alert('Fel', 'Ange ett familjenamn');
      return;
    }

    if (!parentName.trim()) {
      Alert.alert('Fel', 'Ange ditt namn');
      return;
    }

    if (pin.length !== 4) {
      Alert.alert('Fel', 'PIN-koden måste vara 4 siffror');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('Fel', 'PIN-koderna matchar inte');
      return;
    }

    setLoading(true);
    try {
      const familyId = await createFamily(familyName.trim(), parentName.trim(), pin);
      Alert.alert('Klart!', 'Familjen har skapats. Nu kan du lägga till barn.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('AddChild', {familyId}),
        },
      ]);
    } catch (error) {
      Alert.alert('Fel', 'Kunde inte skapa familjen. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Skapa ny familj</Text>
      <Text style={styles.subtitle}>
        Börja med att skapa en familj och lägg dig själv som första föräldern
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Familjenamn</Text>
        <TextInput
          style={styles.input}
          value={familyName}
          onChangeText={setFamilyName}
          placeholder="t.ex. Familjen Andersson"
        />

        <Text style={styles.label}>Ditt namn (Förälder)</Text>
        <TextInput
          style={styles.input}
          value={parentName}
          onChangeText={setParentName}
          placeholder="t.ex. Mamma, Pappa"
        />

        <Text style={styles.label}>PIN-kod (4 siffror)</Text>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          placeholder="****"
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry
        />

        <Text style={styles.label}>Bekräfta PIN-kod</Text>
        <TextInput
          style={styles.input}
          value={confirmPin}
          onChangeText={setConfirmPin}
          placeholder="****"
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry
        />

        <Button
          title="Skapa familj"
          onPress={handleCreate}
          loading={loading}
          disabled={loading}
        />

        <Button
          title="Tillbaka"
          onPress={() => navigation.goBack()}
          variant="outline"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: -8,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

