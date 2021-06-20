import 'tinymce/icons/default';
import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

// Bootstrap5 demo
tinymce.init({
    selector: 'textarea#bootstrap5',
    plugins: [
        'grid'
    ],
    toolbar: 'undo redo | formatselect | ' +
    ' bold italic backcolor | alignleft aligncenter ' +
    ' alignright alignjustify | bullist numlist outdent indent |' +
    ' removeformat | help | grid_insert',
    height : '250',
    language: 'he_IL',
    grid_preset: 'Bootstrap5'
});
