import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Alert, SafeAreaView} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';
import {GradientBackground} from '../../components/GradientBackground';

export const AddChildScreen = ({navigation, route}: any) => {
  const {addChild} = useStore();
  const {familyId} = route.params || {};
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert('Fel', 'Ange barnets namn');
      return;
    }

    if (pin && pin.length !== 4) {
      Alert.alert('Fel', 'PIN-koden måste vara 4 siffror eller lämnas tom');
      return;
    }

    setLoading(true);
    try {
      await addChild(familyId, name.trim(), pin || '');
      Alert.alert('Klart!', 'Barnet har lagts till', [
        {
          text: 'Lägg till fler',
          onPress: () => {
            setName('');
            setPin('');
          },
        },
        {
          text: 'Klar',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('Fel', 'Kunde inte lägga till barnet');
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
            <Text style={styles.emoji}>👶</Text>
            <Text style={styles.title}>Lägg till barn</Text>
            <Text style={styles.subtitle}>
              Lägg till dina barn i familjen. De kan välja att ha en PIN-kod eller inte.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Barnets namn</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="t.ex. Lisa, Emil"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PIN-kod (valfritt)</Text>
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
              <Text style={styles.hint}>
                Lämna tom om barnet inte ska ha PIN-kod
              </Text>
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="Lägg till barn"
                onPress={handleAdd}
                loading={loading}
                disabled={loading}
                size="large"
              />

              <Button
                title="Klar, gå till login"
                onPress={() => navigation.navigate('Login')}
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
  hint: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
    fontStyle: 'italic',
  },
  buttonGroup: {
    gap: 12,
    marginTop: 8,
  },
});
