import type { Config } from 'tailwindcss';
import { type PluginAPI } from 'tailwindcss/types/config';

// 定义主题颜色类型
type ThemeColors = Record<string, string>;

// 定义颜色配置
const christmasColors: ThemeColors = {
  gold: '#FFD700',
  red: '#E53935',
  green: '#4CAF50',
  silver: '#B0BEC5',
  deepBlue: '#1A237E',
  snowWhite: '#FFFFFF',
};

// 定义 Typography 配置类型
interface TypographyStyles {
  css: {
    color?: string
    maxWidth?: string
    h1?: Record<string, unknown>
    h2?: Record<string, unknown>
    h3?: Record<string, unknown>
    p?: Record<string, unknown>
    a?: Record<string, unknown>
    'a:hover'?: Record<string, unknown>
    strong?: Record<string, unknown>
    code?: Record<string, unknown>
    pre?: Record<string, unknown>
    blockquote?: Record<string, unknown>
    [key: string]: unknown
  }
}

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        christmas: christmasColors,
        // 'tap4-black': '#0F0E14',
        // 'dark-bg': '#1E1B24',
        'tap4-black': '#334155',
        'dark-bg': '#f1f5f9',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      maxWidth: {
        pc: '1322px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'christmas-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        'christmas-swing': {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'christmas-float': 'christmas-float 5s ease-in-out infinite',
        'christmas-swing': 'christmas-swing 2s ease-in-out infinite',
      },
      // Typography 配置
      typography: ({ theme }: PluginAPI): Record<string, TypographyStyles> => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.christmas.snowWhite'),
            '--tw-prose-headings': theme('colors.christmas.gold'),
            '--tw-prose-links': theme('colors.christmas.gold'),
            '--tw-prose-bold': theme('colors.christmas.red'),
            '--tw-prose-code': theme('colors.christmas.snowWhite'),
            '--tw-prose-quotes': theme('colors.christmas.silver'),

            // 基础文本颜色
            color: theme('colors.christmas.snowWhite'),
            maxWidth: 'none',

            // 标题样式
            h1: {
              color: theme('colors.christmas.gold'),
              fontWeight: '800',
              fontSize: '2.5em',
            },
            h2: {
              color: theme('colors.christmas.red'),
              fontWeight: '700',
              fontSize: '2em',
            },
            h3: {
              color: theme('colors.christmas.green'),
              fontWeight: '600',
              fontSize: '1.5em',
            },
            h4: {
              color: theme('colors.christmas.silver'),
            },
            // 链接样式
            a: {
              color: theme('colors.christmas.gold'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.christmas.red'),
              },
            },

            // 强调文本
            strong: {
              color: theme('colors.christmas.red'),
              fontWeight: '600',
            },

            // 代码块
            code: {
              color: theme('colors.christmas.snowWhite'),
              backgroundColor: theme('colors.christmas.deepBlue'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },

            // 预格式化文本
            pre: {
              backgroundColor: theme('colors.christmas.deepBlue'),
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },

            // 引用块
            blockquote: {
              borderLeftColor: theme('colors.christmas.silver'),
              color: theme('colors.christmas.silver'),
              fontStyle: 'italic',
              paddingLeft: '1em',
            },
          },
        },
        // 暗色主题变体
        invert: {
          css: {
            '--tw-prose-body': theme('colors.christmas.snowWhite'),
            '--tw-prose-headings': theme('colors.christmas.gold'),
            '--tw-prose-links': theme('colors.christmas.gold'),
            '--tw-prose-bold': theme('colors.christmas.red'),
            '--tw-prose-code': theme('colors.christmas.snowWhite'),
            '--tw-prose-quotes': theme('colors.christmas.silver'),
          },
        },
      }),
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
