import Settings from '../core/Settings';
import {Editor} from 'tinymce';

interface Column {
    text: string;
    value: string;
}

interface Breakpoint {
    text: string;
    value: string;
    prefix: string;
}

interface All {
    text: string;
    value: string;
    prefix: string;
}

interface IPreset {
    columns: Column[];
    alignSelf: Column[];
    breakpoints: Breakpoint[];
    allsizes: All[];
    /**
     * Gets style url
     *
     * @return  {string}
     */
    style(): string;
    /**
     * Returns regxp for column class
     *
     * @param {string} columnPrefix
     * @return {RegExp}
     */
    columnClassRegex(columnPrefix: string): RegExp;
    /**
     * Returns regxp for align-self class
     *
     * @param {string} columnPrefix
     * @return {RegExp}
     */
     alignSelfClassRegex(columnPrefix: string): RegExp;

     /**
     * Builds column class based on prefix and breakpoint
     *
     * @param {string} prefix
     * @param {string} breakpoint
     * @return {string}
     */
    columnClass(prefix: string, breakpoint: string): string;
    /**
     * Builds self-align class based on prefix and breakpoint
     *
     * @param {string} prefix
     * @param {string} breakpoint
     * @return {string}
     */
     selfAlignClass(prefix: string, alignment: string): string;
     /**
     * Check if class is column
     *
     * @param {string} className
     * @return {boolean}
     */
    isColumn(className: string): boolean;
    /**
     * Render container
     *
     * @return {Element}
     */
    renderContainer(): Element;
    /**
     * Render row
     *
     * @return {Element}
     */
    renderRow(): Element;
    /**
     * Render column
     *
     * @return {Element}
     */
    renderColumn(data): Element;
}

type IPresetConstructor = new(settings: Settings, editor: Editor) => IPreset;

declare var IPreset: IPresetConstructor;

export default IPreset;
export {Column, Breakpoint, All};