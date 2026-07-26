import React, { useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useLang } from '@/contexts/LanguageContext';
import { useT } from '@/constants/translations';
import * as Haptics from 'expo-haptics';

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Cairo_400Regular  → body / serif equivalent
// Cairo_500Medium   → medium weight
// Cairo_600SemiBold → kickers / labels
// Cairo_700Bold     → bold / brand

function ServiceRow({
  service,
  colors,
  isLast,
  isAR,
}: {
  service: { number: string; title: string; body: string; tag: string };
  colors: ReturnType<typeof useColors>;
  isLast: boolean;
  isAR: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 50, bounciness: 2 }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 2 }).start();

  const s = makeServiceStyles(colors, isAR);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => Haptics.selectionAsync()}
        style={[s.row, !isLast && s.rowBorder]}
        testID={`service-row-${service.number}`}
      >
        <Text style={s.number}>{service.number}</Text>
        <View style={s.body}>
          <Text style={s.title}>{service.title}</Text>
          <Text style={s.description}>{service.body}</Text>
        </View>
        <View style={s.tag}>
          <Text style={s.tagText}>{service.tag}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function makeServiceStyles(colors: ReturnType<typeof useColors>, isAR: boolean) {
  return StyleSheet.create({
    row: {
      flexDirection: isAR ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
      paddingVertical: 22,
      gap: 16,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    number: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 11,
      color: colors.mutedForeground,
      paddingTop: 4,
      width: 28,
      textAlign: isAR ? 'right' : 'left',
    },
    body: {
      flex: 1,
      gap: 6,
    },
    title: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 22,
      color: colors.foreground,
      fontWeight: '400' as const,
      textAlign: isAR ? 'right' : 'left',
    },
    description: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
      lineHeight: isAR ? 26 : 21,
      textAlign: isAR ? 'right' : 'left',
    },
    tag: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 99,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignSelf: 'flex-start',
    },
    tagText: {
      fontFamily: 'Cairo_600SemiBold',
      fontSize: 9,
      textTransform: 'uppercase' as const,
      letterSpacing: 1,
      color: colors.foreground,
    },
  });
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const { lang, isAR, toggle } = useLang();
  const tr = useT(lang);

  const HEADER_HEIGHT = 58;
  const topInset = isWeb ? 67 : insets.top;
  const bottomInset = isWeb ? 34 : insets.bottom;

  const s = makeStyles(colors, topInset, HEADER_HEIGHT, bottomInset, isAR);

  const handleCTA = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={s.root}>
      {/* ── Fixed header ── */}
      <View style={s.header}>
        {/* Brand (left in EN, right in AR) */}
        <View style={s.brandRow}>
          <View style={s.brandMark}>
            <Text style={s.brandMarkText}>MA</Text>
          </View>
          <View style={s.brandCopy}>
            <Text style={s.brandName}>{tr.brandName}</Text>
            <Text style={s.brandSub}>{tr.brandSub}</Text>
          </View>
        </View>

        {/* Language toggle */}
        <TouchableOpacity
          onPress={() => {
            Haptics.selectionAsync();
            toggle();
          }}
          style={s.langBtn}
          activeOpacity={0.7}
          testID="lang-toggle"
        >
          <Text style={s.langBtnText}>{tr.langToggle}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={s.hero}>
          <Text style={s.heroHeadline}>
            {tr.heroLine1}
            <Text style={s.heroAccent}>{tr.heroAccent}</Text>
          </Text>
          <Text style={s.heroIntro}>{tr.heroIntro}</Text>
          <TouchableOpacity
            style={s.heroCta}
            onPress={handleCTA}
            activeOpacity={0.85}
            testID="hero-cta"
          >
            <Text style={s.heroCtaText}>{tr.heroCta}</Text>
          </TouchableOpacity>
        </View>

        {/* ── Services ── */}
        <View style={s.section}>
          <Text style={s.kicker}>{tr.servicesKicker}</Text>
          <Text style={s.h2}>{tr.servicesH2}</Text>
          <Text style={s.sectionDescription}>{tr.servicesDesc}</Text>
          <View style={s.serviceList}>
            {tr.services.map((service, i) => (
              <ServiceRow
                key={service.number}
                service={service}
                colors={colors}
                isLast={i === tr.services.length - 1}
                isAR={isAR}
              />
            ))}
          </View>
        </View>

        {/* ── Approach ── */}
        <View style={s.approach}>
          <Text style={s.approachKicker}>{tr.approachKicker}</Text>
          <Text style={s.approachH2}>{tr.approachH2}</Text>
          <Text style={s.approachDescription}>{tr.approachDesc}</Text>
          <View style={s.steps}>
            {tr.steps.map((step) => (
              <View key={step.number} style={s.step}>
                <Text style={s.stepNumber}>{step.number}</Text>
                <View style={s.stepLine} />
                <Text style={s.stepTitle}>{step.title}</Text>
                <Text style={s.stepBody}>{step.body}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── About ── */}
        <View style={s.about}>
          <View style={s.aboutNoteWrapper}>
            <View style={s.aboutNote}>
              <Text style={s.aboutNoteText}>{tr.aboutNoteLabel}</Text>
              <View style={s.paperPin} />
            </View>
          </View>
          <Text style={s.aboutH2}>
            {tr.aboutH2Line1}
            <Text style={s.aboutH2Em}>{tr.aboutH2Em}</Text>
          </Text>
          <View style={s.aboutDivider} />
          <Text style={s.aboutBody}>{tr.aboutBody1}</Text>
          <Text style={[s.aboutBody, { marginTop: 16 }]}>{tr.aboutBody2}</Text>
        </View>

        {/* ── Closing CTA ── */}
        <View style={s.closing}>
          <Text style={s.closingKicker}>{tr.closingKicker}</Text>
          <Text style={s.closingH2}>{tr.closingH2}</Text>
          <View style={s.closingAccentLine}>
            <Text style={s.closingH2Accent}>{tr.closingH2Accent}</Text>
          </View>
          <TouchableOpacity
            style={s.closingBtn}
            onPress={handleCTA}
            activeOpacity={0.85}
            testID="closing-cta"
          >
            <Text style={s.closingBtnText}>{tr.closingBtn}</Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer ── */}
        <View style={[s.footer, { paddingBottom: bottomInset + 24 }]}>
          <Text style={s.footerName}>{tr.footerName}</Text>
          <Text style={s.footerTagline}>{tr.footerTagline}</Text>
          <Text style={s.footerLocation}>{tr.footerLocation}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function makeStyles(
  colors: ReturnType<typeof useColors>,
  topInset: number,
  headerHeight: number,
  bottomInset: number,
  isAR: boolean,
) {
  const headerTotal = topInset + headerHeight;
  const px = 24;
  const textAlign = isAR ? ('right' as const) : ('left' as const);
  const rowDir = isAR ? ('row-reverse' as const) : ('row' as const);
  const alignSelfDir = isAR ? ('flex-end' as const) : ('flex-start' as const);

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // ─── Header ───────────────────────────────────────────────────────────
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingTop: topInset,
      height: headerTotal,
      paddingHorizontal: px,
      flexDirection: rowDir,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    brandRow: {
      flexDirection: rowDir,
      alignItems: 'center',
      gap: 12,
    },
    brandMark: {
      width: 38,
      height: 38,
      borderWidth: 1,
      borderColor: colors.foreground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandMarkText: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 12,
      color: colors.foreground,
      letterSpacing: -0.5,
    },
    brandCopy: {
      gap: 2,
    },
    brandName: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 13,
      color: colors.foreground,
      textAlign,
    },
    brandSub: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 10,
      color: colors.mutedForeground,
      textAlign,
    },
    langBtn: {
      borderWidth: 1,
      borderColor: colors.foreground,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    langBtnText: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 11,
      color: colors.foreground,
      letterSpacing: 0.5,
    },

    // ─── Scroll ───────────────────────────────────────────────────────────
    scroll: {
      flex: 1,
      marginTop: headerTotal,
    },
    scrollContent: {
      flexGrow: 1,
    },

    // ─── Hero ─────────────────────────────────────────────────────────────
    hero: {
      paddingHorizontal: px,
      paddingTop: 56,
      paddingBottom: 64,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    heroHeadline: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 56,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: isAR ? 76 : 60,
      letterSpacing: isAR ? -1 : -2.5,
      marginBottom: 24,
      textAlign,
    },
    heroAccent: {
      fontFamily: 'Cairo_700Bold',
      color: colors.foreground,
      textDecorationLine: 'underline' as const,
      textDecorationColor: colors.primary,
    },
    heroIntro: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 16,
      color: '#35332f',
      lineHeight: isAR ? 32 : 26,
      marginBottom: 36,
      maxWidth: 320,
      textAlign,
    },
    heroCta: {
      alignSelf: alignSelfDir,
      borderWidth: 1,
      borderColor: colors.foreground,
      paddingHorizontal: 20,
      paddingVertical: 14,
      ...Platform.select({
        web: { boxShadow: `5px 5px 0px ${colors.primary}` },
        default: {
          shadowColor: colors.primary,
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 5,
        },
      }),
    },
    heroCtaText: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 13,
      color: colors.foreground,
      letterSpacing: 0.2,
    },

    // ─── Generic section ──────────────────────────────────────────────────
    section: {
      paddingHorizontal: px,
      paddingTop: 72,
      paddingBottom: 72,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    kicker: {
      fontFamily: 'Cairo_600SemiBold',
      fontSize: 10,
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
      color: colors.mutedForeground,
      marginBottom: 20,
      textAlign,
    },
    h2: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 40,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: isAR ? 60 : 44,
      letterSpacing: isAR ? -0.5 : -1.5,
      marginBottom: 16,
      textAlign,
    },
    sectionDescription: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
      lineHeight: isAR ? 28 : 22,
      marginBottom: 36,
      textAlign,
    },
    serviceList: {
      borderTopWidth: 1,
      borderTopColor: colors.foreground,
    },

    // ─── Approach ─────────────────────────────────────────────────────────
    approach: {
      backgroundColor: colors.approachBackground,
      paddingHorizontal: px,
      paddingTop: 72,
      paddingBottom: 80,
    },
    approachKicker: {
      fontFamily: 'Cairo_600SemiBold',
      fontSize: 10,
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
      color: colors.approachKicker,
      marginBottom: 20,
      textAlign,
    },
    approachH2: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 40,
      fontWeight: '400' as const,
      color: colors.approachForeground,
      lineHeight: isAR ? 60 : 44,
      letterSpacing: isAR ? -0.5 : -1.5,
      marginBottom: 16,
      textAlign,
    },
    approachDescription: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 14,
      color: colors.approachMuted,
      lineHeight: isAR ? 28 : 22,
      marginBottom: 48,
      textAlign,
    },
    steps: {
      gap: 36,
    },
    step: {
      borderTopWidth: 1,
      borderTopColor: colors.approachBorder,
      paddingTop: 18,
    },
    stepNumber: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 12,
      color: colors.primary,
      marginBottom: 14,
      textAlign,
    },
    stepLine: {
      width: 36,
      height: 1,
      backgroundColor: colors.primary,
      marginBottom: 16,
      alignSelf: alignSelfDir,
    },
    stepTitle: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 22,
      fontWeight: '400' as const,
      color: colors.approachForeground,
      marginBottom: 10,
      textAlign,
    },
    stepBody: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 14,
      color: colors.approachMuted,
      lineHeight: isAR ? 28 : 22,
      textAlign,
    },

    // ─── About ────────────────────────────────────────────────────────────
    about: {
      paddingHorizontal: px,
      paddingTop: 72,
      paddingBottom: 72,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    aboutNoteWrapper: {
      marginBottom: 36,
      alignItems: isAR ? 'flex-end' : 'flex-start',
    },
    aboutNote: {
      alignSelf: alignSelfDir,
      backgroundColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.foreground,
      padding: 18,
      paddingBottom: 32,
      transform: [{ rotate: isAR ? '2.5deg' : '-2.5deg' }],
      position: 'relative',
    },
    aboutNoteText: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 18,
      color: colors.foreground,
    },
    paperPin: {
      position: 'absolute',
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.foreground,
      top: 8,
      right: isAR ? undefined : 10,
      left: isAR ? 10 : undefined,
    },
    aboutH2: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 34,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: isAR ? 52 : 40,
      letterSpacing: isAR ? -0.5 : -1,
      marginBottom: 28,
      textAlign,
    },
    aboutH2Em: {
      fontFamily: 'Cairo_400Regular',
      fontStyle: 'italic' as const,
      color: colors.mutedForeground,
    },
    aboutDivider: {
      height: 1,
      backgroundColor: colors.foreground,
      marginBottom: 20,
    },
    aboutBody: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 15,
      color: '#3f3d38',
      lineHeight: isAR ? 30 : 26,
      textAlign,
    },

    // ─── Closing ──────────────────────────────────────────────────────────
    closing: {
      paddingHorizontal: px,
      paddingTop: 80,
      paddingBottom: 80,
      alignItems: 'center',
    },
    closingKicker: {
      fontFamily: 'Cairo_600SemiBold',
      fontSize: 10,
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
      color: colors.mutedForeground,
      marginBottom: 20,
      textAlign: 'center' as const,
    },
    closingH2: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 48,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: isAR ? 64 : 50,
      letterSpacing: isAR ? -1 : -2,
      textAlign: 'center' as const,
    },
    closingAccentLine: {
      position: 'relative',
      marginBottom: 40,
    },
    closingH2Accent: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 48,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: isAR ? 64 : 50,
      letterSpacing: isAR ? -1 : -2,
      textAlign: 'center' as const,
      borderBottomWidth: 4,
      borderBottomColor: colors.primary,
    },
    closingBtn: {
      borderWidth: 1,
      borderColor: colors.foreground,
      backgroundColor: colors.foreground,
      paddingHorizontal: 24,
      paddingVertical: 14,
    },
    closingBtnText: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 13,
      color: colors.background,
      letterSpacing: 0.2,
    },

    // ─── Footer ───────────────────────────────────────────────────────────
    footer: {
      paddingHorizontal: px,
      paddingTop: 28,
      borderTopWidth: 1,
      borderTopColor: colors.foreground,
      gap: 6,
    },
    footerName: {
      fontFamily: 'Cairo_700Bold',
      fontSize: 13,
      color: colors.foreground,
      textAlign,
    },
    footerTagline: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 11,
      color: colors.mutedForeground,
      textAlign,
    },
    footerLocation: {
      fontFamily: 'Cairo_400Regular',
      fontSize: 11,
      color: colors.mutedForeground,
      marginTop: 4,
      textAlign,
    },
  });
}
