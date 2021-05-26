function Validator(options) {
    // bien luu cac rule cho cung 1 selector
    var selectorRules = {};

    // ham thuc hien validate
    function validate(inputElement, rule) {  
        let errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        let errorMessage;

        let rules = selectorRules[rule.selector];
        for (let i = 0; i < rules.length; i++){
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    let formElement = document.querySelector(options.form);

    if (formElement) {
        // formElement.onsubmit = function(e){
        //     e.preventDefault();
        //     options.rules.forEach(function(rule){
        //         let inputElement = formElement.querySelector(rule.selector);
        //         validate(inputElement, rule);
        //     });
        // };

        options.rules.forEach(function(rule){
            let inputElement = formElement.querySelector(rule.selector);

            //luu cac rule vao array co key la rule.selector
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector]  = [rule.test];
            }

            if (inputElement) {
                // xu li khi blur khoi input
                inputElement.onblur = function(){
                    validate(inputElement, rule);
                }
                // xu li khi focus vao input
                inputElement.oninput = function(){
                    let errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }
}


/*  Định nghĩa rules
    Nguyên tắc của các rules
    1. Khi có lỗi => trả ra message lỗi
    2. Khi hợp lệ => Không trả về 
*/
Validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là Email';
        }
    }
}

Validator.isCMND = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            let regex = /[0-9]{9}/;
            return regex.test(value) ? undefined : message || 'CMND phải đủ 9 kí tự hoặc 12 kí tự';
        }
    }
}

Validator.isPhone = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            let regex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là số điện thoại hợp lệ';
        }
    }
}

Validator.isScore = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return (parseFloat(value) >= 0 && parseFloat(value) <= 10) ? undefined : message || 'Nhập điểm số lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 10';
        }
    }
}

