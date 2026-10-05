import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Mail,
  Menu,
  Moon,
  Palette,
  Send,
  Sun,
  User,
  X,
} from "lucide-react";

/* =====================================================
   PROJECTS
===================================================== */

const projects = [
  {
    number: "01",
    category: "AGRICULTURE TECHNOLOGY",
    title: "AMIS / SWAT",
    description:
      "Agriculture Marketing Information System developed under the Sindh Water and Agriculture Transformation Project to digitalize agricultural market information, data collection and reporting.",
    technologies: ["React Native", "Expo", "PHP", "MySQL"],
  },
  {
    number: "02",
    category: "HR MANAGEMENT",
    title: "Nexora HR",
    description:
      "Modern HR management platform for employees, attendance, leave management, payroll, departments, performance and reporting.",
    technologies: ["React", "Vite", "Tailwind", "Node.js"],
  },
  {
    number: "03",
    category: "EDUCATION MANAGEMENT",
    title: "SMS / Student Management System",
    description:
      "A Python-based student management system for organizing student profiles, course enrollment, attendance, grades and academic records through an administrator dashboard.",
    technologies: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript"],
  },
];

/* =====================================================
   SKILLS
===================================================== */

const skills = [
  ["React", 94],
  ["JavaScript", 92],
  ["React Native", 90],
  ["Node.js", 86],
  ["PHP", 84],
  ["MySQL", 87],
  ["Tailwind CSS", 93],
  ["Vite", 90],
  ["UI / UX", 88],
  ["Figma", 82],
];

/* =====================================================
   3D ROBOT
===================================================== */

