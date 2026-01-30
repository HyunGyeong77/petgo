import Logo from '@/components/common/logo/Logo';
import Nav from './components/nav/Nav';
import Auth from './components/auth/Auth';

export default function HeaderDesktop() {
  return (
    <>
      <Logo width={70} height={32} />
      <Nav />
      <Auth />
    </>
  );
}