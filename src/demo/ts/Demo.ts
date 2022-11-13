import 'tinymce/icons/default';
import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

// Bootstrap5 demo
tinymce.init({
    selector: 'textarea#bootstrap5',
    plugins: [
        'grid',
        'code'
    ],
    toolbar: 'undo redo | formatselect | ' +
    ' bold italic backcolor | alignleft aligncenter ' +
    ' alignright alignjustify | bullist numlist outdent indent |' +
    ' removeformat | code | grid |',
    height : '600',
    width: '1024',
    grid_preset: 'Bootstrap5'
});
