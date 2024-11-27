import HeroSection from "@/components/homepage/HeroSection";
import InfoCard from "@/components/homepage/InfoCard";
import styles from "./HomePage.module.css";
import CTASection from "@/components/homepage/CTASection";

export default function HomePage() {
  // Define an array of features to be displayed in InfoCards
  const features = [
    {
      title: "Optimal Access to Healthcare",
      description:
        "Easily book doctor appointments onsite or via video consultation.",
      image: "/images/feature1.png",
    },
    {
      title: "Privacy Focused",
      description: "Your data is secure with us.",
      image: "/images/feature2.png",
    },
    {
      title: "24/7 Access",
      description: "Manage your health anytime, anywhere.",
      image: "/images/feature3.png",
    },
  ];

  return (
    <main className={styles.homepage}>
      {/* Render the hero section at the top of the homepage */}
      <HeroSection />

      <section className={styles.infoCardsSection}>
        <div className={styles.infoCardsContainer}>
          {/* Map through the features array and render an InfoCard for each */}
          {features.map((feature, index) => (
            <InfoCard
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
            />
          ))}
        </div>
        {/* Render the Call-to-Action section */}
        <CTASection />
      </section>
    </main>
  );
}