function Robot({ scrollProgress, contactMode }) {
  const robot = useRef();
  const head = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const leftEye = useRef();
  const rightEye = useRef();
  const antenna = useRef();

  const elapsed = useRef(0);
  const blinkTimer = useRef(0);
  const blinking = useRef(false);

  useFrame((_, delta) => {
    if (!robot.current) return;

    elapsed.current += delta;

    const time = elapsed.current;
    const p = scrollProgress;

    /* Scroll movement */

    const targetX = contactMode
      ? -0.35
      : Math.sin(p * Math.PI * 6) * 1.05;

    const targetY = contactMode
      ? 0.08
      : Math.sin(p * Math.PI * 4) * 0.45;

    const targetRotation = contactMode
      ? 0.28
      : Math.sin(p * Math.PI * 5) * 0.65;

    const targetScale = contactMode
      ? 1.12
      : 0.48 +
        (0.5 + 0.5 * Math.sin(p * Math.PI * 4)) * 0.72;

    robot.current.position.x =
      THREE.MathUtils.damp(
        robot.current.position.x,
        targetX,
        5,
        delta
      );

    robot.current.position.y =
      THREE.MathUtils.damp(
        robot.current.position.y,
        targetY + Math.sin(time * 1.5) * 0.08,
        5,
        delta
      );

    robot.current.rotation.y =
      THREE.MathUtils.damp(
        robot.current.rotation.y,
        targetRotation,
        5,
        delta
      );

    robot.current.rotation.z =
      Math.sin(time * 0.7) * 0.04;

    const scale = THREE.MathUtils.damp(
      robot.current.scale.x,
      targetScale,
      5,
      delta
    );

    robot.current.scale.setScalar(scale);

    /* Head */

    if (head.current) {
      head.current.rotation.y =
        contactMode
          ? -0.18
          : Math.sin(p * Math.PI * 6) * 0.45;

      head.current.rotation.x =
        contactMode
          ? -0.08
          : Math.sin(p * Math.PI * 4) * 0.1;
    }

    /* Arms */

    if (leftArm.current) {
      const idlePose =
        0.08 +
        Math.sin(p * Math.PI * 6) * 0.35 +
        Math.sin(time) * 0.04;
      const greetingPose =
        -1.9 + Math.sin(time * 3) * 0.06;

      leftArm.current.rotation.z = THREE.MathUtils.damp(
        leftArm.current.rotation.z,
        contactMode ? greetingPose : idlePose,
        5,
        delta
      );
    }

    if (rightArm.current) {
      const idlePose =
        -0.08 -
        Math.sin(p * Math.PI * 6) * 0.35 -
        Math.sin(time) * 0.04;
      const greetingPose =
        2.55 - Math.sin(time * 3) * 0.06;

      rightArm.current.rotation.z = THREE.MathUtils.damp(
        rightArm.current.rotation.z,
        contactMode ? greetingPose : idlePose,
        5,
        delta
      );
    }

    /* Antenna */

    if (antenna.current) {
      antenna.current.rotation.z =
        Math.sin(time * (contactMode ? 3 : 2)) *
        (contactMode ? 0.18 : 0.1);
    }

    /* Eye blink */

    blinkTimer.current += delta;

    if (
      blinkTimer.current > 3 &&
      !blinking.current
    ) {
      blinking.current = true;
      blinkTimer.current = 0;
    }

    if (
      blinking.current &&
      blinkTimer.current > 0.14
    ) {
      blinking.current = false;
      blinkTimer.current = 0;
    }

    const eyeScale =
      blinking.current ? 0.08 : 1;

    if (leftEye.current) {
      leftEye.current.scale.y = eyeScale;
    }

    if (rightEye.current) {
      rightEye.current.scale.y = eyeScale;
    }
  });

  return (
    <group ref={robot}>

      {/* ================= BODY ================= */}

      <RoundedBox
        args={[2.15, 2.35, 1.3]}
        radius={0.16}
        smoothness={5}
        position={[0, -0.25, 0]}
        castShadow
        receiveShadow
      >

        <meshStandardMaterial
          color="#cbd1d6"
          metalness={0.75}
          roughness={0.25}
        />
      </RoundedBox>

      {/* Chest screen */}

      <mesh position={[0, 0.05, 0.68]}>
        <boxGeometry args={[1.5, 0.9, 0.06]} />

        <meshStandardMaterial
          color="#090d12"
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.18, 0.72]}>
        <boxGeometry args={[0.7, 0.07, 0.03]} />

        <meshBasicMaterial color="#22c55e" />
      </mesh>

      <mesh position={[0, -0.12, 0.72]}>
        <boxGeometry args={[0.42, 0.04, 0.03]} />

        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* ================= NECK ================= */}

      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry
          args={[0.3, 0.3, 0.35, 24]}
        />

        <meshStandardMaterial
          color="#858d95"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* ================= HEAD ================= */}

      <group
        ref={head}
        position={[0, 2.05, 0]}
      >

        <RoundedBox
          args={[2.35, 1.55, 1.45]}
          radius={0.16}
          smoothness={5}
          castShadow
          receiveShadow
        >

          <meshStandardMaterial
            color="#e6eaed"
            metalness={0.7}
            roughness={0.22}
          />
        </RoundedBox>

        {/* Face glass */}

        <mesh position={[0, 0, 0.75]}>
          <boxGeometry
            args={[1.9, 0.95, 0.08]}
          />

          <meshStandardMaterial
            color="#05080c"
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Left eye */}

        <group
          ref={leftEye}
          position={[-0.43, 0.08, 0.83]}
        >

          <mesh>
            <sphereGeometry
              args={[0.17, 24, 24]}
            />

            <meshBasicMaterial color="#ffffff" />
          </mesh>

          <mesh position={[0, 0, 0.12]}>
            <sphereGeometry
              args={[0.07, 18, 18]}
            />

            <meshBasicMaterial color="#22c55e" />
          </mesh>

        </group>

        {/* Right eye */}

        <group
          ref={rightEye}
          position={[0.43, 0.08, 0.83]}
        >

          <mesh>
            <sphereGeometry
              args={[0.17, 24, 24]}
            />

            <meshBasicMaterial color="#ffffff" />
          </mesh>

          <mesh position={[0, 0, 0.12]}>
            <sphereGeometry
              args={[0.07, 18, 18]}
            />

            <meshBasicMaterial color="#22c55e" />
          </mesh>

        </group>

        {/* Mouth */}

        {contactMode ? (
          <mesh
            position={[0, -0.3, 0.82]}
            rotation={[0, 0, Math.PI]}
          >
            <torusGeometry args={[0.23, 0.025, 8, 32, Math.PI]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        ) : (
          <mesh position={[0, -0.28, 0.82]}>
            <boxGeometry args={[0.48, 0.055, 0.04]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        )}

        {/* Antenna */}

        <group ref={antenna}>

          <mesh position={[0, 1, 0]}>
            <cylinderGeometry
              args={[0.035, 0.035, 0.4, 16]}
            />

            <meshStandardMaterial color="#777" />
          </mesh>

          <mesh position={[0, 1.22, 0]}>
            <sphereGeometry
              args={[0.1, 20, 20]}
            />

            <meshBasicMaterial color="#22c55e" />
          </mesh>

        </group>

      </group>

      {/* ================= LEFT ARM ================= */}

      <group
        ref={leftArm}
        position={[-1.45, -0.2, 0]}
      >

        <RoundedBox
          args={[0.5, 1.7, 0.55]}
          radius={0.12}
          smoothness={4}
          castShadow
          receiveShadow
        >

          <meshStandardMaterial
            color="#bfc5ca"
            metalness={0.75}
            roughness={0.28}
          />
        </RoundedBox>

        <mesh position={[0, -1, 0]}>
          <sphereGeometry
            args={[0.3, 20, 20]}
          />

          <meshStandardMaterial
            color="#899199"
            metalness={0.7}
          />
        </mesh>

      </group>

      {/* ================= RIGHT ARM ================= */}

      <group
        ref={rightArm}
        position={[1.45, -0.2, 0]}
      >

        <RoundedBox
          args={[0.5, 1.7, 0.55]}
          radius={0.12}
          smoothness={4}
          castShadow
          receiveShadow
        >

          <meshStandardMaterial
            color="#bfc5ca"
            metalness={0.75}
            roughness={0.28}
          />
        </RoundedBox>

        <mesh position={[0, -1, 0]}>
          <sphereGeometry
            args={[0.3, 20, 20]}
          />

          <meshStandardMaterial
            color="#899199"
            metalness={0.7}
          />
        </mesh>

      </group>

      {/* ================= WAIST ================= */}

      <RoundedBox
        args={[1.55, 0.45, 0.85]}
        radius={0.1}
        smoothness={4}
        position={[0, -1.6, 0]}
        castShadow
        receiveShadow
      >

        <meshStandardMaterial
          color="#8c949c"
          metalness={0.65}
          roughness={0.3}
        />
      </RoundedBox>

      {/* ================= LEFT LEG ================= */}

      <RoundedBox
        args={[0.65, 1.55, 0.7]}
        radius={0.12}
        smoothness={4}
        position={[-0.5, -2.45, 0]}
        castShadow
        receiveShadow
      >

        <meshStandardMaterial
          color="#bfc5ca"
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>

      {/* ================= RIGHT LEG ================= */}

      <RoundedBox
        args={[0.65, 1.55, 0.7]}
        radius={0.12}
        smoothness={4}
        position={[0.5, -2.45, 0]}
        castShadow
        receiveShadow
      >

        <meshStandardMaterial
          color="#bfc5ca"
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>

      {/* ================= FEET ================= */}

      <RoundedBox
        args={[0.85, 0.35, 1]}
        radius={0.1}
        smoothness={4}
        position={[-0.5, -3.35, 0.12]}
        castShadow
        receiveShadow
      >

        <meshStandardMaterial
          color="#777f87"
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.85, 0.35, 1]}
        radius={0.1}
        smoothness={4}
        position={[0.5, -3.35, 0.12]}
        castShadow
        receiveShadow
      >

        <meshStandardMaterial
          color="#777f87"
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>

    </group>
  );
}

