import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import { Check, Shield } from 'lucide-react';
import portrait from './jane-smith-front-portrait.jpg';

const BLOCK_CLASSES =
	'dice-block dice-block--trust py-20 md:py-24 lg:py-28 bg-background';

const BlockContent = ({ blockProps }) => (
	<section {...blockProps}>
		<div className="dice-block--trust__container container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
			<div className="dice-block--trust__layout flex flex-col md:flex-row gap-10 md:gap-12 items-center md:items-start">
				{ /* Portrait */}
				<div className="dice-block--trust__portrait-wrap shrink-0 flex justify-center md:justify-start">
					<div className="dice-block--trust__portrait relative h-44 w-44 md:h-48 md:w-48">
						<div className="dice-block--trust__portrait-frame relative h-full w-full rounded-full overflow-hidden bg-card ring-4 ring-border shadow-xl">
							<img
								src={portrait}
								alt="Jane Smith"
								className="dice-block--trust__portrait-image object-cover h-full w-full"
							/>
						</div>
						<div className="dice-block--trust__verified-badge absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-border">
							<Check
								className="dice-block--trust__verified-icon w-5 h-5 text-white"
								strokeWidth={3}
							/>
						</div>
					</div>
				</div>

				{ /* Content */}
				<div className="dice-block--trust__content flex-1 space-y-6">
					<div className="dice-block--trust__header">
						<div className="dice-block--trust__title-row flex items-center gap-3 mb-3">
							<h3 className="dice-block--trust__name text-2xl md:text-3xl font-bold text-foreground">
								Jane Smith
							</h3>
							<div className="dice-block--trust__credential chip flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
								<span className="dice-block--trust__credential-text text-sm font-bold text-primary">
									CFP®
								</span>
							</div>
						</div>

						<p className="dice-block--trust__subtitle text-base md:text-lg text-muted-foreground leading-relaxed">
							Reviewed by Jane Smith, CFP® with 15+ years of
							advising California families.
						</p>
					</div>

					<div className="dice-block--trust__policy bg-muted/50 border-2 border-border rounded-xl p-5 shadow-sm">
						<div className="dice-block--trust__policy-row flex items-start gap-4">
							<Shield
								className="dice-block--trust-authority__policy-icon h-6 w-6 text-primary shrink-0 mt-0.5"
								strokeWidth={2}
							/>
							<div className="dice-block--trust__policy-content">
								<h4 className="dice-block--trust__policy-title text-base font-bold text-foreground mb-2">
									Editorial Policy
								</h4>
								<p className="dice-block--trust__policy-text text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
									We independently evaluate advisors based on
									licensing, fiduciary status, and client
									reviews.
								</p>
							</div>
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
