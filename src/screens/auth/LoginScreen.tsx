import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { ProfileIcon, HomeIcon } from '../../components/icons';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { setCurrentUser, users } = useStore();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Group users by family
  const families = users.reduce((acc, user) => {
    if (!acc[user.familyId]) {
      acc[user.familyId] = [];
    }
    acc[user.familyId].push(user);
    return acc;
  }, {} as Record<string, typeof users>);

  const handleLogin = () => {
    if (!selectedUser) return;
    const user = users.find((u) => u.id === selectedUser);
    if (user) {
      setCurrentUser(user);
    }
  };

  const hasFamilies = Object.keys(families).length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>C</Text>
              </View>
            </View>
            <Text style={styles.title}>Chokladpengar</Text>
            <Text style={styles.subtitle}>Motivationsapp för familjer</Text>
          </View>

          {hasFamilies ? (
            <>
              <Text style={styles.sectionTitle}>Välj vem du är</Text>
              <View style={styles.userList}>
                {Object.entries(families).map(([familyId, familyUsers]) => {
                  const parent = familyUsers.find((u) => u.role === 'parent');
                  const children = familyUsers.filter((u) => u.role === 'child');

                  return (
                    <View key={familyId} style={styles.familySection}>
                      <View style={styles.familyHeader}>
                        <HomeIcon size={16} color={colors.primary} />
                        <Text style={styles.familyName}>
                          {parent?.name}s familj
                        </Text>
                      </View>

                      {/* Parent */}
                      {parent && (
                        <TouchableOpacity
                          style={[
                            styles.userCard,
                            styles.parentCard,
                            selectedUser === parent.id && styles.userCardSelected,
                          ]}
                          onPress={() => setSelectedUser(parent.id)}
                        >
                          <View style={styles.userIcon}>
                            <ProfileIcon size={40} />
                          </View>
                          <View style={styles.userInfo}>
                            <Text style={styles.userName}>{parent.name}</Text>
                            <Text style={styles.userRole}>Förälder</Text>
                          </View>
                          {selectedUser === parent.id && (
                            <View style={styles.checkmark}>
                              <Text style={styles.checkmarkText}>✓</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      )}

                      {/* Children */}
                      {children.map((child) => (
                        <TouchableOpacity
                          key={child.id}
                          style={[
                            styles.userCard,
                            styles.childCard,
                            selectedUser === child.id && styles.userCardSelected,
                          ]}
                          onPress={() => setSelectedUser(child.id)}
                        >
                          <View style={styles.userIcon}>
                            <ProfileIcon size={40} />
                          </View>
                          <View style={styles.userInfo}>
                            <Text style={styles.userName}>{child.name}</Text>
                            <Text style={styles.userRole}>Barn</Text>
                          </View>
                          {selectedUser === child.id && (
                            <View style={styles.checkmark}>
                              <Text style={styles.checkmarkText}>✓</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                })}
              </View>

              <Button
                title="Logga in"
                onPress={handleLogin}
                variant="primary"
                size="large"
                fullWidth
                disabled={!selectedUser}
              />
            </>
          ) : (
            <View style={styles.emptyState}>
              <HomeIcon size={64} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Ingen familj ännu</Text>
              <Text style={styles.emptyText}>
                Skapa din familj för att komma igång med Chokladpengar
              </Text>
            </View>
          )}

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>eller</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Skapa ny familj"
            onPress={() => navigation.navigate('CreateFamily')}
            variant="secondary"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.backgroundLight,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  userList: {
    marginBottom: 24,
    gap: 20,
  },
  familySection: {
    gap: 8,
  },
  familyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingLeft: 4,
  },
  familyName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  parentCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  childCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  userCardSelected: {
    backgroundColor: '#FFF8F0',
    borderColor: colors.primary,
    borderWidth: 3,
  },
  userIcon: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 13,
    color: colors.textMuted,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: colors.backgroundLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: colors.textMuted,
  },
});
