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


/*  ?????nh ngh??a rules
    Nguy??n t???c c???a c??c rules
    1. Khi c?? l???i => tr??? ra message l???i
    2. Khi h???p l??? => Kh??ng tr??? v??? 
*/
Validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui l??ng nh???p tr?????ng n??y';
        }
    }
}

Validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Tr?????ng n??y ph???i l?? Email';
        }
    }
}

Validator.isCMND = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            let regex = /[0-9]{9}/;
            return regex.test(value) ? undefined : message || 'CMND ph???i ????? 9 k?? t??? ho???c 12 k?? t???';
        }
    }
}

Validator.isPhone = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            let regex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
            return regex.test(value) ? undefined : message || 'Tr?????ng n??y ph???i l?? s??? ??i???n tho???i h???p l???';
        }
    }
}

Validator.isScore = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return (parseFloat(value) >= 0 && parseFloat(value) <= 10) ? undefined : message || 'Nh???p ??i???m s??? l???n h??n ho???c b???ng 0 v?? nh??? h??n ho???c b???ng 10';
        }
    }
}

