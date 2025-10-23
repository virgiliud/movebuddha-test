const toggleFaqItem = ( item, isOpen ) => {
        const button = item.querySelector( '[data-faqs-toggle]' );
        const content = item.querySelector( '[data-faqs-content]' );
        const icon = item.querySelector( '[data-faqs-icon]' );

        if ( ! button || ! content ) {
                return;
        }

        button.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );

        if ( isOpen ) {
                content.classList.remove( 'hidden' );
        } else {
                content.classList.add( 'hidden' );
        }

        if ( icon ) {
                icon.classList.toggle( 'rotate-180', isOpen );
        }
};

const initialiseFaqItem = ( item ) => {
        const button = item.querySelector( '[data-faqs-toggle]' );

        if ( ! button ) {
                return;
        }

        const content = item.querySelector( '[data-faqs-content]' );

        if ( content ) {
                const expanded = button.getAttribute( 'aria-expanded' ) === 'true';
                toggleFaqItem( item, expanded );
        }

        button.addEventListener( 'click', () => {
                const expanded = button.getAttribute( 'aria-expanded' ) === 'true';
                toggleFaqItem( item, ! expanded );
        } );
};

const initialiseFaqBlock = ( root ) => {
        if ( root.dataset.diceFaqsInitialized === 'true' ) {
                return;
        }

        root.dataset.diceFaqsInitialized = 'true';

        root.querySelectorAll( '[data-faqs-item]' ).forEach( ( item ) => {
                initialiseFaqItem( item );
        } );
};

const initialiseAllFaqBlocks = () => {
        document
                .querySelectorAll( '[data-dice-faqs]' )
                .forEach( ( root ) => initialiseFaqBlock( root ) );
};

if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', initialiseAllFaqBlocks );
} else {
        initialiseAllFaqBlocks();
}
