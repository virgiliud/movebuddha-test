import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

const BLOCK_CLASSES =
	'dice-block dice-block--faqs py-20 md:py-24 lg:py-28 bg-white';

const FAQ_ITEMS = [
	{
		id: 'moving-costs',
		question: 'How much do movers cost in California?',
		answer:
			'Local moves typically range from $500 to $2,500 depending on the size of your home and the number of movers required. Long-distance moves are priced by weight and mileage, so request an in-home estimate for the most accurate quote.',
	},
	{
		id: 'booking-window',
		question: 'How far in advance should I book a moving company?',
		answer:
			'We recommend booking four to six weeks ahead for peak summer dates and at least two weeks in advance for off-season moves. Booking early secures your preferred movers and date.',
	},
	{
		id: 'licenses-insurance',
		question: 'Are the movers you recommend licensed and insured?',
		answer:
			'Yes. We only partner with movers that are properly licensed with the California Public Utilities Commission and maintain active insurance policies that protect your belongings.',
	},
	{
		id: 'estimate-types',
		question: 'What is the difference between binding and non-binding estimates?',
		answer:
			'Binding estimates guarantee the total cost of the move as long as the inventory does not change. Non-binding estimates are based on the mover\'s best guess and the final price can change depending on the actual weight and services provided.',
	},
	{
		id: 'packing-services',
		question: 'Do movers help with packing and unpacking?',
		answer:
			'Most full-service movers offer professional packing, unpacking, and specialty item handling for an additional fee. Be sure to discuss your needs during the quote process so they can include it in your estimate.',
	},
];

const BlockContent = ({ blockProps }) => {


	return (
		<section {...blockProps}>
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<div className="mb-12 md:mb-16 text-center">
						<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance tracking-tight">
							Frequently Asked Questions
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
							Common questions about hiring moving companies in California
						</p>
					</div>

					<div className="space-y-4" data-faqs-list>
						{FAQ_ITEMS.map((faq) => (
							<details
								key={faq.id}
								className="bg-background border-2 border-border rounded-xl px-6 md:px-8 group transition-all duration-200 hover:bg-accent/5 hover:border-accent/40 hover:shadow-md open:hover:bg-background open:hover:border-border open:hover:shadow-none"
								data-faqs-item
							>
								<summary
									className="text-left text-base md:text-lg font-semibold text-foreground py-5 md:py-6 cursor-pointer list-none flex items-center justify-between gap-4"
									data-faqs-toggle
								>
									<span className="flex-1">{faq.question}</span>
									<svg
										className="dice-block--faqs__icon w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										data-faqs-icon
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</summary>
								<div
									id={`dice-faqs-${faq.id}`}
									className="text-base md:text-lg text-muted-foreground leading-relaxed pb-5 md:pb-6 pt-2"
									data-faqs-content
								>
									{faq.answer}
								</div>
							</details>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

const Edit = () => {
	const blockProps = useBlockProps({
		className: BLOCK_CLASSES,
		'data-dice-faqs': true,
	});

	return <BlockContent blockProps={blockProps} />;
};

const Save = () => {
	const blockProps = useBlockProps.save({
		className: BLOCK_CLASSES,
		'data-dice-faqs': true,
	});

	return <BlockContent blockProps={blockProps} />;
};

registerBlockType(metadata.name, {
	...metadata,
	edit: Edit,
	save: Save,
});
