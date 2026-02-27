import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, IndianRupee, Phone, Mail, Clock, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      <div className="gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="container mx-auto px-4 pb-12 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center sm:items-end gap-6"
          >
            <img
              src={worker.profileImage}
              alt={worker.name}
              className="w-28 h-28 rounded-2xl object-cover ring-4 ring-primary-foreground/20 shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-display font-bold">{worker.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-primary-foreground/80">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {worker.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-secondary text-secondary" /> {worker.rating} ({worker.reviewCount} reviews)
                </span>
              </div>
              <div className="mt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${worker.availability ? 'bg-green-500/20 text-green-200' : 'bg-primary-foreground/10 text-primary-foreground/60'}`}>
                  <span className={`w-2 h-2 rounded-full ${worker.availability ? 'bg-green-400' : 'bg-primary-foreground/40'}`} />
                  {worker.availability ? 'Available Now' : 'Currently Busy'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-bold text-lg text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{worker.bio}</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map(skill => (
                  <Badge key={skill} className="bg-accent text-accent-foreground px-4 py-1.5 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoRow icon={<Briefcase className="h-5 w-5 text-primary" />} label="Experience" value={`${worker.experience} years`} />
                <InfoRow icon={<IndianRupee className="h-5 w-5 text-primary" />} label="Rate" value={`₹${worker.pricePerHour}/hour`} />
                <InfoRow icon={<Clock className="h-5 w-5 text-primary" />} label="Member Since" value={new Date(worker.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })} />
                <InfoRow icon={<Star className="h-5 w-5 text-secondary" />} label="Rating" value={`${worker.rating} / 5`} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <div className="text-center mb-6">
                <p className="text-3xl font-display font-bold text-primary flex items-center justify-center">
                  <IndianRupee className="h-7 w-7" />{worker.pricePerHour}
                  <span className="text-base font-normal text-muted-foreground ml-1">/hr</span>
                </p>
              </div>
              <Button className="w-full gradient-hero text-primary-foreground shadow-hero mb-3" size="lg">
                <Phone className="mr-2 h-4 w-4" /> Contact Now
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Mail className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h3 className="font-display font-bold text-foreground mb-3">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" /> {worker.phone}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" /> {worker.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
    {icon}
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default WorkerProfile;
