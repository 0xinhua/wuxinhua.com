
import cn from 'classnames';
import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'

type Link = {
  path: string,
  label: string,
};

const Navigator = (props: { links: Link[] }) => {
  const { links } = props;
  const pathname = usePathname();
  const isActive = (path: string): boolean => pathname === path;

  return (
    <ul className='justify-end flex'>
      { links && links.map(link => (
        <li className="ml-3 first:ml-0" key={link.label}>
          <Link
            href={link.path}
            className={cn("first:pl-0 text-base px-2 transition-colors transition-colors hover:underline hover:text-blue-600 underline-offset-4", isActive(link.path) ? "text-primary" : "text-muted-foreground")}
          >
            {link.label}
          </Link>
          </li>)
      )}
  </ul>
  );
}

export default Navigator;
