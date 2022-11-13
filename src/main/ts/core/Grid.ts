import { Editor } from 'tinymce';
import BaseElement from './BaseElement';
import Settings from './Settings';
import Column from './Column';
import Row from './Row';
import IPreset from '../presets/IPreset';

export default class Grid extends BaseElement {
    public static readonly BTN_INSERT_GRID = 'grid_insert';
    public static readonly BTN_DELETE_GRID = 'grid_delete';

    constructor(protected settings: Settings, protected preset: IPreset, protected editor: Editor, protected i18n) {
        super(settings, editor, i18n);

        // Binds commands
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);

        // Menu items
        editor.ui.registry.addMenuItem(Grid.BTN_INSERT_GRID, {
            icon: 'table',
            text: i18n.translate('grid.insert'),
            onAction: (event) => {
                this.insert(event.isDisabled(), event.setDisabled)
            },
        });
        // Buttons
        editor.ui.registry.addButton('grid', {
            icon: 'table',
            onAction: (event) => {
                this.insert(event.isDisabled(), event.setDisabled)
            },
            text: i18n.translate('grid.insert'),
            tooltip: i18n.translate('grid.insert'),
        });
        editor.ui.registry.addButton(Grid.BTN_DELETE_GRID, {
            icon: 'table-delete-table',
            onAction: (event) => {
                this.delete(event.isDisabled(), event.setDisabled)
            },
            //text: i18n.translate('grid.remove'),
            tooltip: i18n.translate('grid.remove'),
        });
        // editor.ui.registry.addGroupToolbarButton('grid', {
        //     icon: 'table',
        //     tooltip: i18n.translate('grid'),
        //     items: `${Grid.BTN_INSERT_GRID} | ${Grid.BTN_DELETE_GRID} | ${Column.BTN_COLUMN_PROPERTIES} ${Column.BTN_COLUMN_INSERT_AFTER} ${Column.BTN_COLUMN_INSERT_BEFORE} ${Column.BTN_COLUMN_DELETE} | ${Row.BTN_ROW_INSERT_AFTER} ${Row.BTN_ROW_INSERT_BEFORE} ${Row.BTN_ROW_DELETE}`
        // });
        editor.ui.registry.addContextToolbar('grid', {
            predicate: this.isElementColumn,
            items: `${Grid.BTN_DELETE_GRID} |  ${Row.BTN_ROW_INSERT_AFTER} ${Row.BTN_ROW_INSERT_BEFORE} ${Row.BTN_ROW_DELETE} | ${Column.BTN_COLUMN_PROPERTIES} ${Column.BTN_COLUMN_INSERT_AFTER} ${Column.BTN_COLUMN_INSERT_BEFORE} ${Column.BTN_COLUMN_DELETE}`
        });
    }

    /**
     * Inserts new Grid element
     *
     * @param   {boolean}  ui
     * @param   {object}   value
     *
     * @return  {boolean}
     */
    private insert(ui: boolean, value: object): boolean {
        const element = this.getElement();
        if (!element) {
            this.editor.execCommand('mceInsertContent', false, this.preset.renderContainer().outerHTML);
            return true;
        }
        return false;
    }

    /**
     * Deletes selected Grid element
     *
     * @param   {boolean}  ui
     * @param   {object}   value
     *
     * @return  {boolean}
     */
    private delete(ui: boolean, value: object): boolean {
        const element: HTMLElement = <HTMLElement> this.getElement();
        if (element) {
            this.editor.dom.remove(element);
            return true;
        }
        return false;
    }
}