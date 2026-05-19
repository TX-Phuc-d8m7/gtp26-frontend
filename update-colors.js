#!/usr/bin/env node

/**
 * Script to help update landing page component colors
 * Usage: node update-colors.js
 */

const fs = require('fs');
const path = require('path');

const colorMappings = {
  // Dark theme old colors -> new colors
  dark: {
    '#0C0A09': 'landingColors.dark.bg.primary',
    '#151110': 'landingColors.dark.bg.secondary',
    '#1C1917': 'landingColors.dark.bg.secondary',
    '#292524': 'landingColors.dark.bg.tertiary',
    '#FFF7ED': 'landingColors.dark.text.primary',
    '#FB923C': 'landingColors.dark.secondary',
    '#FFB25C': 'landingColors.dark.secondaryLight',
    '#FF8A1F': 'landingColors.dark.secondaryDark',
    '#F26608': 'landingColors.dark.secondaryDark',
    '#F97316': 'landingColors.dark.secondary',
    'alpha("#FFF7ED", 0.6)': 'landingColors.dark.text.secondary',
    'alpha("#FFF7ED", 0.5)': 'landingColors.dark.text.muted',
    'alpha("#FFF7ED", 0.3)': 'alpha(landingColors.dark.text.primary, 0.3)',
    'alpha("#FFF7ED", 0.1)': 'landingColors.dark.border.secondary',
    'alpha("#FFF7ED", 0.2)': 'alpha(landingColors.dark.text.primary, 0.2)',
  },
  // Light theme old colors -> new colors
  light: {
    '#FAFAF8': 'landingColors.light.bg.primary',
    '#F5F3F0': 'landingColors.light.bg.secondary',
    '#27251F': 'landingColors.light.text.primary',
    '#EA580C': 'landingColors.light.secondary',
    '#D84315': 'landingColors.light.secondaryDark',
    '#B71C1C': 'landingColors.light.secondaryDark',
    'alpha("#27251F", 0.65)': 'landingColors.light.text.secondary',
    'alpha("#27251F", 0.5)': 'landingColors.light.text.muted',
    'alpha("#27251F", 0.08)': 'landingColors.light.border.secondary',
    'alpha("#27251F", 0.15)': 'alpha(landingColors.light.text.primary, 0.15)',
  },
};

console.log('Color mapping guide created. Components need manual updates to:');
console.log('1. Import from theme-colors.ts');
console.log('2. Replace old hex colors with new theme color variables');
console.log('3. Use gradients.dark or gradients.light for gradient backgrounds');
