import Header from '@/components/layout/header/Header';
import SectionLayout from '@/components/layout/section/SectionLayout';
import Hero from './components/home/hero/Hero';
import Preferences from './components/home/preferences/Preferences';
import Walk from './components/home/walk/Walk';
import Recommend from './components/home/recommend/Recommend';
import Hospital from './components/home/hospital/Hospital';
import Footer from '@/components/layout/footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <SectionLayout>
        <Hero />
        <Preferences />
        <Walk />
        <Recommend />
        <Hospital />
      </SectionLayout>
      <Footer />
    </>
  );
}
