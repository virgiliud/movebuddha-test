import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import { Mail, MapPin, Phone, Shield, User } from 'lucide-react';

const BLOCK_CLASSES =
	'dice-block dice-block--call-to-action py-20 md:py-24 lg:py-28 bg-muted/30';

const BlockContent = ({ blockProps }) => (
	<section {...blockProps}>
		<div className="dice-block--call-to-action__container container mx-auto px-4 md:px-6 lg:px-8">
			<div className="dice-block--call-to-action__inner max-w-4xl mx-auto">
				<div className="dice-block--call-to-action__header text-center mb-10 md:mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance tracking-tight">
						Find Your Advisor Today
					</h2>
				</div>

				<form className="dice-block--call-to-action__form space-y-6 bg-background rounded-2xl p-8 md:p-12 shadow-xl border border-border">
					<div className="dice-block--call-to-action__grid grid gap-6 md:grid-cols-2">
						<div className="dice-block--call-to-action__field space-y-2.5">
							<label htmlFor="dice-call-to-action-name" className="text-sm font-semibold text-foreground">
								Full Name
							</label>
							<div className="relative">
								<User
									className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
									aria-hidden="true"
								/>
								<input
									id="dice-call-to-action-name"
									type="text"
									placeholder="John Doe"
									required
									className="w-full pl-12 h-12 bg-muted/50 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 text-foreground placeholder:text-muted-foreground transition-all"
								/>
							</div>
						</div>

						<div className="dice-block--call-to-action__field space-y-2.5">
							<label htmlFor="dice-call-to-action-zip" className="text-sm font-semibold text-foreground">
								Zip Code
							</label>
							<div className="relative">
								<MapPin
									className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
									aria-hidden="true"
								/>
								<input
									id="dice-call-to-action-zip"
									type="text"
									placeholder="94102"
									required
									className="w-full pl-12 h-12 bg-muted/50 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 text-foreground placeholder:text-muted-foreground transition-all"
								/>
							</div>
						</div>
					</div>

					<div className="dice-block--call-to-action__field space-y-2.5">
						<label htmlFor="dice-call-to-action-email" className="text-sm font-semibold text-foreground">
							Email Address
						</label>
						<div className="relative">
							<Mail
								className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
								aria-hidden="true"
							/>
							<input
								id="dice-call-to-action-email"
								type="email"
								placeholder="john@example.com"
								required
								className="w-full pl-12 h-12 bg-muted/50 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 text-foreground placeholder:text-muted-foreground transition-all"
							/>
						</div>
					</div>

					<div className="dice-block--call-to-action__field space-y-2.5">
						<label htmlFor="dice-call-to-action-phone" className="text-sm font-semibold text-foreground">
							Phone Number
						</label>
						<div className="relative">
							<Phone
								className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
								aria-hidden="true"
							/>
							<input
								id="dice-call-to-action-phone"
								type="tel"
								placeholder="(555) 123-4567"
								required
								className="w-full pl-12 h-12 bg-muted/50 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 text-foreground placeholder:text-muted-foreground transition-all"
							/>
						</div>
					</div>

					<button
						type="submit"
						className="dice-block--call-to-action__submit w-full text-base md:text-lg h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg hover:shadow-xl transition-all rounded-lg"
					>
						Get Free Matches
					</button>

					<div className="dice-block--call-to-action__disclaimer flex items-center justify-center gap-2.5 pt-2">
						<Shield className="h-5 w-5 text-accent" aria-hidden="true" />
						<p className="text-sm text-muted-foreground text-center">
							Free. No obligation. We never share your info without consent.
						</p>
					</div>
				</form>
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
