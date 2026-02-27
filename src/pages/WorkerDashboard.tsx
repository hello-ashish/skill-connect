import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center h-16 px-4 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-display font-bold text-primary">
            Apni<span className="text-secondary">Job</span>
          </Link>
          <div className="ml-auto">
            <Button onClick={handleSave} className="gradient-hero text-primary-foreground">
              <Save className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Worker Profile</h1>
          <p className="text-muted-foreground mb-8">Create your profile to get discovered by people who need your skills.</p>

          <div className="space-y-8">
            {/* Profile Photo */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-bold text-foreground mb-4">Profile Photo</h2>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm">Upload Photo</Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB.</p>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-4">
              <h2 className="font-display font-bold text-foreground mb-2">Basic Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={v => setFormData({ ...formData, location: v })}>
                    <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                    <SelectContent>
                      {LOCATION_OPTIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell people about yourself and your work..." rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
              </div>
            </div>

            {/* Skills */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-bold text-foreground mb-4">Skills *</h2>
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
                  <Badge key={skill} className="bg-accent text-accent-foreground pr-1.5 gap-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedSkills.length === 0 && (
                  <p className="text-sm text-muted-foreground">No skills added yet. Select from the dropdown above.</p>
                )}
              </div>
            </div>

            {/* Work Details */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-4">
              <h2 className="font-display font-bold text-foreground mb-2">Work Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input id="experience" type="number" placeholder="e.g., 5" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="price">Hourly Rate (₹)</Label>
                  <Input id="price" type="number" placeholder="e.g., 500" value={formData.pricePerHour} onChange={e => setFormData({ ...formData, pricePerHour: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">Available for work</p>
                  <p className="text-sm text-muted-foreground">Toggle your availability status</p>
                </div>
                <Switch checked={formData.availability} onCheckedChange={v => setFormData({ ...formData, availability: v })} />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full gradient-hero text-primary-foreground shadow-hero" size="lg">
              <Save className="mr-2 h-5 w-5" /> Save Profile
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
