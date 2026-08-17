import type { Config } from 'tailwindcss';
import tokensPreset from '@repo/tokens/tailwind-preset';

const config: Config = {
  presets: [tokensPreset as Partial<Config>],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate')],
};

export default config;
