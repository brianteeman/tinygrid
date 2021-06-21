import IPreset, { Breakpoint } from '../presets/IPreset';

export default class InsertColumn {

    constructor (private preset: IPreset) {}

    public render(onSubmit: { (data: any): void; (data: any): void; }, args: { class?: string, selected?: {} }) : any {
        const selected = 'selected' in args ? args.selected : {};
        return {
            title: 'Insert column',
            body: {
                type: 'panel',
                items: [
                    ... this.preset.breakpoints.map((br) => this.breadpoint(br, selected)),
                    ... this.preset.breakpoints.map((br) => this.selfAlignment(br, selected))
                ],
            },
            initialData: this.initialData(this.preset.breakpoints, selected),
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
            onSubmit: (api) => {
                const data = api.getData();
                onSubmit(data);
                api.close();
            }
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
            items: [
                {
                    type: 'selectbox',
                    name: breadpoint.value,
                    label: breadpoint.value,
                    disabled: false,
                    value: breadpoint.value in selected ? selected[breadpoint.value] : '',
                    items: this.preset.columns,
                },
            ]
        };
    }

    private selfAlignment(breadpoint: Breakpoint, selected) {
        return {
            type: 'panel',
            items: [
                {
                    type: 'selectbox',
                    name: 'self_align_'+breadpoint.value,
                    label: 'self_align_'+breadpoint.value,
                    disabled: false,
                    value: breadpoint.value in selected ? selected[breadpoint.value] : '',
                    items: this.preset.alignSelf,
                },
            ]
        };
    }

    private initialData(breadpoints: Breakpoint[], selected) {
        const initData = {}
        breadpoints.forEach((br) => {
            if(br.value in selected){
                initData[br.value] = selected[br.value]
            }
        })
        return initData
    }
}