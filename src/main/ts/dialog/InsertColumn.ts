import IPreset, { Breakpoint } from '../presets/IPreset';

export default class InsertColumn {

    constructor (private preset: IPreset) {}

    public render(onSubmit: { (data: any): void; (data: any): void; }, args: { class?: string, selected?: {} }) : any {
        const selected = 'selected' in args ? args.selected : {};
        return {
            title: 'Insert column',
            body: {
                type: 'panel',
                items: this.preset.breakpoints.map((br) => this.breadpoint(br, selected))
            },
            buttons: [ // A list of footer buttons
                {
                  type: 'submit',
                  text: 'OK',
                },
                {
                  type: 'cancel',
                  text: 'Cancel',
                },
            ],
            onSubmit
        };
    }

    public getSelected(className: string) {
        const result = {};
        this.preset.breakpoints.forEach((breadpoint) => {
            const match = this.preset.columnClassRegex(breadpoint.preffix).exec(className);
            let column = '';
            if (match && match.length > 1) {
                column = match[1];
            }
            result[breadpoint.value] = column;
        });
        return result;
    }

    private breadpoint(breadpoint: Breakpoint, selected) {
        return {
            type: 'panel',
            /*
            label: breadpoint.text,
            layout: 'flex',
            direction: 'row',
            align: 'center',
            spacing: 5,
            */
            items: [
                {
                    type: 'selectbox',
                    name: breadpoint.value,
                    label: breadpoint.value,
                    disabled: false,
                    // value: breadpoint.value in selected ? selected[breadpoint.value] : '',
                    items: this.preset.columns,
                },
            ]
        };
    }
}