/* =====================================================
   ROBOT SCENE
===================================================== */

function RobotScene({ scrollProgress, contactMode }) {
  return (
    <div
      className="robot-scene"
      data-contact-mode={contactMode}
    >

      <Canvas
        shadows
        camera={{
          position: [0, 0, 15],
          fov: 38,
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
        dpr={[1, 2]}
      >

        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 6, 8]}
          intensity={3}
          castShadow
        />

        <directionalLight
          position={[-5, 2, 5]}
          intensity={1.8}
        />

        <pointLight
          position={[0, 3, 4]}
          intensity={1.5}
          color="#22c55e"
        />

        <Robot
          scrollProgress={scrollProgress}
          contactMode={contactMode}
        />

      </Canvas>

    </div>
  );
}

/* =====================================================
   NAVBAR
===================================================== */

function Navbar({
  dark,
  setDark,
  menuOpen,
  setMenuOpen,
}) {
  const links = [
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "contact",
  ];

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="nav-box">

        <button
          className="logo"
          onClick={() => scrollTo("home")}
        >
          <span>KH</span>
          <strong>Kumail Habib</strong>
        </button>

        <nav className={menuOpen ? "open" : ""}>

          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
            >
              {link}
            </button>
          ))}

        </nav>

        <div className="nav-actions">

          <button
            className="theme-button"
            onClick={() =>
              setDark((value) => !value)
            }
          >
            {dark ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>

        </div>

      </div>

    </header>
  );
}

