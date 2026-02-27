import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wrench, User, Star, MapPin, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-illustration.png';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-display font-bold text-primary">
            Apni<span className="text-secondary">Job</span>
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/user')}>
              Find Workers
            </Button>
            <Button size="sm" onClick={() => navigate('/worker')}>
              Join as Worker
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              🇮🇳 India's Skill-Based Job Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6">
              Connect with{' '}
              <span className="text-primary">Skilled Workers</span>{' '}
              Near You
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Find trusted electricians, plumbers, designers, tutors and more — or offer your skills and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gradient-hero text-primary-foreground shadow-hero text-base px-8"
                onClick={() => navigate('/user')}
              >
                <Search className="mr-2 h-5 w-5" />
                Find a Worker
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-primary text-primary hover:bg-accent"
                onClick={() => navigate('/worker')}
              >
                <Wrench className="mr-2 h-5 w-5" />
                Offer Your Skills
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src={heroImage}
              alt="Skilled workers illustration"
              className="w-full rounded-2xl shadow-card"
            />
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            How do you want to use ApniJob?
          </h2>
          <p className="text-muted-foreground text-lg">Choose your role to get started</p>
        </div>
        <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-3xl">
          <RoleCard
            icon={<User className="h-10 w-10" />}
            title="I need work done"
            description="Search and hire skilled workers near you. Browse profiles, compare prices, and find the perfect match."
            buttonText="Continue as User"
            onClick={() => navigate('/user')}
            gradient="gradient-hero"
          />
          <RoleCard
            icon={<Wrench className="h-10 w-10" />}
            title="I have skills to offer"
            description="Create your profile, showcase your skills, set your rates, and get discovered by people who need your expertise."
            buttonText="Continue as Worker"
            onClick={() => navigate('/worker')}
            gradient="gradient-warm"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10K+', label: 'Workers' },
            { value: '50K+', label: 'Jobs Done' },
            { value: '20+', label: 'Skills' },
            { value: '4.8', label: 'Avg Rating', icon: <Star className="h-4 w-4 text-secondary inline" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-primary">
                {stat.value} {stat.icon}
              </p>
              <p className="text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 ApniJob. Connecting skills with opportunities.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">About</span>
            <span className="hover:text-foreground cursor-pointer">Privacy</span>
            <span className="hover:text-foreground cursor-pointer">Terms</span>
            <span className="hover:text-foreground cursor-pointer">Contact</span>
          </div>
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
}

const RoleCard = ({ icon, title, description, buttonText, onClick, gradient }: RoleCardProps) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border cursor-pointer group"
    onClick={onClick}
  >
    <div className={`inline-flex p-4 rounded-xl ${gradient} text-primary-foreground mb-6`}>
      {icon}
    </div>
    <h3 className="text-xl font-display font-bold text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground mb-6">{description}</p>
    <Button variant="ghost" className="text-primary group-hover:translate-x-1 transition-transform p-0">
      {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </motion.div>
);

export default Index;
