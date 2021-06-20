import {Editor} from 'tinymce';
import BaseElement from './BaseElement';
import Settings from './Settings';
import IPreset from '../presets/IPreset';

export default class Row extends BaseElement {
    public static readonly BTN_ROW_INSERT_AFTER = 'row_insert_after';
    public static readonly BTN_ROW_INSERT_BEFORE = 'row_insert_before';
    public static readonly BTN_ROW_DELETE = 'row_delete';

    constructor(protected settings: Settings, protected preset: IPreset, protected editor: Editor, protected i18n) {
        super(settings, editor, i18n);

        // Binds commands
        this.insert = this.insert.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.delete = this.delete.bind(this);

        // Buttons
        editor.ui.registry.addButton(Row.BTN_ROW_INSERT_AFTER, {
            icon: 'table-insert-row-after',
            onAction: (event) => {
                this.insertAfter(event.isDisabled(), event.setDisabled)
            },
            text: 'insert after',
            tooltip: i18n.translate('grid.row.insert_after'),
        });
        editor.ui.registry.addButton(Row.BTN_ROW_INSERT_BEFORE, {
            icon: 'table-insert-row-above',
            onAction: (event) => {
                this.insertBefore(event.isDisabled(), event.setDisabled)
            },
            text: 'insert before',
            tooltip: i18n.translate('grid.row.insert_before'),
        });
        editor.ui.registry.addButton(Row.BTN_ROW_DELETE, {
            icon: 'table-delete-row',
            onAction: (event) => {
                this.delete(event.isDisabled(), event.setDisabled)
            },
            text: 'delete row',
            tooltip: i18n.translate('grid.row.remove'),
        });
    }

    /**
     * Inserts Row element after selection
     *
     * @param   {boolean}  ui
     * @param   {any}      value
     *
     * @return  {boolean}
     */
    private insertAfter(ui: boolean, value: any): boolean {
        return this.insert(ui, 'after');
    }

    /**
     * Inserts Row element before selection
     *
     * @param   {boolean}  ui
     * @param   {any}      value
     *
     * @return  {boolean}
     */
    private insertBefore(ui: boolean, value: any): boolean {
        return this.insert(ui, 'before');
    }

    /**
     * Inserts Row element
     *
     * @param   {boolean}  ui
     * @param   {any}      value
     *
     * @return  {boolean}
     */
    private insert(ui: boolean, value: any): boolean {
        const element: HTMLElement = <HTMLElement> this.getElementRow();
        if (element) {
            const newRow = this.preset.renderRow();
            if (value === 'after') {
                element.parentNode.insertBefore(newRow, element.nextSibling);
            } else {
                element.parentNode.insertBefore(newRow, element);
            }
            return true;
        }
        return false;
    }

    /**
     * Deletes selected Row element
     *
     * @param   {boolean}  ui
     * @param   {object}   value
     *
     * @return  {boolean}
     */
    private delete(ui: boolean, value: object): boolean {
        const element: HTMLElement = <HTMLElement> this.getElementRow();
        if (element) {
            this.editor.dom.remove(element);
            return true;
        }
        return false;
    }
}