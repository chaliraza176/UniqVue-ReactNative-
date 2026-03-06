import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../config/theme';

type Plan = 'FREE' | 'PREMIUM' | 'BUSINESS';

interface PlanDetails {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const plans: Record<Plan, PlanDetails> = {
  FREE: {
    name: 'Free',
    price: '$0/month',
    features: [
      '1 event per month',
      'Watermarked photos',
      'Basic photo upload',
      'QR code access',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: '$9.99/month',
    features: [
      'Unlimited events',
      'HD photos without watermark',
      'AI face tagging',
      'Priority support',
      'Instagram integration',
    ],
    popular: true,
  },
  BUSINESS: {
    name: 'Business',
    price: '$29.99/month',
    features: [
      'Everything in Premium',
      'Business analytics dashboard',
      'Custom branding',
      'Extended storage',
      'Team collaboration',
      'API access',
    ],
  },
};

export const SubscriptionScreen = ({ navigation }: any) => {
  const [currentPlan, setCurrentPlan] = useState<Plan>('FREE');

  const handleSelectPlan = (plan: Plan) => {
    if (plan === currentPlan) return;
    // TODO: Implement Stripe payment flow
    console.log('Select plan:', plan);
  };

  const renderPlanCard = (planKey: Plan) => {
    const plan = plans[planKey];
    const isCurrentPlan = planKey === currentPlan;

    return (
      <View
        key={planKey}
        style={[
          styles.planCard,
          plan.popular && styles.planCardPopular,
          isCurrentPlan && styles.planCardCurrent,
        ]}
      >
        {plan.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>MOST POPULAR</Text>
          </View>
        )}

        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planPrice}>{plan.price}</Text>

        <View style={styles.features}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.selectButton,
            isCurrentPlan && styles.selectButtonCurrent,
            plan.popular && !isCurrentPlan && styles.selectButtonPopular,
          ]}
          onPress={() => handleSelectPlan(planKey)}
          disabled={isCurrentPlan}
        >
          <Text
            style={[
              styles.selectButtonText,
              isCurrentPlan && styles.selectButtonTextCurrent,
            ]}
          >
            {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Upgrade to unlock premium features and enhance your experience
        </Text>

        <View style={styles.plansContainer}>
          {(Object.keys(plans) as Plan[]).map(renderPlanCard)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All plans include secure storage and 24/7 support
          </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>View Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
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
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  plansContainer: {
    gap: theme.spacing.md,
  },
  planCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  planCardPopular: {
    borderColor: theme.colors.primary,
  },
  planCardCurrent: {
    backgroundColor: theme.colors.surface,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.white,
  },
  planName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  planPrice: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  features: {
    marginBottom: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureIcon: {
    fontSize: 16,
    color: theme.colors.success,
    marginRight: theme.spacing.sm,
    fontWeight: '700',
  },
  featureText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  selectButton: {
    backgroundColor: theme.colors.white,
    height: 50,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectButtonPopular: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  selectButtonCurrent: {
    backgroundColor: theme.colors.surface,
  },
  selectButtonText: {
    ...theme.typography.button,
    color: theme.colors.text,
  },
  selectButtonTextCurrent: {
    color: theme.colors.textSecondary,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  footerLink: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
});
