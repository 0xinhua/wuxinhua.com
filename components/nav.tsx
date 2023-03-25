
import cn from 'classnames';
import { useRouter } from 'next/router'

type Link = {
  path: string,
  label: string,
};

const Navigator = (props: { links: Link[] }) => {
  const { links } = props;
  const router = useRouter();
  const isActive = (path: string): boolean => router.asPath === path;

  return (
    <ul className='justify-end flex'>
      { links && links.map(link => (
        <li className="ml-3 first:ml-0" key={link.label}>
          <a className={cn(`
            font-normal
            text-gray-600
            dark:text-gray-400
            md:inline-block
            hover:bg-gray-200
            hover:
            p-1
            sm:px-2
            sm:py-2
            rounded-lg
            transition-all`, isActive(link.path) ? `font-medium text-base text-gray-800 dark:text-gray-200` : `font-normal
            text-base
            dark:text-gray-400`)} 
            href={link.path}>{link.label}
          </a>
          </li>)
      )}
  </ul>
  );
}

export default Navigator;
