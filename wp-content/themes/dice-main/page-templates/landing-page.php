<?php
	/**
	 * Template Name: Landing Page
	 * Template Post Type: page
	 *
	 * Landing page template that without standard container wrapper and heading output.
	 *
	 * @package Dice
	 */

	declare (strict_types = 1);

	get_header();
?>

<main id="primary">
<?php
while ( have_posts() ) :
	the_post();
	the_content();
	endwhile;

	$page_id   = get_queried_object_id();
	$page_url  = $page_id ? get_permalink( $page_id ) : home_url( '/' );
	$home_url  = trailingslashit( home_url() );
	$site_name = get_bloginfo( 'name' );

	$theme_uri = get_template_directory_uri();

	$hero_image_url        = $theme_uri . '/assets/static/moving-team-illustration.svg';
	$advisor_image_url     = $theme_uri . '/assets/static/jane-smith-front-portrait.jpg';
	$organization_logo_url = $theme_uri . '/assets/static/movebuddha-logo.png';

	$organization_id = $home_url . '#organization';
	$website_id      = $home_url . '#website';
	$webpage_id      = trailingslashit( $page_url ) . '#webpage';

	$organization_schema = array(
		'@type'        => 'Organization',
		'@id'          => $organization_id,
		'name'         => 'moveBuddha Advisors',
		'url'          => $home_url,
		'sameAs'       => array(
			'https://www.facebook.com/movebuddha',
			'https://www.linkedin.com/company/movebuddha/',
			'https://twitter.com/movebuddha',
		),
		'logo'         => array(
			'@type' => 'ImageObject',
			'url'   => $organization_logo_url,
		),
		'contactPoint' => array(
			array(
				'@type'             => 'ContactPoint',
				'contactType'       => 'customer service',
				'availableLanguage' => array( 'English', 'Spanish' ),
				'areaServed'        => 'US',
			),
		),
	);

	$website_schema = array(
		'@type'           => 'WebSite',
		'@id'             => $website_id,
		'url'             => $home_url,
		'name'            => $site_name,
		'publisher'       => array(
			'@id' => $organization_id,
		),
		'inLanguage'      => 'en-US',
		'potentialAction' => array(
			'@type'       => 'SearchAction',
			'target'      => $home_url . '?s={search_term_string}',
			'query-input' => 'required name=search_term_string',
		),
	);

	$hero_image_id = trailingslashit( $page_url ) . '#hero-image';

	$hero_schema = array(
		'@type'              => 'WebPage',
		'@id'                => $webpage_id,
		'url'                => $page_url,
		'name'               => 'California Moving Advisor',
		'headline'           => 'Best Moving Companies in California 2025 Rankings',
		'description'        => 'Compare top-rated, licensed movers to find the right company for your California move.',
		'inLanguage'         => 'en-US',
		'isPartOf'           => array(
			'@id' => $website_id,
		),
		'publisher'          => array(
			'@id' => $organization_id,
		),
		'primaryImageOfPage' => array(
			'@type'   => 'ImageObject',
			'@id'     => $hero_image_id,
			'url'     => $hero_image_url,
			'width'   => 1200,
			'height'  => 900,
			'caption' => 'Image of professional movers.',
		),
		'image'              => array(
			'@id' => $hero_image_id,
		),
	);

	if ( $page_id ) {
		$hero_schema['datePublished'] = get_post_time( DATE_ATOM, true, $page_id );
		$hero_schema['dateModified']  = get_post_modified_time( DATE_ATOM, true, $page_id );
	}

	$service_schema = array(
		'@type'            => 'Service',
		'@id'              => trailingslashit( $page_url ) . '#advisor-matching',
		'name'             => 'Find Your Advisor Today',
		'serviceType'      => 'Personalized moving advisor matching',
		'provider'         => array(
			'@id' => $organization_id,
		),
		'areaServed'       => array(
			'@type' => 'AdministrativeArea',
			'name'  => 'California',
		),
		'description'      => 'Provide your name, zip code, email, and phone number to be matched with vetted moving advisors across California.',
		'offers'           => array(
			'@type'          => 'Offer',
			'name'           => 'Free moving advisor matches',
			'price'          => '0',
			'priceCurrency'  => 'USD',
			'availability'   => 'https://schema.org/InStock',
			'eligibleRegion' => array(
				'@type' => 'AdministrativeArea',
				'name'  => 'California',
			),
		),
		'availableChannel' => array(
			'@type'             => 'ServiceChannel',
			'serviceUrl'        => trailingslashit( $page_url ) . '#call-to-action-form',
			'availableLanguage' => array( 'English', 'Spanish' ),
		),
		'potentialAction'  => array(
			'@type'  => 'Action',
			'name'   => 'Get Free Matches',
			'target' => array(
				'@type'          => 'EntryPoint',
				'urlTemplate'    => trailingslashit( $page_url ) . '#call-to-action-form',
				'actionPlatform' => array(
					'http://schema.org/DesktopWebPlatform',
					'http://schema.org/MobileWebPlatform',
				),
			),
		),
	);

	$faq_items = array(
		array(
			'question' => 'How much do movers cost in California?',
			'answer'   => 'Local moves typically range from $500 to $2,500 depending on home size and crew count. Long-distance moves are priced by weight and mileage, so request an in-home estimate for the most accurate quote.',
		),
		array(
			'question' => 'How far in advance should I book a moving company?',
			'answer'   => 'Book four to six weeks ahead for peak summer dates and at least two weeks in advance for off-season moves to secure your preferred movers and move date.',
		),
		array(
			'question' => 'Are the movers you recommend licensed and insured?',
			'answer'   => 'Yes. We only partner with movers that are properly licensed with the California Public Utilities Commission and maintain active insurance policies that protect your belongings.',
		),
		array(
			'question' => 'What is the difference between binding and non-binding estimates?',
			'answer'   => 'Binding estimates guarantee the total cost of the move as long as the inventory does not change. Non-binding estimates are based on the mover\'s best guess and the final price can change depending on the actual weight and services provided.',
		),
		array(
			'question' => 'Do movers help with packing and unpacking?',
			'answer'   => 'Most full-service movers offer professional packing, unpacking, and specialty item handling for an additional fee. Discuss your needs during the quote process so they can include it in your estimate.',
		),
	);

	$faq_schema = array(
		'@type'      => 'FAQPage',
		'@id'        => trailingslashit( $page_url ) . '#faq',
		'url'        => $page_url,
		'inLanguage' => 'en-US',
		'mainEntity' => array(),
	);

	foreach ( $faq_items as $index => $item ) {
		$faq_schema['mainEntity'][] = array(
			'@type'          => 'Question',
			'@id'            => trailingslashit( $page_url ) . '#faq-q' . ( $index + 1 ),
			'name'           => $item['question'],
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => $item['answer'],
			),
		);
	}

	$movers = array(
		array(
			'name'      => 'Bay Area Moving & Storage',
			'location'  => 'San Francisco, CA',
			'services'  => 'Local, Long-Distance, Packing',
			'specialty' => 'Residential moves',
			'pricing'   => '$120-150/hr',
			'minimum'   => '3-hour minimum',
			'rating'    => 4.8,
		),
		array(
			'name'      => 'Golden State Movers',
			'location'  => 'Los Angeles, CA',
			'services'  => 'Local, Commercial, Storage',
			'specialty' => 'Office relocations',
			'pricing'   => '$110-140/hr',
			'minimum'   => '4-hour minimum',
			'rating'    => 4.9,
		),
		array(
			'name'      => 'Pacific Coast Moving',
			'location'  => 'San Diego, CA',
			'services'  => 'Full-Service, Packing, Storage',
			'specialty' => 'Long-distance moves',
			'pricing'   => '$3,500-5,000',
			'minimum'   => 'Flat rate',
			'rating'    => 4.7,
		),
		array(
			'name'      => 'Silicon Valley Movers',
			'location'  => 'San Jose, CA',
			'services'  => 'Local, Packing, Piano Moving',
			'specialty' => 'Apartment moves',
			'pricing'   => '$100-130/hr',
			'minimum'   => '2-hour minimum',
			'rating'    => 4.9,
		),
		array(
			'name'      => 'Coastal Moving Services',
			'location'  => 'Santa Barbara, CA',
			'services'  => 'Local, Long-Distance, Storage',
			'specialty' => 'Senior relocations',
			'pricing'   => '$115-145/hr',
			'minimum'   => '3-hour minimum',
			'rating'    => 4.6,
		),
		array(
			'name'      => 'Sacramento Pro Movers',
			'location'  => 'Sacramento, CA',
			'services'  => 'Local, Commercial, Packing',
			'specialty' => 'Same-day moves',
			'pricing'   => '$105-135/hr',
			'minimum'   => '3-hour minimum',
			'rating'    => 4.8,
		),
	);

	$comparison_schema = array(
		'@type'           => 'ItemList',
		'@id'             => trailingslashit( $page_url ) . '#featured-movers',
		'name'            => 'Featured Moving Companies',
		'itemListOrder'   => 'ItemListOrderAscending',
		'numberOfItems'   => count( $movers ),
		'itemListElement' => array(),
	);

	foreach ( $movers as $index => $mover ) {
		$city  = $mover['location'];
		$state = '';
		if ( strpos( $mover['location'], ',' ) !== false ) {
			list($city, $state) = array_map( 'trim', explode( ',', $mover['location'] ) );
		}

		$mover_id = trailingslashit( $page_url ) . '#mover-' . ( $index + 1 );

		// Split comma separated services into Offer items.
		$services       = array_map( 'trim', explode( ',', $mover['services'] ) );
		$service_offers = array();
		foreach ( $services as $svc ) {
			if ( '' === $svc ) {
				continue;
			}

			$service_offers[] = array(
				'@type'       => 'Offer',
				'name'        => $svc,
				'itemOffered' => array(
					'@type'       => 'Service',
					'name'        => $svc,
					'serviceType' => $svc,
					'areaServed'  => array(
						'@type' => 'AdministrativeArea',
						'name'  => 'California',
					),
				),
			);
		}

		$comparison_schema['itemListElement'][] = array(
			'@type'    => 'ListItem',
			'position' => $index + 1,
			'item'     => array(
				// LocalBusiness subtype.
						'@type'   => 'MovingCompany',
				'@id'             => $mover_id,
				'name'            => $mover['name'],
				'url'             => home_url( '/movers/' . sanitize_title( $mover['name'] ) . '/' ),

				'address'         => array(
					'@type'           => 'PostalAddress',
					'addressLocality' => $city,
					'addressRegion'   => $state,
					'addressCountry'  => 'US',
				),
				'areaServed'      => array(
					'@type' => 'AdministrativeArea',
					'name'  => 'California',
				),
				'priceRange'      => $mover['pricing'],
				'description'     => $mover['specialty'],
				'makesOffer'      => $service_offers,

				// keep your minimum booking detail in a catalog.
				'hasOfferCatalog' => array(
					'@type'           => 'OfferCatalog',
					'name'            => 'Moving service pricing',
					'itemListElement' => array(
						array(
							'@type'              => 'Offer',
							'name'               => 'Minimum booking',
							'description'        => $mover['minimum'],
							'priceSpecification' => array(
								'@type'         => 'PriceSpecification',
								'priceCurrency' => 'USD',
							),
						),
					),
				),

				'aggregateRating' => array(
					'@type'       => 'AggregateRating',
					'ratingValue' => $mover['rating'],
					'bestRating'  => 5,
					'ratingCount' => 120,
				),
			),
		);
	}

	$person_schema = array(
		'@type'       => 'Person',
		'@id'         => trailingslashit( $page_url ) . '#jane-smith',
		'name'        => 'Jane Smith, CFP®',
		'jobTitle'    => 'Certified Financial Planner',
		'description' => 'Jane Smith is a CFP® with more than 15 years of experience guiding California families through complex relocations and financial planning decisions.',
		'image'       => array(
			'@type'  => 'ImageObject',
			'url'    => $advisor_image_url,
			'width'  => 600,
			'height' => 600,
		),
		'knowsAbout'  => array(
			'California moving companies',
			'Fiduciary financial planning',
			'Relocation budgeting',
		),
		'award'       => 'CFP® Board Certified',
		'alumniOf'    => array(
			array(
				'@type' => 'CollegeOrUniversity',
				'name'  => 'University of California, Berkeley',
			),
		),
		'memberOf'    => array(
			array(
				'@type' => 'Organization',
				'name'  => 'Financial Planning Association',
			),
		),
		'sameAs'      => array(
			'https://www.linkedin.com/in/janesmithcfp',
			'https://www.napfa.org/member/janesmith',
		),
		'worksFor'    => array(
			'@id' => $organization_id,
		),
		'affiliation' => array(
			'@id' => $organization_id,
		),
	);

	$schema_graph = array(
		$organization_schema,
		$website_schema,
		$hero_schema,
		$service_schema,
		$faq_schema,
		$comparison_schema,
		$person_schema,
	);

	$schema_output = array(
		'@context' => 'https://schema.org',
		'@graph'   => $schema_graph,
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $schema_output, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>';
	?>
</main>

<?php
get_footer();
