"use client";

import HeaderDesktop from './desktop/HeaderDesktop';
import HeaderMobile from './mobile/HeaderMobile';
import {useMediaQuery} from '@/lib/hooks/useMediaQuery';

export default function Header() {
  const isMobile = useMediaQuery("(max-width:375px)");

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}