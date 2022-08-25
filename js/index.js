import { addClass, containClass, removeClass } from "./utils/classHelpers";

const parseDateString = (datestring) => {
    return false;
}


let variables = {
    __proto__: null,
    name: ["", false],
    number: [0, false],
    month: ["", false],
    year: ["", false],
    cvv: [0, false],
    get_name: function(){
        return this.name[0];
    },
    set_name: function(name){
        this.name[0] = name;
        if (name !== "Dorcas Oladele") {
            this.name[1] = true;
        }
        else{
            this.name[1] = false;
        }
    },
    get_number: function(){
        return this.number[0];
    },
    set_number: function(num){
        this.number[0] = num
        if (num !== "0000 0000 0000 0000") {
            this.number[1] = true;
        }
        else{
            this.number[1] = false;
        }
    },
    get_month: function(){
        return this.month[0];
    },
    set_month: function(month, bool = false){
        this.month[0] = month;
        this.month[1] = bool;
    },
    get_year: function(){
        return this.year[0];
    },
    set_year: function(year, bool = false){
        this.year[0] = year;
        this.year[1] = bool;
    },
    get_cvv: function(){
        return this.cvv[0];
    },
    set_cvv: function(value){
        this.cvv[0] = value
        if (value.length === 3 && value !== "000") {
            this.cvv[1] = true;   
        }
        else{
            this.cvv[1] = false;
        }
    }
}

var cvv, mm, yy, name, num = null;

const reset_card = (field) => {
    switch (field) {
        case 'name':
            variables.set_name("Dorcas Oladele");
            document.getElementById('card-name'). textContent = "Dorcas Oladele";
            break;
        case 'number':
            variables.set_number("0000 0000 0000 0000");
            document.getElementById('card-number'). textContent = "0000 0000 0000 0000";
            break;
        case 'month':
            variables.set_month("00");
            document.getElementById('card-month').textContent = "00";
            break;
        case 'year':
            variables.set_year("00");
            document.getElementById('card-year').textContent = "00";
            break;
        case 'cvv':
            document.getElementById('card-cvv'). textContent = "000";
            break;
        default:
            break;
    }
}

const update = (field) => {
    switch (field) {
        case 'name':
            document.getElementById('card-name').textContent = variables.get_name();
            break;
        case 'number':
            document.getElementById('card-number').textContent = variables.get_number();
            break;
        case 'month':
            document.getElementById('card-month').textContent = variables.get_month();
            break;
        case 'year':
            document.getElementById('card-year').textContent = variables.get_year();
            break;
        case 'cvv':
            document.getElementById('card-cvv').textContent = variables.get_cvv();
            break;
        default:
            break;
    }
    
    buttonCheck();
}

const handleNameInput = function(value, elms){
    const lettersExp = /^[A-Za-z]+$/
    if(value === ''){
        reset_card('name')
        elms.container.dataset.error = 'true';
    }
    else{
        if (!value.match(lettersExp)) {
            reset_card('name')
            elms.container.dataset.error = 'true';
        }
        else {elms.container.dataset.error = 'false'; variables.set_name(value)}
    }

    update('name');
}

const handleNumberInput = function(value, elms){
    if(value === ''){
        reset_card('number')
        elms.container.dataset.error = 'true';
    }
    else{
        if (isNaN(Number(value.replaceAll(" ", ""))) || value.trim().length > 19) {
            reset_card('number')
            elms.container.dataset.error = 'true';
        }
        else {elms.container.dataset.error = 'false';variables.set_number(value)}
    }

    update('number');
}

const handleCvvInput = function(value, elms){

    if(value === ''){
        variables.set_cvv('000');
        elms.container.dataset.error = 'true';
    }
    else{
        if (isNaN(Number(value)) || value.length !== 3) {
            variables.set_cvv('000');
            elms.container.dataset.errormessage = "Invalid CVV";
            elms.container.dataset.error = 'true';
        }
        else {elms.container.dataset.error = 'false'; elms.container.dataset.errormessage = "Can't be blank"; ;variables.set_cvv(value)}
    }

    update('cvv');
}

