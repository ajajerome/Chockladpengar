import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Alert, SafeAreaView} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';
import {GradientBackground} from '../../components/GradientBackground';

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
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.emoji}>👨‍👩‍👧‍👦</Text>
            <Text style={styles.title}>Skapa ny familj</Text>
            <Text style={styles.subtitle}>
              Börja med att skapa en familj och lägg dig själv som första föräldern
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Familjenamn</Text>
              <TextInput
                style={styles.input}
                value={familyName}
                onChangeText={setFamilyName}
                placeholder="t.ex. Familjen Andersson"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ditt namn (Förälder)</Text>
              <TextInput
                style={styles.input}
                value={parentName}
                onChangeText={setParentName}
                placeholder="t.ex. Mamma, Pappa"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PIN-kod (4 siffror)</Text>
              <TextInput
                style={styles.input}
                value={pin}
                onChangeText={setPin}
                placeholder="••••"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bekräfta PIN-kod</Text>
              <TextInput
                style={styles.input}
                value={confirmPin}
                onChangeText={setConfirmPin}
                placeholder="••••"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="Skapa familj"
                onPress={handleCreate}
                loading={loading}
                disabled={loading}
                size="large"
              />

              <Button
                title="Tillbaka"
                onPress={() => navigation.goBack()}
                variant="outline"
              />
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.shadowCard,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.border,
    color: colors.text,
  },
  buttonGroup: {
    gap: 12,
    marginTop: 8,
  },
});
