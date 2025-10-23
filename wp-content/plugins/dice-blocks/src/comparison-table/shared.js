import { Star, Briefcase, Square, MapPin, Award, DollarSign, Target, CheckSquare, ArrowRight, Truck } from 'lucide-react';
import { movers } from './config';

const StarRating = ({ rating }) => (

<div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-base font-bold text-foreground">{rating}</span>
        <span className="text-xs text-muted-foreground">Rating</span>
      </div>
    </div>
);

// Base classes reused by both variants
const baseToggle =
  'inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors cursor-pointer border bg-background text-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground';

const mobileToggle = `${baseToggle} w-full rounded-md h-9 px-3 hover:bg-muted/30`;
const desktopToggle = `${baseToggle} w-full rounded-lg h-10 px-4 md:border-2 hover:bg-muted/30 data-[selected=true]:shadow-sm`;

export const ComparisonTable = ({
  blockProps,
  selectedMovers = [],
  onToggleMover,
  onClearAll,
  isInteractive = false,
  showSelectionTray = true,
}) => {
  const isTrayVisible = selectedMovers.length > 0;

  return (
    <section {...blockProps} data-comparison-table>
      <section className="py-20 md:py-24 lg:py-28 bg-muted/30 relative">
        <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance tracking-tight">Featured Moving Companies</h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">Compare top-rated licensed movers across California</p>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {movers.map((m) => {
              const isSelected = selectedMovers.includes(m.id);
              return (
                <div
                  key={m.id}
                  data-mover-card={m.id}
                  data-selected={isSelected}
                  className={`bg-card border-2 rounded-xl p-6 space-y-4 transition-all duration-200 ${
                    isSelected ? 'border-accent shadow-lg ring-2 ring-accent/20' : 'border-border hover:shadow-md hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">{m.name}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{m.location}</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div><span className="text-muted-foreground">Services: </span><span className="text-foreground">{m.services}</span></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div><span className="text-muted-foreground">Specialty: </span><span className="text-foreground">{m.specialty}</span></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div className="flex flex-col"><span className="font-semibold text-foreground">{m.pricing}</span><span className="text-xs text-muted-foreground">{m.minimum}</span></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <StarRating rating={m.rating} />
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors h-9 px-3 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">Visit Site</button>

                    <button
                      type="button"
                      data-compare-toggle
                      data-mover-id={m.id}
                      data-selected={isSelected}
                      className={mobileToggle}
                      onClick={isInteractive ? () => onToggleMover?.(m.id) : undefined}
                      aria-pressed={isSelected}
                    >
                      <span data-selected-variant className={isSelected ? '' : 'hidden'}><CheckSquare className="h-4 w-4" /></span>
                      <span data-unselected-variant className={isSelected ? 'hidden' : ''}><Square className="h-4 w-4" /></span>
                      <span>Compare</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto overscroll-x-contain rounded-t-xl border border-border shadow-lg [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-muted/50 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/50">
            <div className="min-w-[1200px]">
              <div className="flex items-center bg-muted border-b-2 border-border">
                <div className="flex-1 py-5 px-6 text-left text-sm font-bold text-foreground tracking-wide min-w-[180px]"><div className="flex items-center gap-2.5"><Briefcase className="h-4 w-4 text-accent" />Company</div></div>
                <div className="flex-1 py-5 px-6 text-left text-sm font-bold text-foreground tracking-wide min-w-[130px]"><div className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-accent" />Location</div></div>
                <div className="flex-1 py-5 px-6 text-left text-sm font-bold text-foreground tracking-wide min-w-[180px]"><div className="flex items-center gap-2.5"><Award className="h-4 w-4 text-accent" />Services</div></div>
                <div className="flex-1 py-5 px-6 text-left text-sm font-bold text-foreground tracking-wide min-w-[130px]"><div className="flex items-center gap-2.5"><Target className="h-4 w-4 text-accent" />Specialty</div></div>
                <div className="flex-1 py-5 px-6 text-left text-sm font-bold text-foreground tracking-wide min-w-[130px]"><div className="flex items-center gap-2.5"><DollarSign className="h-4 w-4 text-accent" />Pricing</div></div>
                <div className="flex-1 py-5 px-6 text-left text-sm font-bold text-foreground tracking-wide min-w-[100px]"><div className="flex items-center gap-2.5"><Star className="h-4 w-4 text-accent" />Rating</div></div>
                <div className="py-5 px-6 sticky right-0 z-10 min-w-[175px] lg:min-w-[220px] bg-muted self-stretch flex items-center border-l-2 border-border overflow-hidden shadow-[-8px_0_16px_-4px_rgba(0,0,0,0.08)]"><span className="text-sm font-bold text-foreground tracking-wide">Actions</span></div>
              </div>

              <div className="bg-white">
                {movers.map((m, i) => {
                  const isSelected = selectedMovers.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      data-mover-row={m.id}
                      data-selected={isSelected}
                      className={`flex items-center transition-all duration-200 ${
                        isSelected ? 'bg-accent/10' : 'hover:bg-accent/5'
                      } ${i === movers.length - 1 ? '' : 'border-b border-border'}`}
                    >
                      <div className="flex-1 py-6 px-6 min-w-[180px]"><span className="font-semibold text-foreground text-base">{m.name}</span></div>
                      <div className="flex-1 py-6 px-6 text-muted-foreground min-w-[130px]">{m.location}</div>
                      <div className="flex-1 py-6 px-6 text-muted-foreground text-sm min-w-[180px]">{m.services}</div>
                      <div className="flex-1 py-6 px-6 text-muted-foreground text-sm min-w-[130px]">{m.specialty}</div>
                      <div className="flex-1 py-6 px-6 min-w-[130px]"><div className="flex flex-col gap-0.5"><span className="font-semibold text-foreground">{m.pricing}</span><span className="text-xs text-muted-foreground">{m.minimum}</span></div></div>
                      <div className="flex-1 py-6 px-6 min-w-[100px]"><StarRating rating={m.rating} /></div>

                      <div className="py-6 px-6 sticky right-0 z-10 min-w-[175px] lg:min-w-[220px] bg-card border-l-2 border-border overflow-hidden shadow-[-8px_0_16px_-4px_rgba(0,0,0,0.08)]">
                        <div className="flex flex-col gap-2.5">
                          <button className="w-full inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer shadow-sm hover:shadow-md">Visit Site</button>

                          <button
                            type="button"
                            data-compare-toggle
                            data-mover-id={m.id}
                            data-selected={isSelected}
                            className={desktopToggle}
                            onClick={isInteractive ? () => onToggleMover?.(m.id) : undefined}
                            aria-pressed={isSelected}
                          >
                            <span data-selected-variant className={isSelected ? '' : 'hidden'}><CheckSquare className="h-4 w-4" /></span>
                            <span data-unselected-variant className={isSelected ? 'hidden' : ''}><Square className="h-4 w-4" /></span>
                            <span>Compare</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selection tray */}
        {showSelectionTray && (
          <div
            data-comparison-tray
            className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 sticky bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500 ease-out"
            hidden={!isTrayVisible}
          >
            <div className="mx-auto bg-background border-t-2 border-border shadow-lg py-4 md:py-5 px-4 md:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-3 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <Truck className="hidden md:block h-7 w-7 text-primary animate-pulse" strokeWidth="2" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    <span className="font-bold" data-selected-count>{selectedMovers.length}</span>{' '}
                    <span data-selected-noun>{selectedMovers.length === 1 ? 'Company' : 'Companies'}</span>{' '}Selected
                  </h3>
                  <button onClick={isInteractive ? onClearAll : undefined} data-clear-selection className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">Clear All</button>
                </div>

                <button
                  data-compare-button
                  className="inline-flex items-center justify-center rounded-lg text-sm md:text-base font-semibold transition-all h-11 md:h-12 px-6 md:px-8 shadow-lg hover:shadow-xl bg-accent text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <span className="hidden sm:inline">Compare Now</span>
                  <span className="sm:hidden">Compare</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};