/* =====================================================
   MAIN APP
===================================================== */

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] =
    useState(0);
  const [contactMode, setContactMode] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);

  /* Scroll tracking */

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        max > 0
          ? window.scrollY / max
          : 0;

      setScrollProgress(
        Math.min(
          1,
          Math.max(0, progress)
        )
      );

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(
          updateScroll
        );

        ticking = true;
      }
    };

    updateScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        updateScroll
      );
    };
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById("contact");

    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactMode(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  /* Reveal animations */

  useEffect(() => {
    const elements =
      document.querySelectorAll(
        ".reveal"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "visible"
              );
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () =>
      observer.disconnect();
  }, []);

  return (
    <div
      className={
        dark
          ? "app dark"
          : "app light"
      }
    >

      {/* NAVBAR */}

      <Navbar
        dark={dark}
        setDark={setDark}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* 3D ROBOT */}

      <RobotScene
        scrollProgress={
          scrollProgress
        }
        contactMode={contactMode}
      />

      {/* SCROLL PROGRESS */}

      <div className="scroll-progress">

        <span
          style={{
            height: `${
              scrollProgress * 100
            }%`,
          }}
        />

      </div>

      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="home"
          className="section hero"
        >

          <div className="hero-inner">

            <div className="hero-copy reveal">

              <div className="availability">
                <span />
                Available for opportunities
              </div>

              <p className="eyebrow">
                HELLO, I'M
              </p>

              <h1>
                Kumail
                <span>Habib.</span>
              </h1>

              <div className="roles">

                <span>
                  Web Developer
                </span>

                <i>•</i>

                <span>
                  App Developer
                </span>

                <i>•</i>

                <span>
                  UI Designer
                </span>

              </div>

              <p className="hero-description">
                I build modern websites,
                mobile applications and
                digital products with
                clean code, thoughtful
                design and engaging user
                experiences.
              </p>

              <div className="hero-buttons">

                <a
                  href="#projects"
                  className="primary-button"
                >
                  View My Work
                  <ArrowUpRight
                    size={17}
                  />
                </a>

                <a
                  href="#contact"
                  className="secondary-button"
                >
                  Contact Me
                  <Mail size={17} />
                </a>

              </div>

              <div className="hero-stats">

                <div>
                  <strong>
                    02+
                  </strong>

                  <span>
                    Major Projects
                  </span>
                </div>

                <div>
                  <strong>
                    10+
                  </strong>

                  <span>
                    Technologies
                  </span>
                </div>

                <div>
                  <strong>
                    ∞
                  </strong>

                  <span>
                    Ideas
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="scroll-hint">
            <ArrowDown size={15} />
            Scroll to explore
          </div>

        </section>

        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"
          className="section"
        >

          <div className="content">

            <div className="section-heading reveal">

              <p className="eyebrow">
                01 / ABOUT
              </p>

              <h2>
                Building digital
                <span>
                  {" "}
                  experiences.
                </span>
              </h2>

              <p>
                I focus on creating
                practical, modern and
                visually attractive
                software solutions.
              </p>

            </div>

            <div className="feature-grid">

              <div className="feature-card reveal">

                <Code2 />

                <div>

                  <h3>
                    Development
                  </h3>

                  <p>
                    Modern web and
                    mobile applications
                    built with reliable
                    technologies.
                  </p>

                </div>

              </div>

              <div className="feature-card reveal delay-1">

                <Palette />

                <div>

                  <h3>
                    UI / UX
                  </h3>

                  <p>
                    Clean interfaces
                    focused on usability,
                    clarity and visual
                    quality.
                  </p>

                </div>

              </div>

              <div className="feature-card reveal delay-2">

                <User />

                <div>

                  <h3>
                    User Focus
                  </h3>

                  <p>
                    Creating digital
                    experiences that are
                    simple and enjoyable
                    to use.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            SKILLS
        ================================================= */}

        <section
          id="skills"
          className="section"
        >

          <div className="content">

            <div className="section-heading reveal">

              <p className="eyebrow">
                02 / SKILLS
              </p>

              <h2>
                Technologies I
                <span>
                  {" "}
                  work with.
                </span>
              </h2>

            </div>

            <div className="skills-list">

              {skills.map(
                (
                  [skill, percentage],
                  index
                ) => (

                  <div
                    className="skill-row reveal"
                    key={skill}
                    style={{
                      transitionDelay: `${
                        (index % 5) *
                        0.06
                      }s`,
                    }}
                  >

                    <div className="skill-top">

                      <span>
                        {skill}
                      </span>

                      <span>
                        {percentage}%
                      </span>

                    </div>

                    <div className="skill-track">

                      <span
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            PROJECTS
        ================================================= */}

        <section
          id="projects"
          className="section"
        >

          <div className="content">

            <div className="section-heading reveal">

              <p className="eyebrow">
                03 / PROJECTS
              </p>

              <h2>
                Selected
                <span>
                  {" "}
                  work.
                </span>
              </h2>

              <p>
                Digital products and
                systems developed using
                modern web and mobile
                technologies.
              </p>

            </div>

            <div className="project-list">

              {projects.map(
                (
                  project,
                  index
                ) => (

                  <article
                    className="project-card reveal"
                    key={
                      project.title
                    }
                    style={{
                      transitionDelay: `${
                        index * 0.15
                      }s`,
                    }}
                    onClick={() =>
                      setSelectedProject(
                        project
                      )
                    }
                  >

                    <div className="project-number">
                      {
                        project.number
                      }
                    </div>

                    <div className="project-main">

                      <small>
                        {
                          project.category
                        }
                      </small>

                      <h3>
                        {
                          project.title
                        }
                      </h3>

                      <p>
                        {
                          project.description
                        }
                      </p>

                      <div className="tags">

                        {project.technologies.map(
                          (
                            technology
                          ) => (

                            <span
                              key={
                                technology
                              }
                            >
                              {
                                technology
                              }
                            </span>

                          )
                        )}

                      </div>

                    </div>

                    <ArrowUpRight className="project-icon" />

                  </article>

                )
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            EXPERIENCE
        ================================================= */}

        <section
          id="experience"
          className="section"
        >

          <div className="content">

            <div className="section-heading reveal">

              <p className="eyebrow">
                04 / EXPERIENCE
              </p>

              <h2>
                Professional
                <span>
                  {" "}
                  journey.
                </span>
              </h2>

            </div>

            <div className="timeline">

              <div className="timeline-item reveal">

                <div className="timeline-date">
                  2026
                </div>

                <div>

                  <h3>
                    Software Engineer
                  </h3>

                  <h4>
                    Aspire Script Tech LLP
                  </h4>

                  <p>
                    Working on modern
                    software, web
                    applications and
                    digital business
                    solutions.
                  </p>

                </div>

              </div>

              <div className="timeline-item reveal delay-1">

                <div className="timeline-date">
                  2025 — 2026
                </div>

                <div>

                  <h3>
                    Mobile App Developer
                  </h3>

                  <h4>
                    Veger System
                  </h4>

                  <p>
                    Worked on mobile
                    application development
                    and application
                    interfaces.
                  </p>

                </div>

              </div>

              <div className="timeline-item reveal delay-2">

                <div className="timeline-date">
                  PRESENT
                </div>

                <div>

                  <h3>
                    Freelance Developer
                  </h3>

                  <h4>
                    Independent
                  </h4>

                  <p>
                    Building websites,
                    applications and custom
                    digital experiences.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="contact"
          className="section"
        >

          <div className="content">

            <div className="contact-box reveal">

              <p className="eyebrow">
                05 / CONTACT
              </p>

              <h2>
                Let's build
                <span>
                  {" "}
                  something.
                </span>
              </h2>

              <p>
                Have a project, idea or
                opportunity? Let's talk
                about it.
              </p>

              <a
                className="contact-email"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kumailhabib23%40gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                kumailhabib23@gmail.com
                <ArrowUpRight
                  size={18}
                />
              </a>

              <div className="contact-buttons">

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kumailhabib23%40gmail.com"
                  className="primary-button"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Send size={17} />
                  Send Message
                </a>

              </div>

            </div>

            <footer>

              <span>
                ©{" "}
                {new Date().getFullYear()}{" "}
                Kumail Habib
              </span>

              <span>
                React • Three.js • Modern Web
              </span>

            </footer>

          </div>

        </section>

      </main>

      {/* =================================================
          PROJECT MODAL
      ================================================= */}

      {selectedProject && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            className="project-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProject(null)
              }
            >
              <X size={19} />
            </button>

            <p className="eyebrow">
              {
                selectedProject.category
              }
            </p>

            <h2>
              {
                selectedProject.title
              }
            </h2>

            <p>
              {
                selectedProject.description
              }
            </p>

            <div className="tags">

              {selectedProject.technologies.map(
                (technology) => (

                  <span
                    key={technology}
                  >
                    {technology}
                  </span>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}