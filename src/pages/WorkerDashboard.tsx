import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, X, Upload, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SKILL_OPTIONS, LOCATION_OPTIONS } from '@/types';
import { toast } from 'sonner';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    experience: '',
    pricePerHour: '',
    location: '',
    availability: true,
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillToAdd, setSkillToAdd] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillToAdd('');
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || selectedSkills.length === 0) {
      toast.error('Please fill in name, email, and at least one skill');
      return;
    }
    toast.success('Profile saved successfully! 🎉');
  };

  const completionItems = [
    { done: !!formData.name, label: 'Name' },
    { done: !!formData.email, label: 'Email' },
    { done: selectedSkills.length > 0, label: 'Skills' },
    { done: !!formData.location, label: 'Location' },
    { done: !!formData.pricePerHour, label: 'Rate' },
  ];
  const completionPct = Math.round((completionItems.filter(i => i.done).length / completionItems.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center h-16 px-4 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-display font-bold text-primary">
            Apni<span className="text-secondary">Job</span>
          </Link>
          <div className="ml-auto">
            <Button onClick={handleSave} className="gradient-hero text-primary-foreground shadow-sm">
              <Save className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-foreground mb-1 tracking-tight">Worker Profile</h1>
          <p className="text-muted-foreground mb-8">Create your profile to get discovered by people who need your skills.</p>

          {/* Completion indicator */}
          <div className="bg-card rounded-2xl border border-border/60 p-5 shadow-card mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Profile completion</p>
              <span className="text-sm font-bold text-primary">{completionPct}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-hero rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {completionItems.map(item => (
                <span key={item.label} className={`text-xs px-2 py-0.5 rounded-full ${item.done ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {item.done ? '✓' : '○'} {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Photo */}
            <Section title="Profile Photo" number={1}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm"><Upload className="mr-2 h-3.5 w-3.5" /> Upload Photo</Button>
                  <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG. Max 2MB.</p>
                </div>
              </div>
            </Section>

            {/* Basic Info */}
            <Section title="Basic Information" number={2}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                  <Input id="name" placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={v => setFormData({ ...formData, location: v })}>
                    <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                    <SelectContent>
                      {LOCATION_OPTIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell people about yourself and your work..." rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
              </div>
            </Section>

            {/* Skills */}
            <Section title="Skills" number={3}>
              <div className="flex gap-2 mb-4">
                <Select value={skillToAdd} onValueChange={addSkill}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Add a skill..." /></SelectTrigger>
                  <SelectContent>
                    {SKILL_OPTIONS.filter(s => !selectedSkills.includes(s)).map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map(skill => (
                  <Badge key={skill} className="bg-accent text-accent-foreground pr-1.5 gap-1 rounded-lg">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedSkills.length === 0 && (
                  <p className="text-sm text-muted-foreground">No skills added yet. Select from the dropdown above.</p>
                )}
              </div>
            </Section>

            {/* Work Details */}
            <Section title="Work Details" number={4}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input id="experience" type="number" placeholder="e.g., 5" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="price">Hourly Rate (₹)</Label>
                  <Input id="price" type="number" placeholder="e.g., 500" value={formData.pricePerHour} onChange={e => setFormData({ ...formData, pricePerHour: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border/40 mt-4">
                <div>
                  <p className="font-medium text-foreground text-sm">Available for work</p>
                  <p className="text-xs text-muted-foreground">Toggle your availability status</p>
                </div>
                <Switch checked={formData.availability} onCheckedChange={v => setFormData({ ...formData, availability: v })} />
              </div>
            </Section>

            <Button onClick={handleSave} className="w-full gradient-hero text-primary-foreground shadow-hero h-12 text-base" size="lg">
              <Save className="mr-2 h-5 w-5" /> Save Profile
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, number, children }: { title: string; number: number; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-card">
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-sm font-bold font-display">{number}</span>
      <h2 className="font-display font-bold text-foreground">{title}</h2>
    </div>
    {children}
  </div>
);

export default WorkerDashboard;
