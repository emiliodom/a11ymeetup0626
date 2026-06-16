/**
 * save.js — Frontend / Visitor View
 *
 * WordPress Accessibility Meetup — June 2026
 * Presenter: Emilio Dominguez
 * Block:     my-notice-block
 *
 * THIS FILE outputs the static HTML that gets saved to the WordPress database
 * and served to visitors on the live website. It is NOT the editor view.
 * That is edit.js.
 *
 * IMPORTANT RULES for save.js:
 *   1. The output must be 100% deterministic — no random values, no Math.random().
 *   2. Use useBlockProps.save() — NOT useBlockProps() (that's only for edit.js).
 *   3. Use RichText.Content — NOT RichText (RichText is only for the editor).
 *   4. If you change this file after content has already been saved, WordPress
 *      will show a "block validation error". Remove and re-add affected blocks.
 *
 * Accessibility features implemented:
 *   - role="region" + aria-label  → named navigable landmark (WCAG 1.3.1, 4.1.2)
 *   - aria-live="polite"           → dynamic change announcements (WCAG 4.1.3)
 *   - aria-hidden on icon          → prevents duplicate AT announcements (WCAG 1.1.1)
 *   - <section> not <div>          → semantic HTML landmark (WCAG 1.3.1)
 *   - Colour + icon + label        → type not conveyed by colour alone (WCAG 1.4.1)
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

// Icons are purely decorative — hidden from screen readers via aria-hidden.
const ICONS = {
    info:    'ℹ',
    warning: '⚠',
    error:   '✕',
    success: '✓',
};

// ── Save Component ─────────────────────────────────────────────────────────
/**
 * @param {Object} props
 * @param {Object} props.attributes - Saved block attributes (noticeText, noticeType)
 */
export default function save( { attributes } ) {
    const { noticeText, noticeType } = attributes;

    // useBlockProps.save() — note the .save() — adds the required wrapper attributes.
    // Never use useBlockProps() here; that version is only for edit.js.
    const blockProps = useBlockProps.save( {
        className: `notice notice--${ noticeType }`,
    } );

    return (
        /*
         * <section> communicates that this is a self-contained, meaningful
         * section of content — not a generic container.
         * WCAG 1.3.1 — Info and Relationships
         *
         * role="region" turns it into a navigable landmark.
         * WCAG 4.1.2 — Name, Role, Value
         *
         * aria-label gives the landmark an accessible name.
         * Without it, role=region is ignored by most screen readers.
         *
         * aria-live="polite" — if this block's content changes after page load
         * (e.g. dynamic content injection), screen readers will announce the
         * change when the user is idle, not mid-sentence.
         * WCAG 4.1.3 — Status Messages
         */
        <section
            { ...blockProps }
            role="region"
            aria-label={ `${ noticeType } notice` }
            aria-live="polite"
        >
            {/*
             * aria-hidden="true" removes this element from the accessibility tree.
             * The icon is decorative — the notice type is already communicated by
             * the aria-label on the parent section.
             * WCAG 1.1.1 — Non-text Content
             */}
            <span className="notice__icon" aria-hidden="true">
                { ICONS[ noticeType ] }
            </span>

            {/*
             * RichText.Content (with .Content) outputs the saved HTML string.
             * This is the correct way to render RichText in save.js.
             * Using plain <RichText> here would cause a block validation error.
             */}
            <RichText.Content
                tagName="p"
                className="notice__text"
                value={ noticeText }
            />
        </section>
    );
}
