import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          30: '#052594',
          54: '#1C4DF7',
          65: '#5378F9',
          74: '#7F9AFA', // 20% opacity
        },
        'secondary': {
          30: '#045295',
          54: '#1B92F8',
          65: '#52ACFA',
          74: '#7EC1FB', // 20% opacity}
        },
        'accent': {
          30: '#956F04',
          54: '#F8BE1B',
          65: '#FACF57',
          74: '#FBDA7E', // 20% opacity
        },
        'neutral': {
          17: '#1E293B',
          34: '#465568',
          47: '#64748B',
          65: '#94A3B8',
          84: '#CCD6E2',
          90: '#DEE5ED', // 50% opacity
        },
        'bg': {
          100: '#FFFFFF',
          99: '#FAFBFE',
        },
        'text': {
          'on-background': '#363636',
          'on-background-disabled': '#97A3B4',
          'on-primary': '#FFFFFF',
          'on-outlinebutton': '#1B92F8',
        },
        'success': {
          25: '#0A7551',
          39: '#10B77F',
          74: '#85F4CF',
        },
        'error': {
          40: '#BD0F0F',
          60: '#F04444',
          74: '#F58484',
        },
      },
      fontSize: {
        '4xl': "40px",
        '2xl': "22px",
        '2.5xl': "26px",
      },
    },
  },
  plugins: [],
};
export default config;
