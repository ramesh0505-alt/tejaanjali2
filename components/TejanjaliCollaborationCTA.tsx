import React from "react";
import {
  Music2,
  Mic2,
  Clapperboard,
  Users,
  Video,
  ArrowRight,
} from "lucide-react";
import "./TejanjaliCollaborationCTA.css";

interface Service {
  number: string;
  title: string;
  icon: React.ElementType;
  image: string;
}

interface TejanjaliCollaborationCTAProps {
  onBook?: () => void;
  onContact?: () => void;
}

const services: Service[] = [
  {
    number: "01",
    title: "Live Concerts & World Tours",
    icon: Mic2,
    image: "https://images.unsplash.com/photo-1540039155733-d7696d487346?w=400&q=80",
  },
  {
    number: "02",
    title: "Film Playback & Studio Vocals",
    icon: Clapperboard,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80",
  },
  {
    number: "03",
    title: "Cultural & Corporate Galas",
    icon: Users,
    image: "https://images.unsplash.com/photo-1507676184212-d0330a156708?w=400&q=80",
  },
  {
    number: "04",
    title: "Executive Media Production",
    icon: Video,
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=400&q=80",
  },
];

const TejanjaliCollaborationCTA: React.FC<
  TejanjaliCollaborationCTAProps
> = ({ onBook, onContact }) => {
  return (
    <section className="tejanjali-cta">
      {/* Ambient background */}
      <div className="cta-glow cta-glow-left" />
      <div className="cta-glow cta-glow-right" />

      {/* Decorative particles */}
      <div className="cta-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="cta-inner">
        {/* Top emblem */}
        <div className="music-emblem-wrap">
          <div className="emblem-line" />

          <div className="music-emblem">
            <Music2 size={25} strokeWidth={1.4} />
          </div>

          <div className="emblem-line" />
        </div>

        {/* Eyebrow */}
        <div className="cta-eyebrow">
          <span>COLLABORATION</span>
          <span className="eyebrow-dot">•</span>
          <span>LIVE BOOKINGS</span>
        </div>

        {/* Heading */}
        <h2 className="cta-heading">
          LET'S CREATE
          <span>SOMETHING MUSICAL</span>
        </h2>

        {/* Description */}
        <p className="cta-description">
          Available for live concert bookings, playback singing, film
          soundtrack compositions, corporate &amp; cultural festivals, and
          high-impact media production collaborations.
        </p>

        {/* Divider */}
        <div className="cta-divider">
          <span />
        </div>

        {/* Services */}
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.number}>
                <div
                  className="service-image"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />

                <div className="service-overlay" />

                <div className="service-content">
                  <span className="service-number">
                    {service.number}
                  </span>

                  <div className="service-icon">
                    <Icon size={22} strokeWidth={1.4} />
                  </div>

                  <h3>{service.title}</h3>

                  <button
                    className="service-arrow"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div className="cta-actions">
          <button
            className="primary-cta"
            onClick={onBook}
          >
            <span>BOOK FOR AN EVENT</span>

            <span className="button-arrow">
              <ArrowRight size={18} strokeWidth={1.5} />
            </span>
          </button>

          <button
            className="secondary-cta"
            onClick={onContact}
          >
            <span>CONTACT MANAGEMENT</span>

            <span className="button-arrow">
              <ArrowRight size={18} strokeWidth={1.5} />
            </span>
          </button>
        </div>

        {/* Bottom statement */}
        <div className="music-tagline">
          <span />
          <Music2 size={15} />
          <em>Music Connects People</em>
          <Music2 size={15} />
          <span />
        </div>
      </div>
    </section>
  );
};

export default TejanjaliCollaborationCTA;
