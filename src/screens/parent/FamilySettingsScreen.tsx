import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ProfileIcon, PlusIcon, SettingsIcon } from '../../components/icons';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const FamilySettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser, users, setCurrentUser } = useStore();

  const familyMembers = users.filter((u) => u.familyId === currentUser?.familyId);
  const parent = familyMembers.find((u) => u.role === 'parent');
  const children = familyMembers.filter((u) => u.role === 'child');

  const handleLogout = () => {
    Alert.alert(
      'Logga ut',
      'Är du säker på att du vill logga ut?',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Logga ut',
          style: 'destructive',
          onPress: () => {
            setCurrentUser(null);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <SettingsIcon size={28} />
          <Text style={styles.title}>Familjeinställningar</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Family Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Familj</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Familjenamn</Text>
            <Text style={styles.infoValue}>{parent?.name}s familj</Text>
          </View>
        </View>

        {/* Parent */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Förälder</Text>
          <View style={styles.memberCard}>
            <ProfileIcon size={50} />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{parent?.name}</Text>
              <Text style={styles.memberRole}>Administratör</Text>
            </View>
          </View>
        </View>

        {/* Children */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Barn ({children.length})</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddChild', { isFirstChild: false })}
            >
              <PlusIcon size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Lägg till</Text>
            </TouchableOpacity>
          </View>

          {children.length === 0 ? (
            <View style={styles.emptyState}>
              <ProfileIcon size={48} />
              <Text style={styles.emptyText}>Inga barn tillagda än</Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('AddChild', { isFirstChild: false })}
              >
                <Text style={styles.emptyButtonText}>Lägg till barn</Text>
              </TouchableOpacity>
            </View>
          ) : (
            children.map((child) => (
              <View key={child.id} style={styles.memberCard}>
                <ProfileIcon size={50} />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{child.name}</Text>
                  <Text style={styles.memberRole}>Barn</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Åtgärder</Text>

          <TouchableOpacity style={styles.actionCard} onPress={handleLogout}>
            <Text style={styles.actionText}>Logga ut</Text>
          </TouchableOpacity>

          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Chokladpengar v1.0.0</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 13,
    color: colors.textMuted,
  },
  emptyState: {
    backgroundColor: colors.backgroundLight,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 12,
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: colors.backgroundLight,
    fontSize: 14,
    fontWeight: '600',
  },
  actionCard: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
  versionInfo: {
    marginTop: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

