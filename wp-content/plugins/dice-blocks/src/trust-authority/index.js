import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import { Check, Shield } from 'lucide-react';
import portrait from './jane-smith-front-portrait.jpg';

const BLOCK_CLASSES =
  'dice-block dice-block--trust py-20 md:py-24 lg:py-28 bg-white border-b border-gray-200';

const BlockContent = ({ blockProps }) => (
  <section {...blockProps}>
    <div className="dice-block--trust__container container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
      <div className="dice-block--trust__layout flex flex-col md:flex-row gap-6 md:gap-12 items-center">
        {/* Portrait */}
        <div className="dice-block--trust__portrait-wrap shrink-0 flex justify-center md:justify-start">
          <div className="dice-block--trust__portrait relative h-40 w-40 md:h-48 md:w-48">
            <div className="dice-block--trust__portrait-frame relative h-full w-full rounded-full overflow-hidden bg-muted ring-4 ring-border shadow-lg">
              <img
                src={portrait}
                alt="Jane Smith"
                className="dice-block--trust__portrait-image object-cover h-full w-full"
              />
            </div>
            <div className="dice-block--trust__verified-badge absolute bottom-2 right-2 md:bottom-3 md:right-3 w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-border">
			  <Check className="dice-block--trust__verified-icon w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="dice-block--trust__content flex-1 space-y-4 text-center md:text-left">
          <div className="dice-block--trust__header">
            <div className="dice-block--trust__title-row flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-2">
              <h3 className="dice-block--trust__name text-2xl md:text-3xl font-bold text-foreground">
                Jane Smith
              </h3>
              <div className="dice-block--trust__credential chip flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                <span className="dice-block--trust__credential-text text-sm font-bold text-primary">
                  CFP®
                </span>
              </div>
            </div>

            <p className="dice-block--trust__subtitle text-base md:text-lg text-muted-foreground leading-relaxed">
              Reviewed by Jane Smith, CFP® with 15+ years of advising California families.
            </p>
          </div>

          <div className="dice-block--trust__policy bg-muted/60 rounded-xl p-5">
            <div className="dice-block--trust__policy-inner space-y-2 text-left">
              <div className="dice-block--trust__policy-row flex items-center gap-2">
                <Shield className="dice-block--trust__policy-icon h-4 w-4 text-primary shrink-0" strokeWidth={2} />
                <h4 className="dice-block--trust__policy-title text-base font-bold text-foreground">
                  Editorial Policy
                </h4>
              </div>
              <p className="dice-block--trust__policy-text text-base text-muted-foreground leading-relaxed">
                We independently evaluate advisors based on licensing, fiduciary status, and client reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Edit = () => {
  const blockProps = useBlockProps({
    className: BLOCK_CLASSES,
  });
  return <BlockContent blockProps={blockProps} />;
};

const Save = () => {
  const blockProps = useBlockProps.save({
    className: BLOCK_CLASSES,
  });
  return <BlockContent blockProps={blockProps} />;
};

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
});
