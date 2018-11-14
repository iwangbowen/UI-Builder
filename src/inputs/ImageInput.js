import Input from './Input';

class ImageInput extends Input {
    constructor() {
        super();
        this.events = [
            ["keyup", "onChange", "input[type=text]"],
            ["change", "onUpload", "input[type=file]"]
        ];
    }

    init(data) {
        return this.render('imageinput', data);
    }

    setValue(value) {
        //don't set blob value to avoid slowing down the page
        if (value.indexOf('data:image') == -1) {
            $('input[type="text"]', this.element).val(value);
        }
    }

    onUpload(event, node) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(this.files[0]);
            reader.onload = (e) => {
                const base64 = e.target.result;
                event.data.element.trigger('propertyChange', [base64, this]);
            };
        }
    }
}

export default ImageInput;