import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../hooks/useTheme';
import { userService } from '../services/userService';
import {
  selectUser,
  selectUserRole,
  logout,
  updateUser,
} from '../store/slices/authSlice';
import {
  selectSubscription,
  selectSubscriptionStatus,
} from '../store/slices/subscriptionSlice';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);
  const subscription = useSelector(selectSubscription);
  const subscriptionStatus = useSelector(selectSubscriptionStatus);

  const [instagramLink, setInstagramLink] = useState(user?.instagramLink || '');
  const [isEditingInstagram, setIsEditingInstagram] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instagramError, setInstagramError] = useState('');

  // Validate Instagram URL
  const validateInstagramUrl = (url: string): boolean => {
    if (!url.trim()) {
      return true; // Empty is valid (user can remove link)
    }

    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/;
    return instagramRegex.test(url);
  };

  // Handle profile image update
  const handleUpdateProfileImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', 'Failed to select image');
        return;
      }

      if (result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;

        if (!imageUri) {
          Alert.alert('Error', 'Invalid image selected');
          return;
        }

        setLoading(true);

        // Mock API call - comment out real API
        // const response = await userService.updateProfile({
        //   profileImage: imageUri,
        // });

        // Simulate API delay
        await new Promise<void>(resolve => setTimeout(resolve, 500));

        // Mock response
        const mockResponse = {
          user: {
            ...user,
            profileImage: imageUri,
          }
        };

        dispatch(updateUser(mockResponse.user));
        Alert.alert('Success', 'Profile image updated successfully');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile image');
    } finally {
      setLoading(false);
    }
  };

  // Handle Instagram link update
  const handleUpdateInstagram = async () => {
    // Clear previous error
    setInstagramError('');

    // Validate URL
    if (!validateInstagramUrl(instagramLink)) {
      setInstagramError('Please enter a valid Instagram URL (e.g., https://instagram.com/username)');
      return;
    }

    try {
      setLoading(true);

      // Mock API call - comment out real API
      // const response = await userService.updateInstagram({
      //   instagramLink: instagramLink.trim(),
      // });

      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 500));

      // Mock response
      const mockResponse = {
        user: {
          ...user,
          instagramLink: instagramLink.trim(),
        }
      };

      dispatch(updateUser(mockResponse.user));
      setIsEditingInstagram(false);
      Alert.alert('Success', 'Instagram link updated successfully');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update Instagram link';
      setInstagramError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            // Navigation will be handled automatically by the auth state change
          },
        },
      ]
    );
  };

  // Handle upgrade/manage subscription
  const handleSubscriptionAction = () => {
    navigation.navigate('Subscription');
  };

  // Get subscription display info
  const getSubscriptionInfo = () => {
    const plan = userRole || 'FREE';
    const status = subscriptionStatus || 'ACTIVE';

    let statusColor = theme.colors.success;
    let statusText = 'Active';

    if (status === 'EXPIRED') {
      statusColor = theme.colors.error;
      statusText = 'Expired';
    } else if (status === 'CANCELLED') {
      statusColor = theme.colors.warning;
      statusText = 'Cancelled';
    }

    return { plan, status, statusColor, statusText };
  };

  const subscriptionInfo = getSubscriptionInfo();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileImageSection}>
        <View style={styles.profileImageContainer}>
          {user.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.editImageButton}
            onPress={handleUpdateProfileImage}
            disabled={loading}
          >
            <Text style={styles.editImageButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Subscription Status Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Subscription</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: subscriptionInfo.statusColor },
            ]}
          >
            <Text style={styles.statusText}>{subscriptionInfo.statusText}</Text>
          </View>
        </View>

        <View style={styles.planContainer}>
          <Text style={styles.planLabel}>Current Plan</Text>
          <Text style={styles.planValue}>{subscriptionInfo.plan}</Text>
        </View>

        {subscription?.endDate && (
          <View style={styles.planContainer}>
            <Text style={styles.planLabel}>Renewal Date</Text>
            <Text style={styles.planValue}>
              {new Date(subscription.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.subscriptionButton}
          onPress={handleSubscriptionAction}
        >
          <Text style={styles.subscriptionButtonText}>
            {userRole === 'FREE' ? 'Upgrade Plan' : 'Manage Subscription'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Instagram Link Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Instagram</Text>
          {!isEditingInstagram && user.instagramLink && (
            <TouchableOpacity
              onPress={() => setIsEditingInstagram(true)}
              disabled={loading}
            >
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditingInstagram || !user.instagramLink ? (
          <View>
            <TextInput
              style={[
                styles.input,
                instagramError && styles.inputError,
              ]}
              placeholder="https://instagram.com/username"
              placeholderTextColor={theme.colors.textSecondary}
              value={instagramLink}
              onChangeText={(text) => {
                setInstagramLink(text);
                if (instagramError) {
                  setInstagramError('');
                }
              }}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            {instagramError && (
              <Text style={styles.errorText}>{instagramError}</Text>
            )}

            <View style={styles.buttonRow}>
              {isEditingInstagram && (
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={() => {
                    setIsEditingInstagram(false);
                    setInstagramLink(user.instagramLink || '');
                    setInstagramError('');
                  }}
                  disabled={loading}
                >
                  <Text style={styles.buttonSecondaryText}>Cancel</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary, loading && styles.buttonDisabled]}
                onPress={handleUpdateInstagram}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.white} size="small" />
                ) : (
                  <Text style={styles.buttonPrimaryText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // Open Instagram link
              // TODO: Implement deep linking to Instagram app or browser
              Alert.alert('Instagram', `Open ${user.instagramLink}?`);
            }}
          >
            <Text style={styles.instagramLink}>{user.instagramLink}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
        disabled={loading}
      >
        <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loading}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.border,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    fontSize: 48,
    fontWeight: '600',
    color: theme.colors.white,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  editImageButtonText: {
    fontSize: 16,
  },
  userName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  card: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.white,
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  planLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  planValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  subscriptionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  subscriptionButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
    fontSize: 14,
  },
  editLink: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontSize: 14,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  button: {
    flex: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.textSecondary,
  },
  buttonPrimaryText: {
    ...theme.typography.button,
    color: theme.colors.white,
    fontSize: 14,
  },
  buttonSecondaryText: {
    ...theme.typography.button,
    color: theme.colors.text,
    fontSize: 14,
  },
  instagramLink: {
    ...theme.typography.body,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  settingsButton: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  settingsButtonText: {
    ...theme.typography.button,
    color: theme.colors.text,
  },
  logoutButton: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  logoutButtonText: {
    ...theme.typography.button,
    color: theme.colors.error,
  },
});
