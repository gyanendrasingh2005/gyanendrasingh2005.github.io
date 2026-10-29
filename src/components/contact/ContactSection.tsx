import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_DATA, type ContactMethodItem } from '../../constants/contact';
import { RESUME_CONFIG } from '../../constants/navigation';
import { ResumeModal } from '../ui/ResumeModal';

export const ContactSection: React.FC = () => {
  const {
    supportingText,
    primaryCta,
    contactMethods,
    channels,
  } = CONTACT_DATA;

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const emailToUse = primaryCta.emailAddress || 'gyanendrasingh.dev@gmail.com';
  const mailtoUrl = `mailto:${emailToUse}?subject=${encodeURIComponent(
    primaryCta.subject
  )}&body=${encodeURIComponent(primaryCta.body)}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailToUse).then(() => {
        setCopiedNotification('Email address copied to clipboard!');
        setTimeout(() => setCopiedNotification(null), 3000);
      });
    } else {
      window.location.href = mailtoUrl;
    }
  };

  const handleContactMethodClick = (
    e: React.MouseEvent,
    method: ContactMethodItem
  ) => {
    if (method.id === 'resume') {
      e.preventDefault();
      if (RESUME_CONFIG.isAvailable) {
        window.open(RESUME_CONFIG.filePath, '_blank', 'noopener,noreferrer');
      } else {
        setShowResumeModal(true);
      }
    }
  };

  return (
    <div className="space-y-20 md:space-y-28 select-none">
      {/* 1. Sarthak-Style Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-label"
      >
        <span>08 / THE NEXT CHAPTER</span>
        <span>LET’S MAKE IT MATTER</span>
      </motion.div>

      {/* 2. Sarthak Contact Inner Canvas */}
      <div className="py-8 md:py-14 space-y-8 max-w-4xl">
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[1.4px] text-[#dedad4] uppercase"
        >
          <span className="live-dot animate-pulse" />
          <span>OPEN TO INTERNSHIPS, ROLES &amp; COLLABORATIONS</span>
        </motion.div>

        {/* Giant Iconic Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-[#f1eee8] font-normal leading-[0.98] tracking-[-0.045em]"
        >
          Something great<br />
          starts with <em className="text-[#ff8c59] italic">a hello.</em>
        </motion.h2>

        {/* Primary Contact CTA Link */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
          <motion.a
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
            href={mailtoUrl}
            onClick={handleCopyEmail}
            className="group font-serif text-2xl sm:text-3xl md:text-4xl text-[#f1eee8] hover:text-[#ff8c59] border-b border-[rgba(241,238,232,0.3)] hover:border-[#ff8c59] pb-2 inline-flex items-center gap-6 transition-all"
            aria-label={`Send email to ${emailToUse}`}
          >
            <span>{emailToUse}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#ff8c59]"
              aria-hidden="true"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </motion.a>
        </div>

        {copiedNotification && (
          <div className="font-mono text-xs text-[#ff8c59] transition-opacity animate-in fade-in">
            ✓ {copiedNotification}
          </div>
        )}

        <p className="font-sans text-sm sm:text-base text-[#aaa9a4] max-w-xl leading-relaxed">
          {supportingText}
        </p>

        {/* 3. Verified Contact Methods Strip */}
        <div className="pt-8 border-t border-[rgba(241,238,232,0.1)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {contactMethods.map((method) => (
            <motion.a
              key={method.id}
              whileHover={{ y: -4, borderColor: 'rgba(255,140,89,0.5)' }}
              transition={{ duration: 0.2 }}
              href={method.id === 'email' ? mailtoUrl : method.href}
              onClick={(e) => handleContactMethodClick(e, method)}
              target={method.isExternal ? '_blank' : undefined}
              rel={method.isExternal ? 'noopener noreferrer' : undefined}
              className="p-4 bg-[#080808] border border-[rgba(241,238,232,0.08)] rounded-lg space-y-1 hover:border-[#ff8c59] transition-colors group shadow-sm"
            >
              <span className="font-mono text-[10px] text-[#ff8c59] uppercase tracking-wider block">
                {method.label}
              </span>
              <span className="font-sans text-xs text-[#f1eee8] font-medium group-hover:text-[#ff8c59] transition-colors flex items-center justify-between">
                <span>{method.actionText}</span>
                <span className="text-[11px] font-mono text-[#787570]">↗</span>
              </span>
            </motion.a>
          ))}
        </div>

        {/* Social Platforms Row */}
        <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-[#aaa9a4]">
          <span className="text-[#787570] uppercase tracking-wider text-[11px]">
            NETWORK //
          </span>
          {channels.map((ch) => (
            <span
              key={ch.label}
              className="flex items-center gap-1.5"
            >
              <span className="text-[#dedad4] font-medium">{ch.label}:</span>
              <span className="text-[#aaa9a4]">{ch.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </div>
  );
};
