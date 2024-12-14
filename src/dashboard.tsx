import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, ChevronDown, Menu, X, ArrowRight, Brain, Shield, Zap, Users } from 'lucide-react';

// Language translations
const translations = {
  en: {
    nav: {
      home: "Home",
      features: "Features",
      technology: "Technology",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    hero: {
      title: "Redefining Medical Imaging with AI",
      subtitle: "Experience unparalleled precision in diagnostics",
      cta: "Discover the Future",
    },
    features: {
      title: "Revolutionary Features",
      items: [
        { title: "AI-Powered Analysis", description: "Harness the power of advanced machine learning algorithms" },
        { title: "Instant Results", description: "Get comprehensive analysis in seconds" },
        { title: "Unmatched Security", description: "Your data protected by military-grade encryption" },
        { title: "Seamless Integration", description: "Effortlessly integrate with your existing systems" },
      ],
    },
    technology: {
      title: "Cutting-Edge Technology",
      description: "Our AI-driven platform leverages state-of-the-art deep learning models, trained on vast datasets to provide unparalleled accuracy in medical image analysis. From detecting subtle abnormalities to assisting in complex diagnoses, our technology is at the forefront of medical innovation.",
    },
    testimonials: {
      title: "Trusted by Leading Institutions",
      items: [
        { name: "Dr. Emma Schmidt", role: "Chief Radiologist, Berlin Medical Center", quote: "This technology has revolutionized our diagnostic process, offering insights we never thought possible." },
        { name: "Prof. Jean-Pierre Dubois", role: "Head of Oncology, Paris University Hospital", quote: "The precision and speed of this AI system have significantly improved our ability to detect and treat cancers at early stages." },
        { name: "Dr. Sofia Rossi", role: "Neurologist, Milan General Hospital", quote: "An indispensable tool in our practice. It has enhanced our diagnostic capabilities exponentially." },
      ],
    },
    contact: {
      title: "Experience the Future of Medical Imaging",
      subtitle: "Join the network of elite healthcare institutions leveraging AI for unprecedented diagnostic precision.",
      cta: "Schedule a Demo",
    },
    footer: {
      rights: "© 2023 EliteMed AI. All rights reserved.",
      links: ["Privacy Policy", "Terms of Service", "Careers", "Press"],
    },
  },
  de: {
    nav: {
      home: "መግቢያ",
      features: "መለያ",
      technology: "ቴክኖሎጂ",
      testimonials: "ምስክሮች",
      contact: "መገናኛ",
    },
    hero: {
      title: "የህክምና ምስሎችን የሰው ሰራሽ ክህሎት በመጠቀም ይመርምሩ",
      subtitle: "አስተማማኝ እና ተመራጭ",
      cta: "ሙከራዉን ያጀምሩ",
    },
    features: {
      title: "Revolutionäre Funktionen",
      items: [
        { title: "KI-gestützte Analyse", description: "Nutzen Sie die Kraft fortschrittlicher Machine-Learning-Algorithmen" },
        { title: "Sofortige Ergebnisse", description: "Erhalten Sie umfassende Analysen in Sekundenschnelle" },
        { title: "Unübertroffene Sicherheit", description: "Ihre Daten geschützt durch militärische Verschlüsselung" },
        { title: "Nahtlose Integration", description: "Mühelose Integration in Ihre bestehenden Systeme" },
      ],
    },
    technology: {
      title: "Modernste Technologie",
      description: "Unsere KI-gestützte Plattform nutzt modernste Deep-Learning-Modelle, die auf umfangreichen Datensätzen trainiert wurden, um eine beispiellose Genauigkeit bei der Analyse medizinischer Bilder zu bieten. Von der Erkennung subtiler Anomalien bis zur Unterstützung bei komplexen Diagnosen steht unsere Technologie an der Spitze der medizinischen Innovation.",
    },
    testimonials: {
      title: "Vertraut von führenden Institutionen",
      items: [
        { name: "Dr. Emma Schmidt", role: "Chefradiologin, Berliner Medizinisches Zentrum", quote: "Diese Technologie hat unseren Diagnoseprozess revolutioniert und bietet Einblicke, die wir nie für möglich gehalten hätten." },
        { name: "Prof. Jean-Pierre Dubois", role: "Leiter der Onkologie, Pariser Universitätsklinikum", quote: "Die Präzision und Geschwindigkeit dieses KI-Systems haben unsere Fähigkeit, Krebserkrankungen im Frühstadium zu erkennen und zu behandeln, erheblich verbessert." },
        { name: "Dr. Sofia Rossi", role: "Neurologin, Allgemeines Krankenhaus Mailand", quote: "Ein unverzichtbares Werkzeug in unserer Praxis. Es hat unsere diagnostischen Fähigkeiten exponentiell verbessert." },
      ],
    },
    contact: {
      title: "Erleben Sie die Zukunft der medizinischen Bildgebung",
      subtitle: "Schließen Sie sich dem Netzwerk von Elite-Gesundheitseinrichtungen an, die KI für eine beispiellose diagnostische Präzision nutzen.",
      cta: "Demo vereinbaren",
    },
    footer: {
      rights: "© 2023 EliteMed AI. Alle Rechte vorbehalten.",
      links: ["Datenschutzrichtlinie", "Nutzungsbedingungen", "Karriere", "Presse"],
    },
  },
};

const UltraElegantLandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'technology', 'testimonials', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.features, href: '#features' },
    { name: t.nav.technology, href: '#technology' },
    { name: t.nav.testimonials, href: '#testimonials' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <header className="fixed w-full bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md z-50 transition-colors duration-300">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">EliteMed AI</div>
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors ${
                    activeSection === item.href.slice(1) ? 'border-b-2 border-blue-500' : ''
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="relative">
                <button
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                  onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                >
                  <Globe className="w-5 h-5 mr-1" />
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors mr-4"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-20"
          >
            <div className="container mx-auto px-6 py-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-800 dark:text-white text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4">
                <button
                  className="flex items-center text-gray-800 dark:text-white"
                  onClick={() => {
                    setLanguage(language === 'en' ? 'de' : 'en');
                    setIsMenuOpen(false);
                  }}
                >
                  <Globe className="w-5 h-5 mr-1" />
                  <span>{language === 'en' ? 'Deutsch' : 'English'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
                >
                  {t.hero.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                >
                  {t.hero.subtitle}
                </motion.p>
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  href="#contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  {t.hero.cta}
                  <ArrowRight className="ml-2" />
                </motion.a>
              </div>
              <div className="md:w-1/2">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src="hj.avif"
                  alt="AI Medical Image Analysis"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">{t.features.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {t.features.items.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {index === 0 && <Brain className="w-16 h-16 text-blue-600 mb-6" />}
                  {index === 1 && <Zap className="w-16 h-16 text-blue-600 mb-6" />}
                  {index === 2 && <Shield className="w-16 h-16 text-blue-600 mb-6" />}
                  {index === 3 && <Users className="w-16 h-16 text-blue-600 mb-6" />}
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <motion.img
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  src="hj.avif"
                  alt="AI Technology"
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold mb-6 text-gray-800 dark:text-white"
                >
                  {t.technology.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl text-gray-600 dark:text-gray-300"
                >
                  {t.technology.description}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">{t.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {t.testimonials.items.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</div>
                  <div className="text-blue-600 dark:text-blue-400">{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-blue-600 dark:bg-blue-800 text-white transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">{t.contact.title}</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
            <a
              href="#"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              {t.contact.cta}
              <ArrowRight className="ml-2" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold">EliteMed AI</div>
              <div className="text-gray-400">Pioneering Medical Image Analysis</div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-8">
              {t.footer.links.map((link, index) => (
                <a key={index} href="#" className="hover:text-blue-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UltraElegantLandingPage;