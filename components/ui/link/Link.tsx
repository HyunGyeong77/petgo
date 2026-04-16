import styles from './link.module.scss';
import NextLink from "next/link";

type LinkProps = {
  direction: "right" | "left"
  value: string
  href: string
}

const Link = ({ direction, value, href }: LinkProps) => {
  return (
    <NextLink className={styles.link} href={href}>
      {direction === "right" ?
        <>
          {value}
          <i className="ri-arrow-right-circle-line"></i>
        </> :
        <>
          <i className="ri-arrow-left-circle-line"></i>
          {value}
        </>
      }
    </NextLink>
  );
}

export default Link;