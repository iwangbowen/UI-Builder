import { dataUrl, dataTableId, dataResponseDataKey, dataAgGridTransposeKey, dataPopulateHeaders } from "../components/common";

export const functionName = 'submitForm';
export function template() {
    return `
        $('form.form-box').find('input[type=file][${dataUrl}]').on('change', function () {
            var formData = new FormData();
            formData.append(this.name, this.files[0]);
            $.ajax({
                url: config.fundodooApiDomainUrl + $(this).attr('${dataUrl}'),
                dataType: 'json',
                contentType: false,
                method : 'POST',
                async: true,
                processData: false,
                traditional: true,
                data: formData,
                fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                success: function (response, status, xhr) {
                    layer.alert('文件上传成功', {
                        icon: 1,
                        shadeClose: true,
                        title: '提示'
                    });
                }
            });
        });
        function ${functionName}(form, url, successCb, errorCb) {
            var valid = true;
            form.find('input[required], select[required], textarea[required]')
                .each(function () {
                    if (!this.value) {
                        valid = false;
                        layer.alert(this.name + '输入不能为空', {
                            icon: 2,
                            shadeClose: true,
                            title: '提示'
                        });
                        return false;
                    }
                });
            if (valid) {
                var formData = new FormData();
                var data = form.serializeJSON();
                data.tok = sessionStorage.getItem('FUNDODOO_TOKEN');
                $.each($('input[type=file]'), function (i, element) {
                    formData.append(element.name, element.files[0]);
                });
                Object.keys(data).forEach(function (value) {
                    formData.append(value, data[value]);
                });
                var containsFileInput = form.find('input[type=file]').length > 0;
                $.ajax({
                    url: config.fundodooApiDomainUrl + url,
                    dataType: 'json',
                    contentType: containsFileInput ? false : 'application/x-www-form-urlencoded',
                    method : 'POST',
                    async: true,
                    processData: !containsFileInput,
                    traditional: true,
                    data: containsFileInput ? formData : data,
                    fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                    success: successCb,
                    error: errorCb
                });
            }
        }
    `;
}

export const submitFormScriptType = 'submit-form-script';