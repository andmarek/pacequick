import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

export function useSyncColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    if ((isDark && colorMode === 'light') || (!isDark && colorMode === 'dark')) {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);
}