import Header from '@/components/layout/header/Header';
import SectionLayout from '@/components/layout/section/SectionLayout';
import Hero from './components/home/hero/Hero';
import Preferences from './components/home/preferences/Preferences';

export default function Home() {
  return (
    <>
      <Header />
      <SectionLayout>
        <Hero />
        <Preferences />
      </SectionLayout>
    </>
  );
}
