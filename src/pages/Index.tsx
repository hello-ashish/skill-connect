import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wrench, User, Star, MapPin, Search, ArrowRight, Shield, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-illustration.png';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-display font-bold text-primary tracking-tight">
            Apni<span className="text-secondary">Job</span>
          </h1>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">How it works</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">For Workers</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-foreground" onClick={() => navigate('/user')}>
              Find Workers
            </Button>
            <Button size="sm" className="gradient-hero text-primary-foreground shadow-sm" onClick={() => navigate('/worker')}>
              Join as Worker
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8 border border-border/50">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              India's Skill-Based Job Platform
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
              Connect with{' '}
              <span className="text-primary relative">
                Skilled Workers
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>{' '}
              <br />Near You
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Find trusted electricians, plumbers, designers, tutors and more — or offer your skills and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button
                size="lg"
                className="gradient-hero text-primary-foreground shadow-hero text-base px-8 h-12"
                onClick={() => navigate('/user')}
              >
                <Search className="mr-2 h-5 w-5" />
                Find a Worker
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 border-border hover:bg-accent hover:text-accent-foreground"
                onClick={() => navigate('/worker')}
              >
                <Wrench className="mr-2 h-5 w-5" />
                Offer Your Skills
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Free to join</span>
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Verified profiles</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> Instant connect</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-2xl" />
              <img
                src={heroImage}
                alt="Skilled workers illustration"
                className="w-full rounded-2xl shadow-card relative"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Get Started</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">
              How do you want to use ApniJob?
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">Choose your role to get started in minutes</p>
          </motion.div>
        </div>
        <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-3xl">
          <RoleCard
            icon={<User className="h-8 w-8" />}
            title="I need work done"
            description="Search and hire skilled workers near you. Browse profiles, compare prices, and find the perfect match."
            buttonText="Continue as User"
            onClick={() => navigate('/user')}
            gradient="gradient-hero"
            delay={0}
          />
          <RoleCard
            icon={<Wrench className="h-8 w-8" />}
            title="I have skills to offer"
            description="Create your profile, showcase your skills, set your rates, and get discovered by people who need your expertise."
            buttonText="Continue as Worker"
            onClick={() => navigate('/worker')}
            gradient="gradient-warm"
            delay={0.1}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
          {[
            { value: '10K+', label: 'Skilled Workers', icon: <Users className="h-5 w-5" /> },
            { value: '50K+', label: 'Jobs Completed', icon: <CheckCircle2 className="h-5 w-5" /> },
            { value: '20+', label: 'Skill Categories', icon: <Wrench className="h-5 w-5" /> },
            { value: '4.8', label: 'Average Rating', icon: <Star className="h-5 w-5 fill-secondary text-secondary" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-card"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-primary mb-3">
                {stat.icon}
              </div>
              <p className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4 bg-muted/20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-display font-bold text-foreground">
              Apni<span className="text-secondary">Job</span>
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Connecting skills with opportunities across India.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 ApniJob. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  gradient: string;
  delay: number;
}

const RoleCard = ({ icon, title, description, buttonText, onClick, gradient, delay }: RoleCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -4 }}
    className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/60 cursor-pointer group"
    onClick={onClick}
  >
    <div className={`inline-flex p-3.5 rounded-xl ${gradient} text-primary-foreground mb-5`}>
      {icon}
    </div>
    <h3 className="text-xl font-display font-bold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground mb-6 leading-relaxed text-[15px]">{description}</p>
    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-3 gap-2 transition-all">
      {buttonText} <ArrowRight className="h-4 w-4" />
    </span>
  </motion.div>
);

export default Index;
