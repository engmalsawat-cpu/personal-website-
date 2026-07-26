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
import * as Haptics from 'expo-haptics';

const services = [
  {
    number: '01',
    title: 'Workflow design',
    body: 'Turn scattered processes into a clear way of working that people can actually follow.',
    tag: 'Clarity',
  },
  {
    number: '02',
    title: 'Tools that fit the work',
    body: 'Set up Asana, Notion, or ClickUp around your team—not the other way around.',
    tag: 'Structure',
  },
  {
    number: '03',
    title: 'Simple AI & automation',
    body: 'Remove repetitive steps with practical automations that stay understandable and useful.',
    tag: 'Momentum',
  },
];

const steps = [
  [
    '01',
    'See the real work',
    'I map how work moves today, including the handoffs, bottlenecks, and workarounds.',
  ],
  [
    '02',
    'Create the clear path',
    'Together we simplify the process and give every tool a clear purpose.',
  ],
  [
    '03',
    'Make it easier to run',
    'We automate the repeatable parts and leave your team with a system they can own.',
  ],
];

function ServiceRow({
  service,
  colors,
  isLast,
}: {
  service: (typeof services)[0];
  colors: ReturnType<typeof useColors>;
  isLast: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 2,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 2,
    }).start();
  };

  const s = makeServiceStyles(colors);

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

function makeServiceStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 22,
      gap: 16,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    number: {
      fontFamily: 'Georgia',
      fontSize: 11,
      color: colors.mutedForeground,
      paddingTop: 4,
      width: 28,
    },
    body: {
      flex: 1,
      gap: 6,
    },
    title: {
      fontFamily: 'Georgia',
      fontSize: 22,
      color: colors.foreground,
      fontWeight: '400' as const,
    },
    description: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
      lineHeight: 21,
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
      fontFamily: 'Inter_500Medium',
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

  const HEADER_HEIGHT = 58;
  const topInset = isWeb ? 67 : insets.top;
  const bottomInset = isWeb ? 34 : insets.bottom;

  const s = makeStyles(colors, topInset, HEADER_HEIGHT, bottomInset);

  const handleCTA = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={s.root}>
      {/* Fixed header */}
      <View style={s.header}>
        <View style={s.brandMark}>
          <Text style={s.brandMarkText}>MA</Text>
        </View>
        <View style={s.brandCopy}>
          <Text style={s.brandName}>Mohammed Alsawat</Text>
          <Text style={s.brandSub}>Work Systems & AI</Text>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={s.hero}>
          <Text style={s.heroHeadline}>
            {'There\'s a\nbetter '}
            <Text style={s.heroAccent}>way.</Text>
          </Text>
          <Text style={s.heroIntro}>
            I help teams simplify workflows, choose the right tools, and use
            practical AI automation.
          </Text>
          <TouchableOpacity
            style={s.heroCta}
            onPress={handleCTA}
            activeOpacity={0.85}
            testID="hero-cta"
          >
            <Text style={s.heroCtaText}>Simplify your workflow  →</Text>
          </TouchableOpacity>
        </View>

        {/* ── Services ── */}
        <View style={s.section}>
          <Text style={s.kicker}>How I help</Text>
          <Text style={s.h2}>{'Better systems.\nLess friction.'}</Text>
          <Text style={s.sectionDescription}>
            I connect the way people work, the tools they use, and the
            automations that can give them time back.
          </Text>
          <View style={s.serviceList}>
            {services.map((service, i) => (
              <ServiceRow
                key={service.number}
                service={service}
                colors={colors}
                isLast={i === services.length - 1}
              />
            ))}
          </View>
        </View>

        {/* ── Approach ── */}
        <View style={s.approach}>
          <Text style={s.approachKicker}>A practical approach</Text>
          <Text style={s.approachH2}>{'From tangled\nto clear.'}</Text>
          <Text style={s.approachDescription}>
            No heavy transformation program. Just a thoughtful look at the
            work, a simpler design, and useful changes your team can keep.
          </Text>
          <View style={s.steps}>
            {steps.map(([number, title, body]) => (
              <View key={number} style={s.step}>
                <Text style={s.stepNumber}>{number}</Text>
                <View style={s.stepLine} />
                <Text style={s.stepTitle}>{title}</Text>
                <Text style={s.stepBody}>{body}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── About ── */}
        <View style={s.about}>
          <View style={s.aboutNoteWrapper}>
            <View style={s.aboutNote}>
              <Text style={s.aboutNoteText}>About the work</Text>
              <View style={s.paperPin} />
            </View>
          </View>
          <Text style={s.aboutH2}>
            {'I make the complicated\n'}
            <Text style={s.aboutH2Em}>easier to work with.</Text>
          </Text>
          <View style={s.aboutDivider} />
          <Text style={s.aboutBody}>
            I&apos;m Mohammed Alsawat, a workflow systems and AI consultant
            based in Riyadh. I help teams step back from the daily noise and
            build a way of working that feels clearer, calmer, and easier to
            improve.
          </Text>
          <Text style={[s.aboutBody, { marginTop: 16 }]}>
            My work sits between people, process, and technology—from
            designing task systems to introducing practical AI and automation
            without adding more complexity.
          </Text>
        </View>

        {/* ── Closing CTA ── */}
        <View style={s.closing}>
          <Text style={s.closingKicker}>Ready when you are</Text>
          <Text style={s.closingH2}>Less chaos.</Text>
          <View style={s.closingAccentLine}>
            <Text style={s.closingH2Accent}>Clearer work.</Text>
          </View>
          <TouchableOpacity
            style={s.closingBtn}
            onPress={handleCTA}
            activeOpacity={0.85}
            testID="closing-cta"
          >
            <Text style={s.closingBtnText}>Start with a clearer view  ↑</Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer ── */}
        <View style={[s.footer, { paddingBottom: bottomInset + 24 }]}>
          <Text style={s.footerName}>Mohammed Alsawat</Text>
          <Text style={s.footerTagline}>
            Workflow Systems · Task Tools · Simple AI
          </Text>
          <Text style={s.footerLocation}>
            Riyadh, Saudi Arabia · Available for selected consulting projects
          </Text>
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
) {
  const headerTotal = topInset + headerHeight;
  const px = 24;

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
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
      fontFamily: 'Inter_700Bold',
      fontSize: 12,
      color: colors.foreground,
      letterSpacing: -0.5,
    },
    brandCopy: {
      gap: 2,
    },
    brandName: {
      fontFamily: 'Inter_700Bold',
      fontSize: 13,
      color: colors.foreground,
    },
    brandSub: {
      fontFamily: 'Inter_400Regular',
      fontSize: 10,
      color: colors.mutedForeground,
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
      fontFamily: 'Georgia',
      fontSize: 58,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: 60,
      letterSpacing: -2.5,
      marginBottom: 24,
    },
    heroAccent: {
      fontFamily: 'Georgia',
      fontStyle: 'italic' as const,
      color: colors.foreground,
      textDecorationLine: 'underline' as const,
      textDecorationColor: colors.primary,
    },
    heroIntro: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      color: '#35332f',
      lineHeight: 26,
      marginBottom: 36,
      maxWidth: 320,
    },
    heroCta: {
      alignSelf: 'flex-start',
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
      fontFamily: 'Inter_700Bold',
      fontSize: 13,
      color: colors.foreground,
      letterSpacing: 0.2,
    },

    // ─── Generic section ─────────────────────────────────────────────────
    section: {
      paddingHorizontal: px,
      paddingTop: 72,
      paddingBottom: 72,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    kicker: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 10,
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
      color: colors.mutedForeground,
      marginBottom: 20,
    },
    h2: {
      fontFamily: 'Georgia',
      fontSize: 40,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: 44,
      letterSpacing: -1.5,
      marginBottom: 16,
    },
    sectionDescription: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
      lineHeight: 22,
      marginBottom: 36,
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
      fontFamily: 'Inter_600SemiBold',
      fontSize: 10,
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
      color: colors.approachKicker,
      marginBottom: 20,
    },
    approachH2: {
      fontFamily: 'Georgia',
      fontSize: 40,
      fontWeight: '400' as const,
      color: colors.approachForeground,
      lineHeight: 44,
      letterSpacing: -1.5,
      marginBottom: 16,
    },
    approachDescription: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.approachMuted,
      lineHeight: 22,
      marginBottom: 48,
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
      fontFamily: 'Georgia',
      fontSize: 12,
      color: colors.primary,
      marginBottom: 14,
    },
    stepLine: {
      width: 36,
      height: 1,
      backgroundColor: colors.primary,
      marginBottom: 16,
    },
    stepTitle: {
      fontFamily: 'Georgia',
      fontSize: 22,
      fontWeight: '400' as const,
      color: colors.approachForeground,
      marginBottom: 10,
    },
    stepBody: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.approachMuted,
      lineHeight: 22,
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
    },
    aboutNote: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.foreground,
      padding: 18,
      paddingBottom: 32,
      transform: [{ rotate: '-2.5deg' }],
      position: 'relative',
    },
    aboutNoteText: {
      fontFamily: 'Georgia',
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
      right: 10,
    },
    aboutH2: {
      fontFamily: 'Georgia',
      fontSize: 34,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: 40,
      letterSpacing: -1,
      marginBottom: 28,
    },
    aboutH2Em: {
      fontFamily: 'Georgia',
      fontStyle: 'italic' as const,
      color: colors.mutedForeground,
    },
    aboutDivider: {
      height: 1,
      backgroundColor: colors.foreground,
      marginBottom: 20,
    },
    aboutBody: {
      fontFamily: 'Inter_400Regular',
      fontSize: 15,
      color: '#3f3d38',
      lineHeight: 26,
    },

    // ─── Closing ──────────────────────────────────────────────────────────
    closing: {
      paddingHorizontal: px,
      paddingTop: 80,
      paddingBottom: 80,
      alignItems: 'center',
    },
    closingKicker: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 10,
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
      color: colors.mutedForeground,
      marginBottom: 20,
    },
    closingH2: {
      fontFamily: 'Georgia',
      fontSize: 48,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: 50,
      letterSpacing: -2,
      textAlign: 'center' as const,
    },
    closingAccentLine: {
      position: 'relative',
      marginBottom: 40,
    },
    closingH2Accent: {
      fontFamily: 'Georgia',
      fontSize: 48,
      fontWeight: '400' as const,
      color: colors.foreground,
      lineHeight: 50,
      letterSpacing: -2,
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
      fontFamily: 'Inter_700Bold',
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
      fontFamily: 'Inter_700Bold',
      fontSize: 13,
      color: colors.foreground,
    },
    footerTagline: {
      fontFamily: 'Inter_400Regular',
      fontSize: 11,
      color: colors.mutedForeground,
    },
    footerLocation: {
      fontFamily: 'Inter_400Regular',
      fontSize: 11,
      color: colors.mutedForeground,
      marginTop: 4,
    },
  });
}
