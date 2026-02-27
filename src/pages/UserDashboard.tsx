import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { mockWorkers } from '@/data/mockWorkers';
import { SKILL_OPTIONS, LOCATION_OPTIONS } from '@/types';
import WorkerCard from '@/components/WorkerCard';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredWorkers = useMemo(() => {
    return mockWorkers.filter((worker) => {
      const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSkill = selectedSkill === 'all' || worker.skills.includes(selectedSkill);
      const matchesLocation = selectedLocation === 'all' || worker.location === selectedLocation;
      const matchesPrice = worker.pricePerHour >= priceRange[0] && worker.pricePerHour <= priceRange[1];
      return matchesSearch && matchesSkill && matchesLocation && matchesPrice;
    });
  }, [searchQuery, selectedSkill, selectedLocation, priceRange]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center h-16 px-4 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-display font-bold text-primary shrink-0">
            Apni<span className="text-secondary">Job</span>
          </Link>
          <div className="flex-1 max-w-md ml-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={`shrink-0 ${showFilters ? 'bg-accent border-primary/30' : ''}`}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-card rounded-2xl border border-border/60 p-6 grid sm:grid-cols-3 gap-6 shadow-card">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Skill</label>
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger><SelectValue placeholder="All Skills" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      {SKILL_OPTIONS.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger><SelectValue placeholder="All Locations" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {LOCATION_OPTIONS.map(l => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price: ₹{priceRange[0]} – ₹{priceRange[1]}/hr
                  </label>
                  <Slider
                    min={0}
                    max={1500}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-3"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredWorkers.length}</span> workers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkers.map((worker, i) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <WorkerCard
                worker={worker}
                isFavorite={favorites.includes(worker.id)}
                onToggleFavorite={() => toggleFavorite(worker.id)}
                onClick={() => navigate(`/worker/${worker.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No workers found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
