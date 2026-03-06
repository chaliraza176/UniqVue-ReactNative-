import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { theme } from '../config/theme';

const { width, height } = Dimensions.get('window');

export const PhotoViewerScreen = ({ route, navigation }: any) => {
  const { photoId } = route.params;
  const [liked, setLiked] = useState(false);

  // TODO: Fetch photo details from API
  const photo = {
    _id: photoId,
    imageUrl: 'IMAGE_URL',
    uploadedBy: 'User Name',
    likes: 42,
    isWatermarked: true,
    taggedUsers: [],
    comments: [],
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Implement like logic
  };

  const handleDownload = () => {
    // TODO: Implement download logic (HD for premium users)
    console.log('Download photo');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Photo Preview</Text>
            {photo.isWatermarked && (
              <Text style={styles.watermarkOverlay}>WATERMARK</Text>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, liked && styles.actionButtonActive]}
            onPress={handleLike}
          >
            <Text style={styles.actionButtonText}>
              {liked ? '❤️' : '🤍'} {photo.likes + (liked ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
            <Text style={styles.actionButtonText}>⬇️ Download</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.uploadedBy}>Uploaded by {photo.uploadedBy}</Text>

          {photo.isWatermarked && (
            <View style={styles.upgradeNotice}>
              <Text style={styles.upgradeText}>
                Upgrade to Premium for HD downloads without watermark
              </Text>
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => navigation.navigate('Subscription')}
              >
                <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  content: {
    flexGrow: 1,
  },
  imageContainer: {
    width,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
  },
  watermarkOverlay: {
    position: 'absolute',
    ...theme.typography.h1,
    color: 'rgba(255, 255, 255, 0.3)',
    transform: [{ rotate: '-45deg' }],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  actionButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  actionButtonActive: {
    opacity: 1,
  },
  actionButtonText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  details: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
  },
  uploadedBy: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  upgradeNotice: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.md,
  },
  upgradeText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  upgradeButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
});
