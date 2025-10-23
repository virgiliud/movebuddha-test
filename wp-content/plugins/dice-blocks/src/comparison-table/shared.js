import { Star, Square, MapPin, Award, DollarSign, Target, CheckSquare, ArrowRight } from 'lucide-react';
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

// selected => bg-accent + border-accent + text-white
const baseToggle =
  'inline-flex items-center justify-center gap-2 text-sm font-medium transition-all cursor-pointer border-2 border-input bg-background text-foreground hover:bg-muted/30 data-[selected=true]:bg-accent data-[selected=true]:border-accent data-[selected=true]:text-white data-[selected=true]:shadow-sm';

// MOBILE: no w-full; keep natural size on the right
const mobileToggle = `${baseToggle} rounded-lg h-9 px-4 shrink-0 whitespace-nowrap`;
// DESKTOP stays the same width pattern as before
const desktopToggle = `${baseToggle} w-full rounded-lg py-2.5 px-4`;

export const ComparisonTable = ({ blockProps }) => {
  return (
    <section {...blockProps} data-comparison-table>
      <section className="pt-20 pb-15 md:pt-24 md:pb-19 lg:pt-28 lg:pb-23 bg-background relative">
        <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance tracking-tight">
              Featured Moving Companies
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Compare top-rated licensed movers across California
            </p>
          </div>

          <div className="relative">
            <div className="mb-5">
              {/* Mobile Cards (show until lg) */}
              <div className="lg:hidden space-y-4">
                {movers.map((m) => (
                  <div
                    key={m.id}
                    data-mover-card={m.id}
                    data-selected="false"
                    className="bg-card border-2 rounded-xl p-6 space-y-4 transition-all duration-200 border-border hover:shadow-md hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      {/* Title column: allow truncation instead of squish */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground mb-1 truncate">{m.name}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{m.location}</span>
                        </div>
                      </div>

                      {/* compare toggle (MOBILE) — fixed width, stays on right */}
                      <label
                        data-compare-toggle
                        data-mover-id={m.id}
                        data-selected="false"
                        className={mobileToggle}
                        aria-pressed="false"
                      >
                        <span data-selected-variant className="hidden"><CheckSquare className="h-4 w-4" /></span>
                        <span data-unselected-variant><Square className="h-4 w-4" /></span>
                        <span>Compare</span>
                      </label>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="text-muted-foreground">Services: </span>
                          <span className="text-foreground">{m.services}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="text-muted-foreground">Specialty: </span>
                          <span className="text-foreground">{m.specialty}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{m.pricing}</span>
                          <span className="text-xs text-muted-foreground">{m.minimum}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <StarRating rating={m.rating} />
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                        Get Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table (only at lg and up) */}
              <div className="hidden lg:block bg-card rounded-2xl border-2 border-border overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 gap-6 px-6 py-4 bg-muted border-b-2 border-border">
                  <div className="col-span-3 text-sm font-bold text-foreground">Company</div>
                  <div className="col-span-2 text-sm font-bold text-foreground">Rating</div>
                  <div className="col-span-3 text-sm font-bold text-foreground">Services & Specialty</div>
                  <div className="col-span-2 text-sm font-bold text-foreground">Pricing</div>
                  <div className="col-span-2 text-sm font-bold text-foreground">Action</div>
                </div>

                {/* Rows */}
                {movers.map((m, index) => (
                  <div
                    key={m.id}
                    data-mover-row={m.id}
                    data-selected="false"
                    className={`grid grid-cols-12 gap-6 px-6 py-6 items-center transition-colors hover:bg-muted/30 data-[selected=true]:bg-accent/20 ${index !== movers.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="col-span-3">
                      <h3 className="text-base font-bold text-foreground mb-1">{m.name}</h3>
                      <p className="text-sm text-muted-foreground">{m.location}</p>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-accent text-accent" />
                        <span className="text-lg font-bold text-foreground">{m.rating}</span>
                      </div>
                    </div>

                    <div className="col-span-3 space-y-1">
                      <p className="text-sm text-foreground">{m.services}</p>
                      <p className="text-sm text-muted-foreground">{m.specialty}</p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-base font-bold text-foreground">{m.pricing}</p>
                      <p className="text-xs text-muted-foreground">{m.minimum}</p>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm">
                        Get Quote
                      </button>

                      <label
                        data-compare-toggle
                        data-mover-id={m.id}
                        data-selected="false"
                        className={desktopToggle}
                        aria-pressed="false"
                      >
                        <span data-selected-variant className="hidden"><CheckSquare className="h-4 w-4" /></span>
                        <span data-unselected-variant><Square className="h-4 w-4" /></span>
                        <span>Compare</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection tray — always mounted; visibility toggled by view.js */}
            <div
              data-comparison-tray
              className="sticky bottom-2 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-500 ease-out"
              hidden
            >
              <div className="mx-auto max-w-7xl">
                <div className="bg-background border-2 border-border rounded-2xl shadow-xl py-4 px-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-6 w-6 text-primary animate-pulse"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                        <path d="M15 18H9" />
                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                        <circle cx="17" cy="18" r="2" />
                        <circle cx="7" cy="18" r="2" />
                      </svg>
                      <h3 className="text-base font-semibold text-foreground">
                        <span className="font-bold text-accent" data-selected-count>0</span>{' '}
                        <span data-selected-noun>Companies</span> Selected
                      </h3>
                      <button
                        data-clear-selection
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium"
                      >
                        Clear All
                      </button>
                    </div>

                    <button
                      data-compare-button
                      disabled
                      className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all h-10 px-6 shadow-lg hover:shadow-xl
                                 bg-primary text-primary-foreground
                                 disabled:bg-primary/50 disabled:text-primary-foreground/50 disabled:cursor-not-allowed"
                    >
                      Compare Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /tray */}
          </div>
        </div>
      </section>
    </section>
  );
};
