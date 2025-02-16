'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Fragment } from 'react';

import { cn } from '@/utils/cn';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Theme');

  const themes = [
    { id: 'light', name: t('light'), icon: SunIcon },
    { id: 'dark', name: t('dark'), icon: MoonIcon },
    { id: 'system', name: t('system'), icon: ComputerDesktopIcon },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
        {theme === 'dark' ? (
          <MoonIcon className="w-5 h-5" />
        ) : theme === 'light' ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <ComputerDesktopIcon className="w-5 h-5" />
        )}
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
            {themes.map(({ id, name, icon: Icon }) => (
              <MenuItem key={id}>
                <button
                  className={cn(
                    'group flex w-full items-center px-4 py-2 text-sm',
                    'text-gray-700 dark:text-gray-300',
                    'data-[active]:bg-gray-100 data-[active]:dark:bg-gray-700 data-[active]:text-gray-900 data-[active]:dark:text-white'
                  )}
                  onClick={() => setTheme(id)}
                >
                  <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
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