const initInput = (type, elms) => {
    switch (type) {
        case "name":
            name = elms;
            break;
        case "number":
            num = elms;
            break;
        case "cvv":
            cvv = elms
            break;
        default:
            break;
    }
}

const singleInputContainers = document.querySelectorAll('.form-input__container--single');
singleInputContainers.forEach(container => {
    let field = container.querySelector('.form-input');
    let elms = {container, field};
    const type = field.dataset.validation;
    initInput(type, elms);
    field.addEventListener('input', function(e){
        e.preventDefault();
        switch (type) {
            case "name":
                name = elms;
                handleNameInput(this.value, elms)
                break;
            case "number":
                num = elms;
                handleNumberInput(this.value, elms)
                break;
            case "cvv":
                cvv = elms
                handleCvvInput(this.value, elms)
                break;
            default:
                break;
        }
    });
});

const handleMonthInput = (e, elms) => {
    dateInputsContainer.dataset.errormessage = "Can't be blank";
    if (elms.field.value == '') {
        reset_card('month');
        addClass(elms.field, 'error')
        dateInputsContainer.dataset.error = true;
    }
    else{
        dateInputsContainer.dataset.error = false;
        if (!isNaN(Number(elms.field.value)) && (Number(elms.field.value) <= 12)) {
            removeClass(elms.field, 'error')
            variables.set_month(elms.field.value, true);
        }
        else{
            reset_card('month');
            addClass(elms.field, 'error')
            dateInputsContainer.dataset.errormessage = "Invalid field values";
            dateInputsContainer.dataset.error = true;
        }
    }
    update('month')
}

const handleYearInput = (e, elms) => {
    const lettersExp = /^[A-Za-z]+$/
    dateInputsContainer.dataset.errormessage = "Can't be blank";
    if (elms.field.value == '') {
        reset_card('year');
        addClass(elms.field, 'error')
        dateInputsContainer.dataset.error = true;
    }
    else{
        if (!containClass(mm.field, 'error')) {
            dateInputsContainer.dataset.error = false;   
        }

        if (!isNaN(Number(elms.field.value)) && (Number(elms.field.value) <= 25)) {
            removeClass(elms.field, 'error')
            variables.set_year(elms.field.value, true);
        }
        else{
            reset_card('year');
            addClass(elms.field, 'error')
            dateInputsContainer.dataset.errormessage = "Invalid field values";
            dateInputsContainer.dataset.error = true;
        }
    }
    update('year')
}

const dateInputsContainer = document.getElementById('date-inputs-container');
const fields = dateInputsContainer.querySelectorAll('.input-field');
fields.forEach(item => {
    const field = item.querySelector('.form-input');
    
    const elms = { container:item, field }
    const type = item.dataset.validation;
    switch (type) {
        case "month":
            mm = elms;
            field.addEventListener('input', function(e) {
                handleMonthInput(e, elms);                
            })
            break;
        case "year":
            yy = elms;         
            field.addEventListener('input', function(e) {
                handleYearInput(e, elms)
            })
            break;
        default:
            break;
    }
});

const button = document.querySelector('#submit-btn');
const buttonCheck = () => {
    let fieldVars = Object.values(variables).filter(item => {return Array.isArray(item)});

    let fillCheck = fieldVars.every(val => val[1] === true);

    if (fillCheck) {
        removeClass(button, 'disabled')
    }
    else{
        addClass(button, 'disabled')
    }
}

const message = document.getElementById('message');
const handleFormSubmit = (e) => {
    e.preventDefault();
    if (containClass(button, 'disabled')) {
        handleNameInput(name.field.value, name);
        handleNumberInput(num.field.value, num);
        handleMonthInput({target: {value: ''}}, mm);
        handleYearInput({target: {value: ''}}, yy);
        handleCvvInput(cvv.field.value, cvv);
    }
    else{
        addClass(e.target, 'visually-hidden')
        removeClass(message, 'visually-hidden')
    }
}

const form = document.getElementById('form');
form.addEventListener('submit', handleFormSubmit)

message.querySelector('.cta-btn').onclick = function(e){
    window.location.reload();
}