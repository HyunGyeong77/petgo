import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import WalkingHero from './_components/walking-hero/WalkingHero';
import WalkingImportance from './_components/walking-importance/WalkingImportance';
import WalkingCourses from './_components/walking-courses/WalkingCourses';
import WalkingTimingGuide from './_components/walking-timing-guide/WalkingTimingGuide';
import WalkingWeatherTips from './_components/walking-weather-tips/WalkingWeatherTips';
import WalkingSafetyTips from './_components/walking-safety-tips/WalkingSafetyTips';
import WalkingFaq from './_components/walking-faq/WalkingFaq';
import WalkingAfterCare from './_components/walking-after-care/WalkingAfterCare';
import WalkingDisclaimer from './_components/walking-disclaimer/WalkingDisclaimer';
import styles from './page.module.scss';

export default function Page() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <WalkingHero />
        <WalkingImportance />
        <WalkingCourses />
        <WalkingTimingGuide />
        <WalkingWeatherTips />
        <WalkingSafetyTips />
        <WalkingFaq />
        <WalkingAfterCare />
        <WalkingDisclaimer />
      </main>

      <Footer />
    </div>
  );
}
