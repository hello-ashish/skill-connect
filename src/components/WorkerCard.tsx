import { Star, Heart, MapPin, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
      className="bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <img
            src={worker.profileImage}
            alt={worker.name}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-border"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground truncate">{worker.name}</h3>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className="shrink-0 ml-2"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
                />
              </button>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
              <span className="text-sm font-medium text-foreground">{worker.rating}</span>
              <span className="text-sm text-muted-foreground">({worker.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {worker.location}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {worker.skills.map(skill => (
            <Badge key={skill} variant="secondary" className="text-xs bg-accent text-accent-foreground">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-primary font-display font-bold">
            <IndianRupee className="h-4 w-4" />
            {worker.pricePerHour}/hr
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${worker.availability ? 'bg-green-500' : 'bg-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">
              {worker.availability ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
