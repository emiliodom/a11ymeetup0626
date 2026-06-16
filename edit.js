/**
 * edit.js — Editor / Admin View
 *
 * WordPress Accessibility Meetup — June 2026
 * Presenter: Emilio Dominguez
 * Block:     my-notice-block
 *
 * THIS FILE controls what the content editor sees inside the WordPress
 * block editor (dashboard). It is NOT what visitors see on the live site.
 * That is save.js.
 *
 * Accessibility features implemented:
 *   - role="region" + aria-label  → named navigable landmark (WCAG 1.3.1, 4.1.2)
 *   - aria-hidden on icon          → prevents duplicate AT announcements (WCAG 1.1.1)
 *   - SelectControl has a label    → labelled form control (WCAG 1.3.1)
 *   - :focus-visible in style.scss → visible keyboard focus (WCAG 2.4.7, 2.4.11)
 */

import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl }                   from '@wordpress/components';

// ── Constants ────────────────────────────────────────────────────────────────
// Icons are purely decorative — hidden from screen readers via aria-hidden.
// The notice type is communicated to AT via aria-label on the section wrapper.
const ICONS = {
    info:    'ℹ',
    warning: '⚠',
    error:   '✕',
    success: '✓',
};

// Notice type options shown in the settings sidebar dropdown.
const NOTICE_OPTIONS = [
    { label: 'Info',    value: 'info'    },
    { label: 'Warning', value: 'warning' },
    { label: 'Error',   value: 'error'   },
    { label: 'Success', value: 'success' },
];

// ── Edit Component ────────────────────────────────────────────────────────────
/**
 * @param {Object} props
 * @param {Object} props.attributes    - Current block attributes (noticeText, noticeType)
 * @param {Function} props.setAttributes - Call this to save any changed attribute value
 */
export default function Edit( { attributes, setAttributes } ) {
    const { noticeText, noticeType } = attributes;

    // useBlockProps adds the required WordPress wrapper attributes:
    // id, class, data-block, tabIndex, etc.
    const blockProps = useBlockProps( {
        className: `notice notice--${ noticeType }`,
    } );

    return (
        <>
            {/*
             * InspectorControls renders its children into the block settings
             * sidebar panel on the right side of the editor.
             */}
            <InspectorControls>
                <PanelBody title="Notice settings" initialOpen={ true }>
                    <SelectControl
                        label="Notice type"
                        // label is REQUIRED for accessibility — WCAG 1.3.1
                        value={ noticeType }
                        options={ NOTICE_OPTIONS }
                        onChange={ ( value ) => setAttributes( { noticeType: value } ) }
                        help="Changes the icon and colour of the notice."
                    />
                </PanelBody>
            </InspectorControls>

            {/*
             * role="region" + aria-label creates a named, navigable landmark.
             * Screen reader users can jump directly to it (like skipping chapters).
             * WCAG 1.3.1 — Info and Relationships
             * WCAG 4.1.2 — Name, Role, Value
             */}
            <section
                { ...blockProps }
                role="region"
                aria-label={ `${ noticeType } notice` }
            >
                {/*
                 * aria-hidden="true" hides the icon from the accessibility tree.
                 * The notice type is already communicated via aria-label above.
                 * Reading both would be redundant for screen reader users.
                 * WCAG 1.1.1 — Non-text Content
                 */}
                <span className="notice__icon" aria-hidden="true">
                    { ICONS[ noticeType ] }
                </span>

                {/*
                 * RichText gives content editors an inline rich-text editor.
                 * onChange saves the updated value back to the block attributes.
                 */}
                <RichText
                    tagName="p"
                    className="notice__text"
                    value={ noticeText }
                    onChange={ ( value ) => setAttributes( { noticeText: value } ) }
                    placeholder="Write your notice here..."
                    allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
                />
            </section>
        </>
    );
}
