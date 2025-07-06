import React, { useState, useEffect, useRef } from "react";
import { FaReact, FaJava, FaDatabase } from "react-icons/fa";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaSignInAlt,
  FaSignOutAlt,
  FaPowerOff,
} from "react-icons/fa";
import {
  SiFirebase,
  SiSpringboot,
  SiTailwindcss,
  SiMysql,
} from "react-icons/si";
import brainstormingImg from "../../public/images/artificial-intelligence.png";
import developmentImg from "../../public/images/development.png";
import java from "../assets/images/java.png";
import react from "../assets/images/react.png";
import ic3 from "../assets/images/ic3.png";

import LoginModal from "../components/LoginModal";
import "../assets/css/custom.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../services/AuthProvider";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useInView } from "react-intersection-observer";
import GetInTouch from "../components/GetInTouch";
import HeroLG from "../components/hero/HeroLG";
import RatingWidget from "../components/RatingWidget";
import { Link, useLocation } from "react-router-dom";
import Card from "../components/cards/SpringBootCard";
import SpringBootCard from "../components/cards/SpringBootCard";
import ReactCard from "../components/cards/ReactCard";
import JavaCard from "../components/cards/JavaCard";
import TailwindCard from "../components/cards/TailwindCard";
import FirebaseCard from "../components/cards/FirebaseCard";
import MySQLCard from "../components/cards/MySQL";
import FeatureSection from "../components/FeatureSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TopHighlightsSection from "../components/TopHighlightsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTAsection";
import PartnerWithUsSection from "../components/PartnerWithUsSection";
import TrustIndicatorsSection from "../components/TrustIndicatorsSection";

