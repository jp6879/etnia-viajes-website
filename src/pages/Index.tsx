import { Layout } from "@/components/layout";
import {
  HeroSection,
  PackagesSection,
  BenefitsSection,
  AboutSection,
  OffersSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PackagesSection />
      <BenefitsSection />
      <AboutSection />
      {/* <OffersSection /> */}
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

