import styles from './page.module.scss';
import Google from "./_components/google/Google";
import Original from './_components/original/Original';
import Link from '@/components/ui/link/Link';
import { ROUTES } from '@/constants/routes';

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>로그인</h2>

        <Google />
        <Original />

        <div className={styles.link}>
          <Link
            href={ROUTES.app.home}
            direction="left"
            value="이전"
          />
          <Link
            href={ROUTES.auth.signup}
            direction="right"
            value="회원가입"
          />
        </div>
      </div>
    </div>
  );
}