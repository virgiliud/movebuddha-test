import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { Trophy, ArrowRight } from 'lucide-react';
import heroFallback from './hero-moving-professionals.jpg';

const BLOCK_CLASSES =
  'dice-block dice-block--hero relative bg-background py-12 md:py-20 lg:py-24';

export default function save(props) {
  const { attributes } = props;
  const {
    title,
    description,
    badgeText,
    buttonText,
    buttonUrl,
    buttonOpensInNewTab,
    featuredLabel,
    featuredItems,
    imageUrl,
    imageAlt,
  } = attributes;

  const blockProps = useBlockProps.save({ className: BLOCK_CLASSES });

  return (
    <section {...blockProps}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col-reverse gap-3">
              <div className="space-y-4">
                <RichText.Content
                  tagName="h2"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1] text-foreground"
                  value={title}
                />
                <RichText.Content
                  tagName="p"
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
                  value={description}
                />
              </div>

              <h3 className="inline-flex items-center gap-2.5 text-sm md:text-base font-bold !text-accent uppercase tracking-wider w-fit">
                <Trophy className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                <RichText.Content
                  tagName="span"
                  className="text-sm md:text-base lg:text-lg"
                  value={badgeText}
                />
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <a
                className="dice-hero__button inline-flex items-center justify-center transition-colors gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full md:w-auto text-base !no-underline md:text-lg px-8 py-4 bg-primary hover:bg-primary/90 !text-primary-foreground cursor-pointer"
                href={buttonUrl || undefined}
                target={buttonOpensInNewTab ? '_blank' : undefined}
                rel={buttonOpensInNewTab ? 'noopener noreferrer' : undefined}
              >
                <RichText.Content value={buttonText} />
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Featured In */}
              <div className="dice-hero__featured-in flex items-center gap-4 pt-2">
                <RichText.Content
                  tagName="span"
                  className="text-xs lg:text-sm xl:text-sm text-muted-foreground whitespace-nowrap shrink-0"
                  value={featuredLabel}
                />

                <div className="flex items-center gap-3 flex-wrap">
                  {(featuredItems || []).map((item, i) => (
                    <Fragment key={i}>
                      <div
                        className="text-xl xl:text-2xl font-semibold text-foreground"
                      >
                        {item?.text || ''}
                      </div>
                      {i < (featuredItems?.length || 0) - 1 && (
                        <div className="w-1 h-1 rounded-full bg-accent" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="dice-hero__image-wrap relative aspect-[4/3] lg:aspect-square shadow-xl overflow-hidden bg-muted">
            <img
              src={imageUrl || heroFallback}
              alt={imageAlt || ''}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
