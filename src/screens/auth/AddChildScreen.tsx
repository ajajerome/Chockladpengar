import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Alert} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';

export const AddChildScreen = ({navigation, route}: any) => {
  const {familyId} = route.params;
  const {addChild} = useStore();
  const [childName, setChildName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!childName.trim()) {
      Alert.alert('Fel', 'Ange barnets namn');
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
      await addChild(familyId, childName.trim(), pin);
      setChildName('');
      setPin('');
      setConfirmPin('');
      Alert.alert('Klart!', 'Barnet har lagts till.', [
        {
          text: 'Lägg till fler',
          onPress: () => {},
        },
        {
          text: 'Klar',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('Fel', 'Kunde inte lägga till barnet. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Lägg till barn</Text>
      <Text style={styles.subtitle}>
        Skapa ett konto för ditt barn
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Barnets namn</Text>
        <TextInput
          style={styles.input}
          value={childName}
          onChangeText={setChildName}
          placeholder="t.ex. Emma, Oscar"
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
          title="Lägg till barn"
          onPress={handleAdd}
          loading={loading}
          disabled={loading}
        />

        <Button
          title="Klar, gå till inloggning"
          onPress={() => navigation.navigate('Login')}
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

