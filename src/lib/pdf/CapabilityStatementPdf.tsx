import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
} from '@react-pdf/renderer';
import type { PdfContent } from '@/lib/capability-statement/schema';
import { createStyles } from './PdfStyles';

export interface ContactInfo {
  phone?: string;
  abn?: string;
  website?: string;
  email?: string;
  location?: string;
}

export interface CapabilityStatementPdfProps {
  businessName: string;
  content: PdfContent;
  logoDataUrl?: string | null;
  coverPhotoDataUrl?: string | null;
  finishingPhotoDataUrl?: string | null;
  projectImageUrls?: (string | null)[];
  plantImageUrls?: string[];
  teamImageUrls?: string[];
  accentColour?: string;
  contactInfo?: ContactInfo;
  missionStatement?: string;
}

function PageFooter({
  contactInfo,
  styles,
}: {
  contactInfo?: ContactInfo;
  styles: ReturnType<typeof createStyles>;
}) {
  const parts = [
    contactInfo?.phone,
    contactInfo?.email,
    contactInfo?.website,
  ].filter(Boolean);

  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>{parts.join('  |  ')}</Text>
      <Text
        style={styles.footerText}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

export default function CapabilityStatementPdf({
  businessName,
  content,
  logoDataUrl,
  coverPhotoDataUrl,
  finishingPhotoDataUrl,
  projectImageUrls = [],
  plantImageUrls = [],
  teamImageUrls = [],
  accentColour = '#1B3A5C',
  contactInfo,
  missionStatement,
}: CapabilityStatementPdfProps) {
  const styles = createStyles(accentColour);
  const heroImage = projectImageUrls[0];

  const contactParts = [
    contactInfo?.phone && `Phone: ${contactInfo.phone}`,
    contactInfo?.email && `Email: ${contactInfo.email}`,
    contactInfo?.website,
    contactInfo?.abn && `ABN: ${contactInfo.abn}`,
  ].filter(Boolean);

  const hasCoverPhoto = !!coverPhotoDataUrl;

  return (
    <Document>
      {/* ── Cover Page ── */}
      <Page size="A4" style={styles.coverPage}>
        {hasCoverPhoto ? (
          <>
            {/* Dark header bar */}
            <View style={styles.coverDarkHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {logoDataUrl && (
                  <Image src={logoDataUrl} style={styles.coverHeaderLogo} />
                )}
                <Text style={styles.coverHeaderBusinessName}>{businessName}</Text>
              </View>
              <Text style={styles.coverHeaderYear}>
                {new Date().getFullYear()}
              </Text>
            </View>

            {/* Photo area fills all remaining space */}
            <View style={styles.coverPhotoWrapper}>
              {/* Background photo — fills full area */}
              <Image src={coverPhotoDataUrl!} style={styles.coverPhotoImage} />

              {/* CAPABILITY STATEMENT title — top-left of photo */}
              <View style={styles.coverTitleOverlay}>
                <Text style={styles.coverTitleLine1}>CAPABILITY</Text>
                <Text style={styles.coverTitleLine2}>STATEMENT</Text>
              </View>

              {/* Contact info — bottom-right of photo */}
              {contactParts.length > 0 && (
                <View style={styles.coverContactOverlay}>
                  {contactParts.map((text, i) => (
                    <Text key={i} style={styles.coverContactOverlayText}>{text}</Text>
                  ))}
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            <View style={styles.coverTopBar} />
            <View style={styles.coverBody}>
              {logoDataUrl && (
                <View style={styles.coverLogoRow}>
                  <Image src={logoDataUrl} style={styles.coverLogo} />
                </View>
              )}
              <Text style={styles.coverBusinessName}>{businessName}</Text>
              {missionStatement && (
                <Text style={styles.coverMission}>{missionStatement}</Text>
              )}
              <Text style={styles.coverTagline}>
                {content.regions.join(', ')} · {content.core_capabilities.slice(0, 3).map((c) => c.split('.')[0].split(',')[0]).join(' · ')}
              </Text>
              {heroImage && (
                <Image src={heroImage} style={styles.coverHeroImage} />
              )}
            </View>
            {contactParts.length > 0 && (
              <View style={styles.coverContactBar}>
                {contactParts.map((text, i) => (
                  <Text key={i} style={styles.coverContactText}>{text}</Text>
                ))}
              </View>
            )}
          </>
        )}
      </Page>

      {/* ── Page 2: About Us + Core Services + Certifications ── */}
      <Page size="A4" style={styles.page}>
        {/* ABOUT US dark banner heading */}
        <View style={styles.sectionBanner}>
          <Text style={styles.sectionBannerText}>ABOUT US</Text>
        </View>

        {/* Company overview — split into paragraphs by \n\n */}
        {content.company_overview.split('\n\n').map((para, i) => (
          <Text key={i} style={styles.paragraph}>{para.trim()}</Text>
        ))}

        {/* CORE SERVICES */}
        <Text style={styles.sectionTitleSerif}>CORE SERVICES</Text>
        <View style={styles.diamondList}>
          {content.core_capabilities.map((cap, i) => {
            const label = cap.split('.')[0].split(',')[0].trim();
            return (
              <View key={i} style={styles.diamondItem}>
                <View style={styles.diamondBullet} />
                <Text style={styles.diamondText}>{label}</Text>
              </View>
            );
          })}
        </View>

        {/* CERTIFICATIONS */}
        <Text style={styles.sectionTitleSerif}>CERTIFICATIONS</Text>
        <View style={styles.diamondList}>
          {content.compliance.map((cert, i) => (
            <View key={i} style={styles.diamondItem}>
              <View style={styles.diamondBullet} />
              <Text style={styles.diamondText}>{cert.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <PageFooter contactInfo={contactInfo} styles={styles} />
      </Page>

      {/* ── One page per project ── */}
      {content.project_experience.map((proj, i) => {
        const photoUrl = projectImageUrls[i] ?? null;
        return (
          <Page key={i} size="A4" style={styles.projectPage}>
            {/* PROJECTS dark banner — no white strip below */}
            <View style={styles.projectSectionBanner}>
              <Text style={styles.sectionBannerText}>PROJECTS</Text>
            </View>

            {/* Two-column layout */}
            <View style={styles.projectTwoCol}>
              {/* Left: full-bleed project photo */}
              <View style={styles.projectPhotoCol}>
                {photoUrl ? (
                  <Image src={photoUrl} style={styles.projectFullPhoto} />
                ) : (
                  <View style={[styles.projectFullPhoto, styles.projectPhotoPlaceholder]} />
                )}
              </View>

              {/* Right: project details */}
              <View style={styles.projectTextCol}>
                <Text style={styles.projectPageName}>{proj.name}</Text>

                <View style={styles.projectMetaBlock}>
                  {proj.client && (
                    <Text style={styles.projectPageMeta}><Text style={styles.projectMetaLabel}>Client: </Text>{proj.client}</Text>
                  )}
                  {proj.location && (
                    <Text style={styles.projectPageMeta}><Text style={styles.projectMetaLabel}>Location: </Text>{proj.location}</Text>
                  )}
                  {proj.duration && (
                    <Text style={styles.projectPageMeta}><Text style={styles.projectMetaLabel}>Duration: </Text>{proj.duration}</Text>
                  )}
                  {proj.value && (
                    <Text style={styles.projectPageMeta}><Text style={styles.projectMetaLabel}>Value: </Text>{proj.value}</Text>
                  )}
                </View>

                <Text style={styles.projectPageScope}>{proj.scope}</Text>

                {proj.challenges && (
                  <>
                    <Text style={styles.projectSubheading}>Challenges</Text>
                    <Text style={styles.projectPageScope}>{proj.challenges}</Text>
                  </>
                )}

                {proj.outcome && (
                  <>
                    <Text style={styles.projectSubheading}>Outcome</Text>
                    <Text style={styles.projectPageScope}>{proj.outcome}</Text>
                  </>
                )}
              </View>
            </View>

            <PageFooter contactInfo={contactInfo} styles={styles} />
          </Page>
        );
      })}

      {/* ── Plant & Personnel Page ── */}
      <Page size="A4" style={styles.page}>
        {/* PLANT & EQUIPMENT banner */}
        <View style={styles.sectionBanner}>
          <Text style={styles.sectionBannerText}>OUR PLANT & PEOPLE</Text>
        </View>

        <Text style={styles.sectionTitleSerif}>PLANT & EQUIPMENT</Text>
        <View style={styles.plantDetailGrid}>
          {content.plant_and_equipment.map((item, i) => (
            <View key={i} style={styles.plantDetailCard}>
              <Text style={styles.plantDetailName}>{item.name}</Text>
              {item.description ? (
                <Text style={styles.plantDetailDesc}>{item.description}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitleSerif}>KEY PEOPLE</Text>
        <View style={styles.personnelDetailList}>
          {content.key_personnel.map((person, i) => (
            <View key={i} style={styles.personnelDetailCard}>
              <View style={styles.personnelDetailLeft}>
                <Text style={styles.personnelDetailName}>{person.name}</Text>
                <Text style={styles.personnelDetailRole}>{person.role}</Text>
              </View>
              <Text style={styles.personnelDetailExp}>{person.experience}</Text>
            </View>
          ))}
        </View>

        <PageFooter contactInfo={contactInfo} styles={styles} />
      </Page>

      {/* ── Final Page: Full-bleed finishing photo + tagline + contact footer ── */}
      <Page size="A4" style={styles.finishingPage}>
        {/* Logo header */}
        <View style={styles.finishingHeader}>
          {logoDataUrl && (
            <Image src={logoDataUrl} style={styles.finishingHeaderLogo} />
          )}
          <Text style={styles.finishingHeaderName}>{businessName}</Text>
        </View>

        {/* Full-bleed photo area */}
        <View style={styles.finishingPhotoWrapper}>
          {finishingPhotoDataUrl ? (
            <Image src={finishingPhotoDataUrl} style={styles.finishingPhotoImage} />
          ) : (
            <View style={[styles.finishingPhotoImage, { backgroundColor: '#2B2B2B' }]} />
          )}
          {/* "We look forward" tagline overlaid bottom-centre of photo */}
          <View style={styles.finishingTaglineOverlay}>
            <Text style={styles.finishingTaglineText}>
              We look forward to working with{'\n'}you on your next project.
            </Text>
          </View>
        </View>

        {/* Contact footer bar */}
        <View style={styles.finishingFooter}>
          <View style={styles.finishingFooterLeft}>
            <Text style={styles.finishingFooterTagline}>Contact us <Text style={{ color: accentColour }}>today</Text> for tailored</Text>
            <Text style={styles.finishingFooterTagline}>solutions that meet your needs.</Text>
          </View>
          <View style={styles.finishingFooterRight}>
            {contactInfo?.phone && <Text style={styles.finishingFooterDetail}>{contactInfo.phone}</Text>}
            {contactInfo?.email && <Text style={styles.finishingFooterDetail}>{contactInfo.email}</Text>}
            {contactInfo?.website && <Text style={styles.finishingFooterDetail}>{contactInfo.website}</Text>}
            {contactInfo?.abn && <Text style={styles.finishingFooterDetail}>ABN: {contactInfo.abn}</Text>}
          </View>
        </View>
      </Page>
    </Document>
  );
}
