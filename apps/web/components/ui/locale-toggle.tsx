'use client';
import * as React from 'react';
import { Button } from './button';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

export function LocaleToggle() {
  const [locale, setLocale] = React.useState('en');
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ur' : 'en';
    setLocale(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ur' ? 'rtl' : 'ltr';
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLocale} className="w-12 h-9 relative overflow-hidden font-medium">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {locale === 'en' ? 'EN' : 'اردو'}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
