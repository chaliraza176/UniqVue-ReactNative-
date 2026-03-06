import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { addPhoto, setUploading, selectPhotoUploading, selectPhotos } from '../store/slices/photoSlice';

interface Photo {
  _id: string;
  eventId: string;
  uploadedBy: string;
  imageUrl: string;
  taggedUsers: string[];
  likes: number;
  comments: Array<{
    userId: string;
    text: string;
    createdAt: string;
  }>;
  isWatermarked: boolean;
  createdAt: string;
}

const { width } = Dimensions.get('window');

export const PhotoGalleryScreen = ({ route, navigation }: any) => {
  const { eventId } = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();
  const uploading = useSelector(selectPhotoUploading);

  // Calculate item size dynamically
  const ITEM_SIZE = (width - 32 - 16) / 3; // 32 = padding, 16 = spacing

  // Load photos from Redux state and filter by eventId
  const allPhotos = useSelector(selectPhotos);
  const photos = allPhotos.filter(photo => photo.eventId === eventId);

  const renderPhoto = ({ item }: { item: Photo }) => (
    <TouchableOpacity
      style={[styles.photoItem, { width: ITEM_SIZE, height: ITEM_SIZE }]}
      onPress={() => navigation.navigate('PhotoViewer', { photoId: item._id })}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.photoImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.photoPlaceholder, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.photoPlaceholderText, { color: theme.colors.textSecondary }]}>Photo</Text>
        </View>
      )}
      {item.isWatermarked && (
        <View style={[styles.watermarkBadge, { backgroundColor: theme.colors.warning }]}>
          <Text style={[styles.watermarkText, { color: theme.colors.white }]}>WM</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const handleUploadPhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1920,
        maxHeight: 1920,
      });

      // Handle cancel case
      if (result.didCancel) {
        return;
      }

      // Handle error case
      if (result.errorCode) {
        Alert.alert(
          'Error',
          result.errorMessage || 'Failed to select image',
          [{ text: 'OK' }]
        );
        return;
      }

      // If image selected
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];

        // Mock upload logic - simulate API call
        dispatch(setUploading(true));
        
        setTimeout(() => {
          // Create mock photo object
          const newPhoto: Photo = {
            _id: Date.now().toString(),
            eventId: eventId,
            uploadedBy: 'current-user-id', // TODO: Get from auth state
            imageUrl: selectedImage.uri || '',
            taggedUsers: [],
            likes: 0,
            comments: [],
            isWatermarked: false, // TODO: Check user subscription
            createdAt: new Date().toISOString(),
          };

          // Add to Redux state
          dispatch(addPhoto(newPhoto));
          dispatch(setUploading(false));

          Alert.alert(
            'Upload Complete',
            'Your photo has been uploaded successfully!',
            [{ text: 'Great!' }]
          );
        }, 2000);
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      dispatch(setUploading(false));
      Alert.alert(
        'Error',
        'Failed to upload photo. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Event Photos</Text>
        <TouchableOpacity 
          style={[
            styles.uploadButton, 
            { backgroundColor: theme.colors.primary },
            uploading && styles.uploadButtonDisabled
          ]} 
          onPress={handleUploadPhoto}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <Text style={[styles.uploadButtonText, { color: theme.colors.white }]}>+ Upload</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No photos yet</Text>
            <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>Be the first to upload!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  uploadButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    opacity: 0.6,
  },
  uploadButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  grid: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  photoItem: {
    marginBottom: 8,
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 12,
  },
  watermarkBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  watermarkText: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
});
