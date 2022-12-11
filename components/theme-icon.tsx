
import { useTheme } from 'next-themes'
import Image from 'next/image';
import lightIcon from '@/assets/light-icon.svg';
import darkIcon from '@/assets/dark-icon.svg';

const alt = `theme icon`;

const ThemeModeIcon = (props) => {
  const { theme } = useTheme();
  return (
    <Image
      placeholder={alt}
      alt={alt}
      src={theme === 'dark' ? lightIcon : darkIcon}
      {...props}
    />
  );
}

export default ThemeModeIcon;
