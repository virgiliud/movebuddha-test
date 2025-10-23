import './editor.css';

import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	LinkControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	Popover,
	TextControl,
	Tooltip,
	Icon,
} from '@wordpress/components';
import { useState, useRef, Fragment } from '@wordpress/element';
import { link as linkIcon, image as imageIcon } from '@wordpress/icons';
import { Trophy } from 'lucide-react';
import heroFallback from './hero-moving-professionals.jpg';

const BLOCK_CLASSES =
	'dice-block dice-block--hero relative bg-background py-12 md:py-20 lg:py-24';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
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

	const blockProps = useBlockProps({ className: BLOCK_CLASSES });

	// Inline link popover state
	const [isLinkOpen, setIsLinkOpen] = useState(false);
	const linkBtnRef = useRef(null);

	const imgSrc = imageUrl || heroFallback;
	const imgAlt = imageAlt || '';

	return (
		<>
			<InspectorControls>
				<PanelBody title="Featured In" initialOpen>
					<Flex direction="column" gap={4}>
						{ /* FULL-WIDTH label field — no extra BaseControl needed */}
						<Flex
							align="center"
							justify="space-between"
							gap={2}
							expanded
						>
							<FlexBlock>
								<TextControl
									label="Label"
									value={featuredLabel}
									onChange={(val) =>
										setAttributes({ featuredLabel: val })
									}
									__nextHasNoMarginBottom
								/>
							</FlexBlock>
						</Flex>

						{ /* Items list — compact margins, button centered with input */}
						<div className="dice-hero__items">
							{(featuredItems || []).map((item, i) => (
								<BaseControl
									key={i}
									label={`Item ${i + 1}`}
									className="dice-hero__item-control"
								>
									<Flex
										align="center"
										justify="space-between"
										gap={2}
										expanded
									>
										<FlexBlock>
											<TextControl
												/* no label here so input defines the row height */
												label={undefined}
												value={item?.text || ''}
												onChange={(val) => {
													const next = [
														...featuredItems,
													];
													next[i] = { text: val };
													setAttributes({
														featuredItems: next,
													});
												}}
												__nextHasNoMarginBottom
											/>
										</FlexBlock>

										<FlexItem>
											<Button
												variant="link"
												isDestructive
												onClick={() =>
													setAttributes({
														featuredItems:
															featuredItems.filter(
																(_, idx) =>
																	idx !== i
															),
													})
												}
												aria-label={`Remove ${item?.text || 'item'
													}`}
												className="dice-hero__remove-btn"
											>
												Remove
											</Button>
										</FlexItem>
									</Flex>
								</BaseControl>
							))}
						</div>

						<Flex align="center" justify="flex-start" gap={2}>
							<FlexItem>
								<Button
									variant="secondary"
									onClick={() =>
										setAttributes({
											featuredItems: [
												...(featuredItems || []),
												{ text: 'New outlet' },
											],
										})
									}
								>
									+ Add item
								</Button>
							</FlexItem>
						</Flex>
					</Flex>
				</PanelBody>
			</InspectorControls>

			<section {...blockProps}>
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
						{ /* Left Column */}
						<div className="flex flex-col gap-6 lg:gap-8">
							<div className="flex flex-col-reverse gap-3">
								<div className="space-y-4">
									{ /* Always H2 */}
									<h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1] text-foreground">
										<RichText
											tagName="span"
											value={title}
											onChange={(val) =>
												setAttributes({ title: val })
											}
											placeholder="Add a headline…"
											allowedFormats={[
												'core/bold',
												'core/italic',
											]}
										/>
									</h2>

									<RichText
										tagName="p"
										value={description}
										onChange={(val) =>
											setAttributes({
												description: val,
											})
										}
										placeholder="Add a supporting paragraph..."
										className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
									/>
								</div>

								<h3 className="inline-flex items-center gap-2.5 text-sm md:text-base font-bold text-accent uppercase tracking-wider w-fit">
									<Trophy
										className="w-5 h-5 md:w-6 md:h-6"
										strokeWidth={2.5}
									/>
									<RichText
										tagName="span"
										value={badgeText}
										onChange={(val) =>
											setAttributes({ badgeText: val })
										}
										placeholder="Badge text"
										className="text-sm md:text-base lg:text-lg"
										allowedFormats={[]}
									/>
								</h3>
							</div>

							{ /* CTA + inline “Edit link” control (WP UI only) */}
							<div className="dice-hero__cta-row">
								<a
									className="dice-hero__button inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full md:w-auto text-base !no-underline md:text-lg px-8 py-4 bg-primary hover:bg-primary/90 !text-primary-foreground !cursor-text"
									href={buttonUrl || undefined}
									target={
										buttonOpensInNewTab
											? '_blank'
											: undefined
									}
									rel={
										buttonOpensInNewTab
											? 'noopener noreferrer'
											: undefined
									}
									onClick={(e) => e.preventDefault()}
								>
									<RichText
										tagName="span"
										value={buttonText}
										onChange={(val) =>
											setAttributes({ buttonText: val })
										}
										placeholder="Button text"
										allowedFormats={[]}
									/>
								</a>

								<Tooltip text="Change link">
									<Button
										ref={linkBtnRef}
										onClick={() =>
											setIsLinkOpen((v) => !v)
										}
										variant="tertiary"
										aria-label="Change link"
										className="dice-hero__edit-link-btn"
									>
										<Icon icon={linkIcon} />
										<span className="dice-hero__edit-link-text">
											Edit link
										</span>
									</Button>
								</Tooltip>

								{isLinkOpen && (
									<Popover
										anchor={linkBtnRef?.current}
										placement="bottom-start"
										onClose={() => setIsLinkOpen(false)}
										focusOnMount
										offset={8}
										__unstableForcePortal
									>
										<div className="dice-hero__link-popover">
											<LinkControl
												value={{
													url: buttonUrl || '',
													opensInNewTab:
														!!attributes.buttonOpensInNewTab,
												}}
												onChange={(val) =>
													setAttributes({
														buttonUrl:
															val?.url || '',
														buttonOpensInNewTab:
															!!val?.opensInNewTab,
													})
												}
												settings={[
													{
														id: 'opensInNewTab',
														title: 'Open in new tab',
													},
												]}
											/>
										</div>
									</Popover>
								)}
							</div>

							{/* Featured In / Trust Badges */}
							<div className="dice-hero__featured-in flex items-center gap-4 pt-2">
								<RichText
									tagName="span"
									value={featuredLabel}
									onChange={(val) => setAttributes({ featuredLabel: val })}
									placeholder="Featured in:"
									className="text-xs lg:text-sm xl:text-sm text-muted-foreground whitespace-nowrap shrink-0"
									allowedFormats={[]}
								/>

								<div className="flex items-center gap-3 flex-wrap">
									{(featuredItems || []).map((item, i) => (
										<Fragment key={i}>
											<RichText
												tagName="div"
												value={item?.text || ''}
												onChange={(val) => {
													const next = [...featuredItems];
													next[i] = { text: val };
													setAttributes({ featuredItems: next });
												}}
												placeholder="Outlet"
												className="text-xl xl:text-2xl text-foreground"
												allowedFormats={[]}
											/>
											{i < (featuredItems?.length || 0) - 1 && (
												<div className="w-1 h-1 rounded-full bg-accent" />
											)}
										</Fragment>
									))}
								</div>
							</div>

						</div>

						{ /* Right Column - Image (Click opens media library) */}
						<div className="relative aspect-[4/3] lg:aspect-square overflow-hidden shadow-xl bg-muted dice-hero__image-wrap">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) =>
										setAttributes({
											imageUrl: media?.url || '',
											imageAlt:
												media?.alt ||
												media?.title ||
												'',
										})
									}
									allowedTypes={['image']}
									render={({ open }) => (
										<div
											className="dice-hero__image-click"
											onClick={open}
											role="button"
											tabIndex={0}
											onKeyDown={(e) => {
												if (
													e.key === 'Enter' ||
													e.key === ' '
												) {
													e.preventDefault();
													open();
												}
											}}
										>
											<img
												src={imgSrc}
												alt={imgAlt}
												className="dice-hero__image"
											/>

											{ /* Editor UI overlay (styled via editor.css classes, no Tailwind here) */}
											<div className="dice-hero__overlay">
												<div className="dice-hero__overlay-chip">
													<Icon
														icon={imageIcon}
														className="dice-hero__overlay-icon"
													/>
													<span className="dice-hero__overlay-text">
														Change image
													</span>
												</div>
											</div>
										</div>
									)}
								/>
							</MediaUploadCheck>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
