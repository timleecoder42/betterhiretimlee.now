'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { LanguagesIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Fragment } from 'react';

import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/utils/cn';

const languages = [
  { id: 'en', name: 'English' },
  { id: 'zh', name: '中文' },
  { id: 'ja', name: '日本語' },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const switchLanguage = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
        <LanguagesIcon className="w-5 h-5" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map(({ id, name }) => (
              <MenuItem key={id}>
                <button
                  className={cn(
                    'group flex w-full items-center px-4 py-2 text-sm',
                    'text-gray-700 dark:text-gray-300',
                    'data-[active]:bg-gray-100 data-[active]:dark:bg-gray-700 data-[active]:text-gray-900 data-[active]:dark:text-white',
                    locale === id ? 'font-semibold' : ''
                  )}
                  onClick={() => switchLanguage(id)}
                >
                  {name}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
