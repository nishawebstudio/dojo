import {useEffect,useState,useRef} from 'react';
import disciplineIcon from "./assets/icons/discipline.svg"
import humilityIcon from "./assets/icons/humility.svg"
import characterIcon from "./assets/icons/character.svg"
import fitnessIcon from "./assets/icons/fitness.svg"

function Batch({ time, group }) {
  return (
    <div className="batch">
      <span>{time}</span>
      <strong>{group}</strong>
    </div>
  )
}

function TrainingCard({ title, description }) {
  return (
    <div className="training-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function AchievementHighlight({ icon, title, location, description }) {
  return (
    <div className="achievement-highlight">
      
      <div className="achievement-titles">
          <div className="achievement-icon">
            {icon}
          </div>
          <h3>{title}</h3>
          <span>{location}</span>
      </div>
      <div className="achievement-highlight-content">
        <p>{description}</p>
      </div>
    </div>
  );
}

function EventItem({ number, title, description }) {
  return (
    <div className="event-item">
      <span className="event-number">{number}</span>

      <div className="event-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function GalleryImage({ src, alt, className = "" }) {
  return (
    <div className={`gallery-image ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

function App() {
  const scrollToSection = (event, targetId) => {
    event.preventDefault();

    const target = document.querySelector(targetId);

    if (!target) return;

    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    const distance = targetPosition - startPosition;
    const duration = 1000;
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease in and ease out
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(
        0,
        startPosition + distance * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };
  const scrollToTop = () => {
    const startPosition = window.scrollY;
    const duration = 1000;
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(
        0,
        startPosition * (1 - easedProgress)
      );

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };
  const morningBatches = [
  {
    time: "5:30 – 6:30 AM",
    group: "Kids & Teens",
  },
  {
    time: "6:30 – 7:30 AM",
    group: "Kids & Teens",
  },
  {
    time: "7:30 – 8:30 AM",
    group: "Adults",
  },
]

const eveningBatches = [
  {
    time: "5:00 – 6:00 PM",
    group: "Beginners to Intermediate",
  },
  {
    time: "6:00 – 7:00 PM",
    group: "Advanced to Competition Level",
  },
  {
    time: "7:00 – 8:00 PM",
    group: "Adults",
  },
];

const trainingAreas = [
  {
    title: "Kids & Teens",
    description:
      "Training is structured according to both age and current skill level, allowing students to progress through batches that match their experience and ability.",
  },
  {
    title: "Adults",
    description:
      "Regular training for adults with a focus on technique, fitness, self-defense and personal development.",
  },
  {
    title: "Advanced & Competition Training",
    description:
      "Focused training in kata, kumite, competition preparation and advanced Karate techniques.",
  },
  {
    title: "Belt Grading",
    description:
      "Students are guided through systematic training and preparation for belt grading examinations.",
  },
];
const achievementStats = [
  { number: "25+", label: "Podium Finishes" },
  { number: "40+", label: "Competition Athletes" },
  { number: "12+", label: "Major Events" },
];

const achievementHighlights = [
  {
    icon: "🥇",
    title: "Coastal Open Karate Championship",
    location: "Visakhapatnam · 2025",
    description:
      "Strong performances across kata and kumite categories, with students securing multiple podium finishes.",
  },
  {
    icon: "🥈",
    title: "Andhra State Karate Cup",
    location: "Vijayawada · 2025",
    description:
      "Warriors Karate Academy athletes competed across age and belt categories.",
  },
  {
    icon: "🏆",
    title: "National Karate Championship",
    location: "Hyderabad · 2024",
    description:
      "Selected students represented the Academy at a national-level competition.",
  },
];
const events = [
  {
    number: "01",
    title: "Tournaments",
    description:
      "Students put their training into practice through kata and kumite competitions at district, state and national levels.",
  },
  {
    number: "02",
    title: "Seminars & Workshops",
    description:
      "Special sessions provide opportunities to learn from experienced instructors and explore new aspects of Karate.",
  },
  {
    number: "03",
    title: "Demonstrations",
    description:
      "Students showcase their discipline, technique and teamwork through Karate demonstrations at special events.",
  },
  {
    number: "04",
    title: "Belt Grading Examinations",
    description:
      "Grading examinations mark important milestones as students progress through their Karate journey.",
  },
];

const headerRef = useRef(null);
const [isNavSticky, setIsNavSticky] = useState(false);
const [showBackToTop, setShowBackToTop] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState("about");

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsNavSticky(!entry.isIntersecting);
    }
  );

  observer.observe(headerRef.current);

  return () => observer.disconnect();
}, []);
useEffect(() => {
  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  const sections = document.querySelectorAll(
    "#about, #sensei, #training, #achievements, #events, #gallery"
  );

  const handleScroll = () => {
    const activationPoint =
      window.scrollY + window.innerHeight * 0.35;

    let currentSection = "about";

    sections.forEach((section) => {
      if (section.offsetTop <= activationPoint) {
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (
    <>
      <header ref={headerRef} className="site-header">
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          className={`${isNavSticky ? "sticky-nav" : ""} ${
            isMobileMenuOpen ? "mobile-menu-open" : ""
          }`}
        >
          {/* <a
            href="#home"
            onClick={(event) => scrollToSection(event, "#home")}
          >
            Home
          </a> */}

          <a
            className={activeSection === "about" ? "active" : ""}
            href="#about"
            onClick={(event) => {
              setIsMobileMenuOpen(false);
              scrollToSection(event, "#about");
            }}
          >
            Our Dojo
          </a>

          <a
            className={activeSection === "sensei" ? "active" : ""}
            href="#sensei"
            onClick={(event) => {
              setIsMobileMenuOpen(false);
              scrollToSection(event, "#sensei");
            }}
          >
            Sensei
          </a>

          <a
            className={activeSection === "training" ? "active" : ""}
            href="#training"
            onClick={(event) => {
              setIsMobileMenuOpen(false);
              scrollToSection(event, "#training");
            }}
          >
            Training
          </a>

          <a
            className={activeSection === "achievements" ? "active" : ""}
            href="#achievements"
           onClick={(event) => {
              setIsMobileMenuOpen(false);
              scrollToSection(event, "#achievements");
            }}
          >
            Achievements
          </a>

          <a
            className={activeSection === "events" ? "active" : ""}
            href="#events"
            onClick={(event) => {
              setIsMobileMenuOpen(false);
              scrollToSection(event, "#events");
            }}
          >
            Events
          </a>

          <a
            className={activeSection === "gallery" ? "active" : ""}
            href="#gallery"
            onClick={(event) => {
              setIsMobileMenuOpen(false);
              scrollToSection(event, "#gallery");
            }}
          >
            Gallery
          </a>
        </nav>

        <img
          src={`${import.meta.env.BASE_URL}WKA_LOGO.png`}
          alt="Warriors Karate Academy logo"
        />

        <h1>Warriors Karate Academy</h1>
        <p>Discipline. Character. Strength.</p>
        <p>Visakhapatnam</p>
      </header>
     {showBackToTop && (
      <button
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Go to home"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      </button>
      )}

      <main>
        <section id="about" className="content-section about-section">
          <div className="section-intro">
            <h2>Our Dojo</h2>

            <p>
              Warriors Karate Academy is a Karate training academy in Visakhapatnam,
              welcoming children, teenagers and adults at different stages of their
              martial arts journey.
            </p>

            <p>
              Our training focuses on discipline, humility, character and fitness,
              while developing students through regular practice, grading,
              competition and personal growth.
            </p>
          </div>
        </section>

        <section id="sensei" className="content-section sensei-section">
          <h2>Meet the Sensei</h2>

          <div className="sensei-profile">
            <div className="sensei-photo">
              <img
                src={`${import.meta.env.BASE_URL}sensei-placeholder.jpg`}
                alt="Placeholder for Sensei B. Murali Krishna"
              />
            </div>

            <div className="sensei-info">
              <h3>B. Murali Krishna</h3>

              <p className="sensei-role">
                Founder & President, Warriors Karate Academy
              </p>

              <p className="sensei-credentials">
                KIO Black Belt — 5th Dan
              </p>

              <p className="sensei-credentials">
                Karate Coach · AKF Judge · KIO Referee · International Level Judge
              </p>

              <p>
                With discipline, humility, character and fitness at the heart of his
                teaching, Sensei Murali Krishna guides students through steady progress,
                dedicated practice and the pursuit of excellence.
              </p>
            </div>
          </div>

          <div className="sensei-story">
            <h3>The Journey of a Teacher</h3>

            <p>
              The story of Warriors Karate Academy, Sensei's journey and his approach
              to teaching will be shared here.
            </p>
          </div>

          <div className="sensei-values">
            <div className="sensei-value">
              <span className="value-icon">
                <img src={disciplineIcon} alt="" />
              </span>
              <span>Discipline</span>
            </div>

            <div className="sensei-value">
              <span className="value-icon">
                <img src={humilityIcon} alt="" />
              </span>
              <span>Humility</span>
            </div>

            <div className="sensei-value">
              <span className="value-icon">
                <img src={characterIcon} alt="" />
              </span>
              <span>Character</span>
            </div>

            <div className="sensei-value">
              <span className="value-icon">
                <img src={fitnessIcon} alt="" />
              </span>
              <span>Fitness</span>
            </div>
          </div>
        </section>

        <section id="training" className="content-section training-section">
          <h2>Training</h2>

          <p>
            Training at Warriors Karate Academy is structured to help students
            develop technique, discipline, fitness and confidence at every stage
            of their Karate journey.
          </p>

          <div className="training-feature">
            <div className="training-photo">
              <img
                src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1000&q=80"
                alt="Karate training"
              />
            </div>

            <div className="training-grid">
              {trainingAreas.map((area) => (
                <TrainingCard
                  key={area.title}
                  title={area.title}
                  description={area.description}
                />
              ))}
            </div>
          </div>

          <div className="schedule">
            <h3>Class Schedule</h3>

            <div className="schedule-grid">
              <div>
                <h4>Morning Batches</h4>

                {morningBatches.map((batch) => (
                  <Batch
                    key={batch.time}
                    time={batch.time}
                    group={batch.group}
                  />
                ))}
              </div>

              <div>
                <h4>Evening Batches</h4>

                {eveningBatches.map((batch) => (
                  <Batch
                    key={batch.time}
                    time={batch.time}
                    group={batch.group}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="achievements"
          className="content-section achievements-section"
        >
          <h2>Achievements</h2>

          <div className="achievement-feature">
            <div className="achievement-photo">
              <img
                src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1000&q=80"
                alt="Karate competition"
              />
            </div>

            <div className="achievement-main">
              <p className="achievement-label">TOURNAMENT SUCCESS</p>

              <h3>Built Through Training.<br />Proven in Competition.</h3>

              <p className="achievement-intro">
                Our students step onto the competition floor with the discipline,
                preparation and confidence developed through regular training.
              </p>

              <div className="achievement-stats">
                {achievementStats.map((stat) => (
                  <div className="achievement-stat" key={stat.label}>
                    <strong>{stat.number}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="achievement-highlights">
            {achievementHighlights.map((achievement) => (
              <AchievementHighlight
                key={achievement.title}
                icon={achievement.icon}
                title={achievement.title}
                location={achievement.location}
                description={achievement.description}
              />
            ))}
          </div>
        </section>
        <section id="events" className="content-section events-section">
          <h2>Events</h2>

          <div className="events-intro">
            <p>
              Karate at Warriors Karate Academy extends beyond regular training.
              Students take part in events that provide opportunities to learn,
              compete, perform and experience Karate beyond the everyday class.
            </p>
          </div>

          <div className="events-feature">
            <div className="event-list">
              {events.map((event) => (
                <EventItem
                  key={event.number}
                  number={event.number}
                  title={event.title}
                  description={event.description}
                />
              ))}
            </div>

            <div className="events-photo">
              <img
                src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&q=80"
                alt="Karate event"
              />
            </div>
          </div>
        </section>

        <section id="gallery" className="content-section gallery-section">
          <h2>Gallery</h2>

          <p>
            A glimpse into training, competitions, events and the everyday journey
            of our students at Warriors Karate Academy.
          </p>

          <div className="gallery-grid">
            <GalleryImage
              className="gallery-feature"
              src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&q=80"
              alt="Karate training"
            />

            <GalleryImage
              src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80"
              alt="Martial arts equipment"
            />

            <GalleryImage
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80"
              alt="Martial arts training"
            />

            <GalleryImage
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80"
              alt="Training session"
            />

            <GalleryImage
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
              alt="Fitness training"
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">

          <div className="footer-brand">

            <img
              src={`${import.meta.env.BASE_URL}WKA_LOGO.png`}
              alt="Warriors Karate Academy logo"
            />

            <h3>Warriors Karate Academy</h3>

            <p className="footer-tagline">
              Discipline. Character. Fitness.
            </p>

            <p className="footer-location">
              Near New SRO, Chinnamushidiwada,<br />
              Visakhapatnam – 530051
            </p>

          </div>

          <div className="footer-links">
            <h4>Explore</h4>

            <a href="#about">Our Dojo</a>
            <a href="#sensei">The Sensei</a>
            <a href="#training">Training</a>
            <a href="#achievements">Achievements</a>
            <a href="#events">Events</a>
          </div>

          <div className="footer-connect">
            <h4>Connect</h4>

            <a
              href="https://www.instagram.com/warriorskarateacademy/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={`${import.meta.env.BASE_URL}footer_instagram_icon.svg`} alt="Instagram" />
            </a>

            <p>
              Train with purpose.<br />
              Grow with discipline.
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          <span>WARRIORS KARATE ACADEMY</span>
          <span>© 2026 Warriors Karate Academy. All rights reserved.</span>
        </div>

        <div className="footer-watermark">
          WARRIORS
        </div>
      </footer>
    </>
  )
}

export default App;