import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';
import {ChocolateCoinIcon} from '../../components/icons';
import {GradientBackground} from '../../components/GradientBackground';

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
      <GradientBackground>
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ChocolateCoinIcon size={80} />
          </View>
          <Text style={styles.title}>Chokladpengar</Text>
          <Text style={styles.subtitle}>Välkommen till din chokladfabrik!</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🏠</Text>
            <Text style={styles.emptyTitle}>Ingen familj hittades</Text>
            <Text style={styles.emptyText}>
              Skapa en ny familj för att komma igång!
            </Text>
          </View>
          <Button
            title="Skapa familj"
            onPress={() => navigation.navigate('CreateFamily')}
            size="large"
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ChocolateCoinIcon size={80} />
          </View>
          <Text style={styles.title}>Chokladpengar</Text>
          <Text style={styles.subtitle}>Välj vem du är</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Användare</Text>
          <View style={styles.userList}>
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
                }}
                activeOpacity={0.8}>
                <View style={[
                  styles.userAvatar,
                  {backgroundColor: user.role === 'parent' ? colors.cardGold : colors.cardCaramel}
                ]}>
                  <Text style={styles.userAvatarText}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userRole}>
                    {user.role === 'parent' ? '👨‍👩‍👧 Förälder' : '👶 Barn'}
                  </Text>
                </View>
                {selectedUser === user.id && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedUser && users.find(u => u.id === selectedUser)?.pin && (
            <View style={styles.pinContainer}>
              <Text style={styles.label}>PIN-kod</Text>
              <TextInput
                style={styles.pinInput}
                value={pin}
                onChangeText={setPin}
                placeholder="••••"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            </View>
          )}

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}

          <Button
            title="Logga in"
            onPress={handleLogin}
            disabled={!selectedUser}
            size="large"
          />

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('CreateFamily')}
            activeOpacity={0.7}>
            <Text style={styles.linkText}>Skapa ny familj</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 48,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.cardGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: colors.shadowCard,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  appEmoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: colors.textMuted,
    marginTop: 8,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  emptyCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: colors.shadowCard,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  userList: {
    marginBottom: 24,
  },
  userCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  userCardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.cardGold,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: colors.cardMocha,
  },
  userAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userRole: {
    fontSize: 15,
    color: colors.textLight,
    fontWeight: '500',
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  pinContainer: {
    marginBottom: 24,
  },
  pinInput: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    fontSize: 24,
    borderWidth: 2,
    borderColor: colors.border,
    textAlign: 'center',
    letterSpacing: 12,
    fontWeight: '600',
    color: colors.text,
    shadowColor: colors.shadowCard,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 1,
  },
  errorContainer: {
    backgroundColor: colors.cardCaramel,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 12,
  },
  linkText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '600',
  },
});
