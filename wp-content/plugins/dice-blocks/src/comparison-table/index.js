import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import metadata from './block.json';
import { BLOCK_CLASSES } from './config';
import { ComparisonTable } from './shared';

const Edit = () => {
    const blockProps = useBlockProps({
        className: BLOCK_CLASSES,
    });

    const [selectedMovers, setSelectedMovers] = useState([]);

    const toggleMover = (id) => {
        setSelectedMovers((previous) =>
            previous.includes(id)
                ? previous.filter((moverId) => moverId !== id)
                : [...previous, id]
        );
    };

    const clearAll = () => {
        setSelectedMovers([]);
    };

    return (
        <ComparisonTable
            blockProps={blockProps}
            selectedMovers={selectedMovers}
            onToggleMover={toggleMover}
            onClearAll={clearAll}
            isInteractive
            showSelectionTray={false}
        />
    );
};

const Save = () => {
    const blockProps = useBlockProps.save({
        className: BLOCK_CLASSES,
    });

    blockProps['data-comparison-table'] = 'true';

    return <ComparisonTable blockProps={blockProps} showSelectionTray />;
};

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});

