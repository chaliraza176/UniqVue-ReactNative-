import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../hooks/useTheme';
import { eventService } from '../services/eventService';
import { addEvent, setLoading } from '../store/slices/eventSlice';
import { selectUserRole } from '../store/slices/authSlice';
import { selectEvents } from '../store/slices/eventSlice';
import type { CreateEventScreenProps } from '../navigation/types';

export const CreateEventScreen: React.FC<CreateEventScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);
  const events = useSelector(selectEvents);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoadingState] = useState(false);

  // Form validation errors
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
      description: '',
      date: '',
      location: '',
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'Event title is required';
      isValid = false;
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      newErrors.date = 'Event date cannot be in the past';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateEvent = async () => {
    // Clear previous errors
    setErrors({ title: '', description: '', date: '', location: '' });

    // Check subscription limits for FREE users
    if (userRole === 'FREE' && events.length >= 1) {
      Alert.alert(
        'Upgrade Required',
        'Free users can create only 1 event per month. Upgrade to Premium for unlimited events!',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Upgrade',
            onPress: () => navigation.navigate('Subscription'),
          },
        ]
      );
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      setLoadingState(true);
      dispatch(setLoading(true));

      // Format date to ISO string
      const eventData = {
        title: title.trim(),
        description: description.trim(),
        date: date.toISOString(),
        location: location.trim(),
      };

      // Mock event creation for testing without backend
      const newEvent = {
        _id: Date.now().toString(),
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        location: eventData.location,
        createdBy: '123',
        qrCode: `QR${Date.now()}`,
        storageExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        createdAt: new Date().toISOString(),
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Add to Redux store
      dispatch(addEvent(newEvent));

      // Original API call (commented out for testing)
      // const response = await eventService.createEvent(eventData);
      // dispatch(addEvent(response.event));

      // Show success message
      Alert.alert('Success', 'Event created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Failed to create event. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const onDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      // Clear date error when user selects a date
      setErrors((prev) => ({ ...prev, date: '' }));
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create New Event</Text>
        <Text style={styles.subtitle}>Fill in the details below</Text>

        {/* Event Title */}
        <Text style={styles.label}>Event Title *</Text>
        <TextInput
          style={[styles.input, errors.title ? styles.inputError : null]}
          placeholder="e.g., Birthday Party, Wedding"
          placeholderTextColor="#999"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
          }}
        />
        {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

        {/* Description */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            errors.description ? styles.inputError : null,
          ]}
          placeholder="Describe your event..."
          placeholderTextColor="#999"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (errors.description)
              setErrors((prev) => ({ ...prev, description: '' }));
          }}
          multiline
          numberOfLines={4}
        />
        {errors.description ? (
          <Text style={styles.errorText}>{errors.description}</Text>
        ) : null}

        {/* Date Picker */}
        <Text style={styles.label}>Event Date *</Text>
        <TouchableOpacity
          style={[styles.input, styles.dateButton, errors.date ? styles.inputError : null]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(date)}</Text>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
        {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Location */}
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={[styles.input, errors.location ? styles.inputError : null]}
          placeholder="e.g., New York, NY"
          placeholderTextColor="#999"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
          }}
        />
        {errors.location ? (
          <Text style={styles.errorText}>{errors.location}</Text>
        ) : null}

        {/* Create Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreateEvent}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={styles.buttonText}>Create Event</Text>
          )}
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Free Tier Info */}
        {userRole === 'FREE' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              Free users can create 1 event per month. You have used {events.length}/1
              events.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.colors.white,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  textArea: {
    height: 100,
    paddingTop: theme.spacing.md,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  calendarIcon: {
    fontSize: 20,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: -theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
  cancelButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  cancelButtonText: {
    ...theme.typography.button,
    color: theme.colors.textSecondary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    flex: 1,
  },
});
