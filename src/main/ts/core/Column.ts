import { Editor } from 'tinymce';
import InsertColumn from '../dialog/InsertColumn';
import IPreset from '../presets/IPreset';
import BaseElement from './BaseElement';
import Settings from './Settings';

export default class Column extends BaseElement {
    public static readonly BTN_COLUMN_INSERT_AFTER = 'column_insert_after';
    public static readonly BTN_COLUMN_INSERT_BEFORE = 'column_insert_before';
    public static readonly BTN_COLUMN_DELETE = 'column_delete';
    public static readonly BTN_COLUMN_PROPERTIES = 'column_properties';

    private insertColumnDialog: InsertColumn;

    constructor(protected settings: Settings, protected preset: IPreset, protected editor: Editor, protected i18n) {
        super(settings, editor, i18n);

        this.insertColumnDialog = new InsertColumn(this.preset);

        // Binds commands
        this.insert = this.insert.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.delete = this.delete.bind(this);
        this.properties = this.properties.bind(this);
        this.onInsertSubmit = this.onInsertSubmit.bind(this);

        // Buttons
        editor.ui.registry.addButton(Column.BTN_COLUMN_PROPERTIES, {
            icon: 'table-row-properties',
            onAction: (event) => {
                this.properties(event.isDisabled(), event.setDisabled)
            },
            text: 'properties',
            tooltip: i18n.translate('grid.column.properties'),
        });
        editor.ui.registry.addButton(Column.BTN_COLUMN_INSERT_AFTER, {
            icon: 'table-insert-column-after',
            onAction: (event) => {
                this.insertAfter(event.isDisabled(), event.setDisabled)
            },
            text: 'insert after',
            tooltip: i18n.translate('grid.column.insert_after'),
        });
        editor.ui.registry.addButton(Column.BTN_COLUMN_INSERT_BEFORE, {
            icon: 'table-insert-column-before',
            onAction: (event) => {
                this.insertBefore(event.isDisabled(), event.setDisabled)
            },
            text: 'insert before',
            tooltip: i18n.translate('grid.column.insert_before'),
        });
        editor.ui.registry.addButton(Column.BTN_COLUMN_DELETE, {
            icon: 'table-delete-column',
            onAction: (event) => {
                this.delete(event.isDisabled(), event.setDisabled)
            },
            text: 'delete column',
            tooltip: i18n.translate('grid.column.remove'),
        });
    }

    /**
     * Inserts Column element after selection
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
     * Inserts Column element after selection
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
     * Opens "insert Column" dialog
     *
     * @param   {boolean}  ui
     * @param   {any}      value
     *
     * @return  {boolean}
     */
    private insert(ui: boolean, value: any): boolean {
        const row: HTMLElement = <HTMLElement> this.getElementRow();
        if (row) {
            this.editor.windowManager.open(this.insertColumnDialog.render((data) => {
                this.onInsertSubmit(data, value);
            }, {}), {});
            return true;
        }
        return false;
    }

    /**
     * Deletes selected Column element
     *
     * @param   {boolean}  ui
     * @param   {object}   value
     *
     * @return  {boolean}
     */
    private delete(ui: boolean, value: object): boolean {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            const row = column.parentNode;
            if (row.querySelectorAll('.grid-col').length === 1) {
                return false;
            } else {
                this.editor.dom.remove(column);
            }
            return true;
        }
        return false;
    }

    /**
     * Deletes selected Column element
     *
     * @param   {object}  data
     * @param   {string}  value
     *
     * @return  {boolean}
     */
    private onInsertSubmit(data, value: string) {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            if (value === 'after') {
                column.parentNode.insertBefore(this.preset.renderColumn(data), column.nextSibling);
            } else {
                column.parentNode.insertBefore(this.preset.renderColumn(data), column);
            }
        } else {
            const row: HTMLElement = <HTMLElement> this.getElementRow();
            row.appendChild(this.preset.renderColumn(data));
        }
    }

    /**
     * Opens dialog with properties of selected column element
     *
     * @param   {object}  data
     * @param   {string}  value
     *
     * @return  {boolean}
     */
    private properties(ui: boolean, value: any): boolean {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            const selected = this.insertColumnDialog.getSelected(column.classList.value);
            this.editor.windowManager.open(this.insertColumnDialog.render((data) => {
                // Remove old
                const removeClass = [];
                column.classList.forEach((className) => {
                    if (this.preset.isColumn(className)) {
                        removeClass.push(className);
                    }
                });
                removeClass.forEach((className) => {
                    column.classList.remove(className);
                });
                // Save new
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const element = data[key];
                        const breakpoint = this.preset.breakpoints.find((br) => br.value === key);
                        if (!element) {
                            continue;
                        }
                        column.classList.add(this.preset.columnClass(breakpoint.preffix, element));
                    }
                }
            }, {
                class: column.classList.value,
                selected
            }), {});
            return true;
        }
        return false;
    }
}