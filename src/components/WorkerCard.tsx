import { Star, Heart, MapPin, IndianRupee, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Worker } from '@/types';

interface WorkerCardProps {
  worker: Worker;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const WorkerCard = ({ worker, isFavorite, onToggleFavorite, onClick }: WorkerCardProps) => {
  return (
    <div
      className="bg-card rounded-2xl border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={worker.profileImage}
              alt={worker.name}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-border/50"
            />
            {worker.availability && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-foreground truncate text-[15px]">{worker.name}</h3>
                <Shield className="h-3.5 w-3.5 text-primary shrink-0" />
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className="shrink-0 ml-2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
                />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                <span className="font-medium text-foreground">{worker.rating}</span>
                <span className="text-muted-foreground">({worker.reviewCount})</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {worker.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {worker.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="secondary" className="text-xs bg-accent text-accent-foreground font-medium rounded-md px-2.5 py-0.5">
              {skill}
            </Badge>
          ))}
          {worker.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground rounded-md px-2.5 py-0.5">
              +{worker.skills.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1 text-primary font-display font-bold text-lg">
            <IndianRupee className="h-4 w-4" />
            {worker.pricePerHour}
            <span className="text-xs font-normal text-muted-foreground">/hr</span>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${worker.availability ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${worker.availability ? 'bg-green-500' : 'bg-muted-foreground'}`} />
            {worker.availability ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
