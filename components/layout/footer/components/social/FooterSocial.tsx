import SafeLink from "@/components/common/safe-link/SafeLink";

export default function FooterSocial() {
  return (
    <ul>
      <li><SafeLink><span>Contact</span></SafeLink></li>
      <li><SafeLink><span>Github</span></SafeLink></li>
      <li><SafeLink><span>Email</span></SafeLink></li>
    </ul>
  ); 
}