import Logo from '@/components/common/logo/Logo';
import Hamburger from './components/hamburger/Hamburger';

export default function HeaderMobile() {
  return (
    <>
      <div><Logo width={70} height={32} /></div>
      <Hamburger />
    </>
  );
}