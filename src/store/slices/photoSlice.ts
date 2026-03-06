import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface PhotoState {
  photos: Photo[];
  currentPhoto: Photo | null;
  loading: boolean;
  uploading: boolean;
  error: string | null;
}

const initialState: PhotoState = {
  photos: [],
  currentPhoto: null,
  loading: false,
  uploading: false,
  error: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
      state.error = null;
    },
    setCurrentPhoto: (state, action: PayloadAction<Photo | null>) => {
      state.currentPhoto = action.payload;
    },
    addPhoto: (state, action: PayloadAction<Photo>) => {
      state.photos.unshift(action.payload);
    },
    updatePhoto: (state, action: PayloadAction<Photo>) => {
      const index = state.photos.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.photos[index] = action.payload;
      }
      if (state.currentPhoto?._id === action.payload._id) {
        state.currentPhoto = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.uploading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setPhotos,
  setCurrentPhoto,
  addPhoto,
  updatePhoto,
  setLoading,
  setUploading,
  setError,
  clearError,
} = photoSlice.actions;

// Selectors
export const selectPhotos = (state: { photo: PhotoState }) => state.photo.photos;
export const selectCurrentPhoto = (state: { photo: PhotoState }) => state.photo.currentPhoto;
export const selectPhotoLoading = (state: { photo: PhotoState }) => state.photo.loading;
export const selectPhotoUploading = (state: { photo: PhotoState }) => state.photo.uploading;
export const selectPhotoError = (state: { photo: PhotoState }) => state.photo.error;

export default photoSlice.reducer;
