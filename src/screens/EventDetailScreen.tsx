import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../config/theme';

export const EventDetailScreen = ({ route, navigation }: any) => {
  const { eventId } = route.params;
  const [rsvpStatus, setRsvpStatus] = useState<'ACCEPTED' | 'DECLINED' | null>(null);

  // TODO: Fetch event details from API
  const event = {
    _id: eventId,
    title: 'Sample Event',
    description: 'This is a sample event description',
    date: new Date().toISOString(),
    location: 'Sample Location',
    qrCode: 'QR_CODE_URL',
  };

  const handleRSVP = (status: 'ACCEPTED' | 'DECLINED') => {
    // TODO: Implement RSVP logic
    setRsvpStatus(status);
    console.log('RSVP:', status);
  };

  const handleViewPhotos = () => {
    navigation.navigate('PhotoGallery', { eventId });
  };

  const handleScanQR = () => {
    navigation.navigate('QRScanner', { eventId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>
              {new Date(event.date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{event.location}</Text>
          </View>
        </View>

        <View style={styles.rsvpSection}>
          <Text style={styles.sectionTitle}>RSVP Status</Text>
          <View style={styles.rsvpButtons}>
            <TouchableOpacity
              style={[
                styles.rsvpButton,
                rsvpStatus === 'ACCEPTED' && styles.rsvpButtonAccepted,
              ]}
              onPress={() => handleRSVP('ACCEPTED')}
            >
              <Text
                style={[
                  styles.rsvpButtonText,
                  rsvpStatus === 'ACCEPTED' && styles.rsvpButtonTextActive,
                ]}
              >
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rsvpButton,
                rsvpStatus === 'DECLINED' && styles.rsvpButtonDeclined,
              ]}
              onPress={() => handleRSVP('DECLINED')}
            >
              <Text
                style={[
                  styles.rsvpButtonText,
                  rsvpStatus === 'DECLINED' && styles.rsvpButtonTextActive,
                ]}
              >
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleViewPhotos}>
          <Text style={styles.buttonText}>View Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleScanQR}>
          <Text style={styles.secondaryButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  infoSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  infoLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    width: 80,
  },
  infoValue: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  rsvpSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  rsvpButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  rsvpButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rsvpButtonAccepted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  rsvpButtonDeclined: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  },
  rsvpButtonText: {
    ...theme.typography.button,
    color: theme.colors.text,
  },
  rsvpButtonTextActive: {
    color: theme.colors.white,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
  secondaryButton: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
});
