import { StyleSheet, Font } from '@react-pdf/renderer';

Font.registerHyphenationCallback((word) => [word]);

export function createStyles(accent: string) {
  const accentLight = accent + '15';

  return StyleSheet.create({
    // Page
    page: {
      paddingTop: 28,
      paddingBottom: 60,
      paddingHorizontal: 48,
      fontSize: 10.5,
      color: '#2D2D2D',
      lineHeight: 1.55,
    },
    coverPage: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: 0,
    },

    // Cover — dark header + full-bleed photo
    coverDarkHeader: {
      height: 64,
      backgroundColor: '#2B2B2B',
      paddingHorizontal: 28,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    coverHeaderLogo: {
      width: 40,
      height: 40,
      objectFit: 'contain',
    },
    coverHeaderBusinessName: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    coverHeaderYear: {
      fontSize: 13,
      color: '#FFFFFF',
    },
    coverPhotoWrapper: {
      flex: 1,
      position: 'relative',
    },
    coverPhotoImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    coverTitleOverlay: {
      position: 'absolute',
      top: 85,
      left: 48,
    },
    coverTitleLine1: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#FFFFFF',
      lineHeight: 1.1,
    },
    coverTitleLine2: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#FFFFFF',
      lineHeight: 1.1,
    },
    coverContactOverlay: {
      position: 'absolute',
      bottom: 28,
      right: 28,
      alignItems: 'flex-end',
    },
    coverContactOverlayText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 6,
    },

    // Cover (no photo fallback)
    coverTopBar: {
      height: 6,
      backgroundColor: accent,
    },
    coverBody: {
      paddingHorizontal: 48,
      paddingTop: 48,
    },
    coverLogoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 32,
    },
    coverLogo: {
      width: 64,
      height: 64,
      objectFit: 'contain',
    },
    coverBusinessName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: 6,
    },
    coverMission: {
      fontSize: 11,
      color: '#555',
      marginBottom: 6,
      fontStyle: 'italic',
      maxWidth: 420,
    },
    coverTagline: {
      fontSize: 11,
      color: accent,
      marginBottom: 32,
    },
    coverHeroImage: {
      width: '100%',
      height: 220,
      objectFit: 'cover',
      borderRadius: 4,
    },
    coverContactBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: accent,
      paddingVertical: 14,
      paddingHorizontal: 48,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    coverContactText: {
      fontSize: 8.5,
      color: '#FFFFFF',
    },

    // Header & Footer
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 50,
      paddingHorizontal: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1pt solid ${accent}`,
    },
    headerLogo: {
      width: 28,
      height: 28,
      objectFit: 'contain',
    },
    headerBusinessName: {
      fontSize: 9,
      fontWeight: 'bold',
      color: accent,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 40,
      paddingHorizontal: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: `0.5pt solid #E0E0E0`,
    },
    footerText: {
      fontSize: 7.5,
      color: '#999',
    },

    // Dark section banner heading (full-width, like "ABOUT US")
    sectionBanner: {
      backgroundColor: '#2B2B2B',
      marginHorizontal: -48,
      marginTop: -28,
      paddingHorizontal: 48,
      paddingVertical: 11,
      marginBottom: 54,
    },
    sectionBannerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    // Project pages: no white strip between banner and photo
    projectSectionBanner: {
      backgroundColor: '#2B2B2B',
      marginHorizontal: -48,
      marginTop: -28,
      paddingHorizontal: 48,
      paddingVertical: 11,
      marginBottom: 0,
    },

    // Bullet list (certifications, core services)
    diamondList: {
      marginBottom: 6,
    },
    diamondItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 7,
    },
    diamondBullet: {
      width: 7,
      height: 7,
      backgroundColor: accent,
      marginRight: 10,
      flexShrink: 0,
    },
    diamondText: {
      flex: 1,
      fontSize: 11.5,
      color: '#333',
      lineHeight: 1.5,
    },

    // Section titles
    sectionTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: accent,
      marginBottom: 10,
      marginTop: 20,
      paddingBottom: 4,
      borderBottom: `1.5pt solid ${accent}`,
    },
    // CORE SERVICES / CERTIFICATIONS — serif font for a nicer look
    sectionTitleSerif: {
      fontSize: 17,
      fontFamily: 'Times-Bold',
      color: accent,
      marginBottom: 10,
      marginTop: 20,
      paddingBottom: 4,
      borderBottom: `1.5pt solid ${accent}`,
    },
    sectionSubtitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
      marginTop: 12,
    },

    // Text
    paragraph: {
      marginBottom: 16,
      lineHeight: 1.7,
      color: '#333',
      fontSize: 10.5,
    },

    // Bullet lists
    bulletList: {
      marginBottom: 10,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    bullet: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: accent,
      marginRight: 8,
      marginTop: 4,
    },
    bulletText: {
      flex: 1,
      lineHeight: 1.5,
      fontSize: 10.5,
      color: '#333',
    },

    // Capability cards (2-col grid)
    capGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 10,
    },
    capCard: {
      width: '48%',
      backgroundColor: accentLight,
      borderLeft: `2.5pt solid ${accent}`,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 2,
    },
    capCardTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: 2,
    },
    capCardDesc: {
      fontSize: 8.5,
      color: '#444',
      lineHeight: 1.5,
    },

    // Per-project pages (two-column layout)
    projectPage: {
      paddingTop: 28,
      paddingBottom: 60,
      paddingHorizontal: 48,
      fontSize: 10.5,
      color: '#2D2D2D',
      lineHeight: 1.55,
    },
    projectTwoCol: {
      flexDirection: 'row',
      height: 596,
      marginHorizontal: -48,
    },
    projectPhotoCol: {
      width: 330,
      height: 596,
      overflow: 'hidden',
    },
    projectFullPhoto: {
      width: 330,
      height: 596,
      objectFit: 'cover',
    },
    projectPhotoPlaceholder: {
      backgroundColor: '#E5E7EB',
    },
    projectTextCol: {
      flex: 1,
      paddingHorizontal: 22,
      paddingTop: 10,
      paddingRight: 48,
    },
    projectPageName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#1A1A1A',
      lineHeight: 1.2,
      marginBottom: 12,
    },
    projectMetaBlock: {
      marginBottom: 14,
      borderLeft: `2pt solid ${accent}`,
      paddingLeft: 12,
    },
    projectPageMeta: {
      fontSize: 11,
      color: '#555',
      marginBottom: 4,
    },
    projectMetaLabel: {
      fontWeight: 'bold',
      color: '#333',
      fontSize: 11,
    },
    projectPageScope: {
      fontSize: 10.5,
      lineHeight: 1.6,
      color: '#333',
      marginBottom: 10,
    },
    projectSubheading: {
      fontSize: 13,
      fontWeight: 'bold',
      color: accent,
      marginBottom: 4,
      marginTop: 6,
    },

    // Project cards (old summary style — kept for reference)
    projectCard: {
      border: `1pt solid #E0E0E0`,
      borderRadius: 4,
      padding: 14,
      marginBottom: 12,
      borderLeft: `3pt solid ${accent}`,
    },
    projectName: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: 4,
    },
    projectMeta: {
      fontSize: 8.5,
      color: '#666',
      marginBottom: 3,
    },
    projectScope: {
      fontSize: 9,
      lineHeight: 1.5,
      color: '#333',
      marginTop: 4,
    },

    // Photo grids
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 14,
    },
    photoThumb: {
      width: 110,
      height: 80,
      objectFit: 'cover',
      borderRadius: 4,
    },
    photoCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      objectFit: 'cover',
      marginRight: 10,
    },

    // Personnel
    personnelCard: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'flex-start',
    },
    personnelInfo: {
      flex: 1,
    },
    personnelName: {
      fontWeight: 'bold',
      fontSize: 10,
      color: '#1A1A1A',
      marginBottom: 2,
    },
    personnelRole: {
      fontSize: 9,
      color: accent,
      marginBottom: 2,
    },
    personnelExp: {
      fontSize: 8.5,
      color: '#555',
      lineHeight: 1.4,
    },

    // Compliance grid
    complianceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 10,
    },
    complianceBadge: {
      backgroundColor: accentLight,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 3,
      border: `0.5pt solid ${accent}`,
    },
    complianceBadgeText: {
      fontSize: 8.5,
      color: accent,
      fontWeight: 'bold',
    },

    // Plant section
    plantGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 10,
    },
    plantPill: {
      backgroundColor: '#F5F5F5',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 12,
      border: '0.5pt solid #DDD',
    },
    plantPillText: {
      fontSize: 8.5,
      color: '#444',
    },

    // Plant detail cards (plant & personnel page)
    plantDetailGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 8,
    },
    plantDetailCard: {
      width: '47%',
      backgroundColor: accentLight,
      borderLeft: `3pt solid ${accent}`,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 2,
    },
    plantDetailName: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: 3,
    },
    plantDetailDesc: {
      fontSize: 9.5,
      color: '#444',
      lineHeight: 1.5,
    },

    // Personnel detail cards
    personnelDetailList: {
      gap: 10,
    },
    personnelDetailCard: {
      flexDirection: 'row',
      borderBottom: '0.5pt solid #E5E7EB',
      paddingBottom: 10,
      gap: 16,
    },
    personnelDetailLeft: {
      width: 130,
      flexShrink: 0,
    },
    personnelDetailName: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: 2,
    },
    personnelDetailRole: {
      fontSize: 9.5,
      color: accent,
      fontWeight: 'bold',
    },
    personnelDetailExp: {
      flex: 1,
      fontSize: 10,
      color: '#444',
      lineHeight: 1.6,
    },

    // Finishing page (last page)
    finishingPage: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: 0,
      flexDirection: 'column',
    },
    finishingHeader: {
      height: 72,
      backgroundColor: '#2B2B2B',
      paddingHorizontal: 28,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    finishingHeaderLogo: {
      width: 48,
      height: 48,
      objectFit: 'contain',
    },
    finishingHeaderName: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    finishingPhotoWrapper: {
      flex: 1,
      position: 'relative',
    },
    finishingPhotoImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    finishingTaglineOverlay: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    finishingTaglineText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: 1.35,
    },
    finishingFooter: {
      height: 90,
      backgroundColor: '#2B2B2B',
      paddingHorizontal: 28,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    finishingFooterLeft: {
      flex: 1,
    },
    finishingFooterTagline: {
      fontSize: 9,
      color: '#FFFFFF',
      lineHeight: 1.5,
    },
    finishingFooterRight: {
      alignItems: 'flex-end',
    },
    finishingFooterDetail: {
      fontSize: 9,
      color: '#FFFFFF',
      marginBottom: 2,
      textAlign: 'right',
    },
  });
}
