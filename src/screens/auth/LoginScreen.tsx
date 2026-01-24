import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';
import {ChocolateCoinIcon} from '../../components/icons';

export const LoginScreen = ({navigation}: any) => {
  const {users, login} = useStore();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!selectedUser) {
      setError('Välj en användare');
      return;
    }

    const user = users.find(u => u.id === selectedUser);
    if (user?.pin) {
      if (pin.length !== 4) {
        setError('PIN-koden måste vara 4 siffror');
        return;
      }
    }

    const success = await login(selectedUser, pin || undefined);
    if (!success) {
      setError('Fel PIN-kod');
      setPin('');
    }
  };

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ChocolateCoinIcon size={64} />
          <Text style={styles.title}>Chokladpengar</Text>
          <Text style={styles.subtitle}>Välkommen till din chokladfabrik!</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.message}>
            Ingen familj hittades. Skapa en ny familj för att komma igång!
          </Text>
          <Button
            title="Skapa familj"
            onPress={() => navigation.navigate('CreateFamily')}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <ChocolateCoinIcon size={64} />
        <Text style={styles.title}>Chokladpengar</Text>
        <Text style={styles.subtitle}>Välj vem du är</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Användare:</Text>
        {users.map(user => (
          <TouchableOpacity
            key={user.id}
            style={[
              styles.userCard,
              selectedUser === user.id && styles.userCardSelected,
            ]}
            onPress={() => {
              setSelectedUser(user.id);
              setError('');
              setPin('');
            }}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>
              {user.role === 'parent' ? 'Förälder' : 'Barn'}
            </Text>
          </TouchableOpacity>
        ))}

        {selectedUser && users.find(u => u.id === selectedUser)?.pin && (
          <View style={styles.pinContainer}>
            <Text style={styles.label}>PIN-kod:</Text>
            <TextInput
              style={styles.pinInput}
              value={pin}
              onChangeText={setPin}
              placeholder="4 siffror"
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
          </View>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          title="Logga in"
          onPress={handleLogin}
          disabled={!selectedUser}
        />

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('CreateFamily')}>
          <Text style={styles.linkText}>Skapa ny familj</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 8,
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  userCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  userCardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.backgroundDark,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  userRole: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  pinContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  pinInput: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: 'center',
    letterSpacing: 8,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
});

