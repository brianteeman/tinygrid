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

    // Get selected classes props from selected element
    public getSelected(className: string) {
        const result = {};
        this.preset.breakpoints.forEach((breadpoint) => {
            let column = '';

            // Cols classes
            const match = this.preset.columnClassRegex(breadpoint.preffix).exec(className);
            if (match && match.length > 1) {
                column = match[1];
            }
            result[breadpoint.value] = column;
            
            // Align-Self Classes
            const alignSelfMatch = this.preset.alignSelfClassRegex(breadpoint.preffix).exec(className);
            column = ''
            if (alignSelfMatch && alignSelfMatch.length > 1) {
                column = alignSelfMatch[1];
            }
            result['align_self_'+breadpoint.value] = column;
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
                    label: breadpoint.text,
                    disabled: false,
                    value: breadpoint.value in selected ? selected[breadpoint.value] : '',
                    items: this.preset.columns,
                },
            ]
        };
    }

    // Generating array of selectboxes
    private selfAlignment(breadpoint: Breakpoint, selected) {
        return {
            type: 'panel',
            items: [
                {
                    type: 'selectbox',
                    name: 'align_self_'+breadpoint.value,
                    label: 'Align Self - '+breadpoint.text,
                    disabled: false,
                    value: breadpoint.value in selected ? selected['align_self_'+breadpoint.value] : '',
                    items: this.preset.alignSelf,
                },
            ]
        };
    }

    private initialData(breadpoints: Breakpoint[], selected) {
        const initData = {}
        breadpoints.forEach((br) => {
            // Cols
            if(br.value in selected){
                initData[br.value] = selected[br.value]
            }

            // Align-Self
            if('align_self_'+br.value in selected){
                initData['align_self_'+br.value] = selected['align_self_'+br.value]
            }
        })
        return initData
    }
}