const Landing = () => {
  const { loggedIn, logout } = useAuth();
  const [loginShow, setLoginShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoogedIn = useSelector((state) => state.auth.loggedIn);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const certiRef = useRef(null);
  const [rating, setRating] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const contactMeRef = useRef(null);
  const homeRef = useRef(null);
  const [hasRated, setHasRated] = useState(
    localStorage.getItem("hasRated") === "true"
  );

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: false, // Set true if you want it only once
    threshold: 0.1,
  });
  const toggleLogin = () => {
    setLoginShow(!loginShow);
  };

  const [theme, setTheme] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // only animate once
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRating(true);
    }, 3 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!dismissed) return;

    const interval = setInterval(() => {
      setRating(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dismissed]);

  const handleDismiss = () => {
    setRating(false);
    setDismissed(true);
  };

  const handleSubmit = () => {
    // Your submit logic here
    setRating(false);
    setDismissed(false); // Stop showing if submitted
  };

  const cardVariants = {
    offscreen: { opacity: 0, x: 100 },
    onscreen: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const heroVariants = {
    offscreen: { y: 100 },
    onscreen: { y: -30, transition: { duration: 0.8 } },
  };

  const fadeInUp = {
    offscreen: {
      opacity: 0,
      y: 40,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const MenuSlideIn = {
    offscreen: {
      opacity: 0,
      x: -300, // Start off-screen to the left
    },
    onscreen: {
      opacity: 1,
      x: 0, // Slide in to normal position
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: -300, // Slide back out to the left
      transition: {
        ease: "easeIn",
        duration: 0.3,
      },
    },
  };

  const [dark, setDark] = useState(false);

  const handleImageSelection = (path) => {
    setImage(path);
    setCertModalOpen(true);
    console.log("Image path - " + path);
  };

  const toggleTheme = () => {
    setTheme("dark");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    console.log("Root " + root);
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeLogin = () => {
    setLoginShow(false);
  };
  const menuButtonRef = useRef(null);
  const sideBarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (certiRef.current && !certiRef.current.contains(event.target)) {
        setCertModalOpen(false);
      }
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [certiRef]);

  return (
    <>
      <div className=" relative bg-white text-black dark:text-white">
        {/* Navigation */}
        <div className="fixed w-full z-20 bg-white md:bg-[#1a1a1a] pt-5 lg:pt-10 lg:mb-1">
          <nav className="relative py-2 px-2 md:px-8 ">
            <div className="mx-auto flex justify-between items-center">
              <div className="flex flex-row justify-center items-center">
                {/* <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4T2eeT56DWkwb5nJE1avnleYrgQBQTKmQsiXkQavEnsEpakMNMALnFE&s"
                  alt="Logo"
                  className="w-16 h-16"
                /> */}
                <div className="text-20 font-bold text-black-600 md:text-white font-[cursive]">
                  Chogyal
                </div>
              </div>
              <div className="hidden items-center gap-8 rounded-full bg-[#cccccc] px-6 py-2 md:flex">
                <a
                  href="/"
                  className="cursor-pointer text-14 font-light text-black transition-opacity hover:opacity-80"
                >
                  Home
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    contactMeRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="cursor-pointer text-14 font-light text-black transition-opacity hover:opacity-80"
                >
                  Contact
                </a>

                <Link
                  to="/about"
                  className="cursor-pointer text-14 font-light text-black transition-opacity hover:opacity-80"
                >
                  About
                </Link>
              </div>
              <div className="hidden md:block  w-fit gap-4 px-6">
                <div>
                  {!loggedIn && (
                    <span
                      onClick={toggleLogin}
                      className=" text-primary transition cursor-pointer nav-btn md:border-white"
                    >
                      Login
                    </span>
                  )}
                  {loggedIn && (
                    <div className="relative group cursor-pointer">
                      <FaPowerOff
                        size={24}
                        onClick={() => logout()}
                        className="text-white transition cursor-pointer"
                      />
                      <div className="absolute right-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                ref={menuButtonRef}
                className="md:hidden menu-toggle-button"
                onClick={toggleMenu}
              >
                {menuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 relative"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          <motion.div
            ref={sideBarRef}
            variants={MenuSlideIn}
            initial="offscreen"
            animate={menuOpen ? "onscreen" : "exit"}
            exit="exit"
            className="fixed top-10 bg-white left-0  h-screen w-[70%] sm:w-[60%] md:w-[40%] md:hidden z-50 overflow-y-auto shadow-lg"
          >
            <nav className="border-b-1 border-[#cccccc] pb-5 py-5">
              <div className=" flex flex-col gap-y-2">
                <a
                  href="#"
                  onClick={() => {
                    homeRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 transition"
                >
                  <FaHome className="w-5 h-5" /> Home
                </a>
                <Link
                  to="/about"
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <FaInfoCircle className="w-5 h-5" /> About
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  onClick={() => {
                    contactMeRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuOpen(false);
                  }}
                >
                  <FaPhone className="w-5 h-5" /> Contact
                </a>
              </div>
            </nav>
            <div className="mt-auto">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                {loggedIn ? (
                  <>
                    <FaSignOutAlt className="w-5 h-5" />
                    <span
                      onClick={() => {
                        onClose();
                        logout();
                      }}
                      className="hover:text-cyan-600 transition cursor-pointer"
                    >
                      Logout
                    </span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="w-5 h-5" />
                    <span
                      onClick={toggleLogin}
                      className="hover:text-cyan-600 transition cursor-pointer"
                    >
                      Login
                    </span>
                  </>
                )}
              </a>
            </div>
          </motion.div>
        </div>

        {/* LoginModal */}
        {loginShow && <LoginModal onClose={closeLogin} />}

        {/* hero section  */}
        {/* {isMobile ? <HeroSM /> : <HeroLG />} */}
        <HeroLG
          ref={homeRef}
          onScroll={() =>
            contactMeRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <FeatureSection />
        <HowItWorksSection />
        <TopHighlightsSection />
        <TestimonialsSection />
        <CTASection />
        <PartnerWithUsSection />
        <TrustIndicatorsSection />
        {/* Footer */}
        <Footer />
        {/* <button onClick={() => localStorage.removeItem("hasRated")}>
          Remove rated
        </button> */}
        <AnimatePresence>
          {rating && !hasRated && (
            <motion.div
              className="fixed bottom-0 z-20 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <RatingWidget onClose={handleDismiss} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Landing;
