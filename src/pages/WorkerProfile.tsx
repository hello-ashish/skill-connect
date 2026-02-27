import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, IndianRupee, Phone, Mail, Clock, Briefcase, Shield, Share2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockWorkers } from '@/data/mockWorkers';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const worker = mockWorkers.find(w => w.id === id);

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Worker not found</h2>
          <Button onClick={() => navigate('/user')}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(174_62%_50%_/_0.15),_transparent_50%)]" />
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-16 pt-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center sm:items-end gap-6"
          >
            <div className="relative">
              <img
                src={worker.profileImage}
                alt={worker.name}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-primary-foreground/20 shadow-lg"
              />
              {worker.availability && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-primary-foreground/20 flex items-center justify-center">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-3xl font-display font-bold">{worker.name}</h1>
                <Shield className="h-5 w-5 text-secondary" />
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-primary-foreground/80 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {worker.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-secondary text-secondary" /> {worker.rating} ({worker.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {worker.experience} yrs
                </span>
              </div>
              <div className="mt-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${worker.availability ? 'bg-green-500/20 text-green-200' : 'bg-primary-foreground/10 text-primary-foreground/60'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${worker.availability ? 'bg-green-400 animate-pulse-soft' : 'bg-primary-foreground/40'}`} />
                  {worker.availability ? 'Available for hire' : 'Currently Busy'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-card">
              <h2 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                About
              </h2>
              <p className="text-muted-foreground leading-relaxed">{worker.bio}</p>
            </div>

            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-card">
              <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map(skill => (
                  <Badge key={skill} className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium rounded-lg">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-card">
              <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Overview
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <InfoRow icon={<Briefcase className="h-5 w-5 text-primary" />} label="Experience" value={`${worker.experience} years`} />
                <InfoRow icon={<IndianRupee className="h-5 w-5 text-primary" />} label="Hourly Rate" value={`₹${worker.pricePerHour}/hour`} />
                <InfoRow icon={<Clock className="h-5 w-5 text-primary" />} label="Member Since" value={new Date(worker.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })} />
                <InfoRow icon={<Star className="h-5 w-5 text-secondary" />} label="Rating" value={`${worker.rating} out of 5 (${worker.reviewCount} reviews)`} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-card sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                <p className="text-4xl font-display font-bold text-primary flex items-center justify-center">
                  <IndianRupee className="h-8 w-8" />{worker.pricePerHour}
                  <span className="text-base font-normal text-muted-foreground ml-1">/hr</span>
                </p>
              </div>
              <Separator className="mb-6" />
              <Button className="w-full gradient-hero text-primary-foreground shadow-hero mb-3 h-12 text-base" size="lg">
                <Phone className="mr-2 h-4 w-4" /> Contact Now
              </Button>
              <Button variant="outline" className="w-full h-12 text-base" size="lg">
                <Mail className="mr-2 h-4 w-4" /> Send Message
              </Button>
              
              <div className="mt-6 pt-6 border-t border-border/60">
                <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2.5 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary shrink-0" /> {worker.phone}
                  </p>
                  <p className="flex items-center gap-2.5 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary shrink-0" /> {worker.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-12" />
    </div>
  );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/40 border border-border/40">
    <div className="shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  </div>
);

export default WorkerProfile;
