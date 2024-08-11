'use client';

import { useColorMode, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ThemeSwitcher: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="p-2" onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </div>
  );
};
