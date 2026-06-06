/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  iconBg: string; // Gradient Tailwind class, e.g., 'from-rose-500 to-orange-400'
  iconContent: string; // Icon identifier or mini SVG description
  summary: string; // Hover short info
  techStack: string[];
  role: string; // Played role
  features: string[]; // Implemented features
  achievements: string[]; // Achievements & Metrics
  details: string; // Detailed description
}

export interface Experience {
  id: string;
  company: string;
  logo: string; // Simple visual logo
  role: string;
  period: string;
  achievements: string[];
  content: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: string; // e.g. "已认证" (Certified)
}
