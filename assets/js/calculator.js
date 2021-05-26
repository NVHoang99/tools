
class Calculator {
    constructor(prevElement, currElement) {
        //html
        this.prevElement = prevElement;
        this.currElement = currElement;
        this.clear();
    }

    clear(){
        //text
        this.operator = undefined;
        this.prevOperand = '';
        this.currOperand = '0';
    }

    clearEntry(){
        this.currOperand = '';
    }

    delete(){
        this.currOperand = this.currOperand.slice(0,-1);
    }

    appendNumber(number){
        if (number === '.' && this.currOperand.includes('.')) return;
        if (this.prevElement.innerText.includes('=')) {
            this.clear();
        } else if (this.currOperand.includes('0')) 
        {
            this.currOperand = `${number}`;
        }
        else this.currOperand = `${this.currOperand}${number}`;
    }

    updateDisplay(){
        if (this.operator != undefined) {
            if (this.operator !== '\u221A') {
                this.prevElement.innerText = `${this.prevOperand} ${this.operator}`;
            }
            else {
                this.prevElement.innerText = `${this.operator} ${this.prevOperand} `;
            }
            
        } else if (this.prevOperand !== '' && !this.prevElement.innerText.includes('=')) {
            this.prevElement.innerText = `${this.prevElement.innerText} ${this.currElement.innerText} =`;
        } else if (this.prevOperand === '') {
            this.prevElement.innerText = '';
        }
        this.currElement.innerText = this.currOperand;
    }

    chooseOperator(operator){
        if (this.currOperand === '') return;
        if (this.prevOperand !== '' && this.operator != undefined) { // prev and curr and operator !== ''
            this.compute();
        }
        if (operator === 'x!') this.operator = '!';
        else if (operator === 'x\u00B2') this.operator = '\u00B2';
        else this.operator = operator;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute(){
        const prevValue = parseFloat(this.prevOperand); 
        const currValue = parseFloat(this.currOperand); 
        if (isNaN(prevValue) && isNaN(currValue) && this.operator === undefined) return;
        switch(this.operator) {
            case '\u002b': {
                this.currOperand = prevValue + currValue;
                break;
            } 
            case '\u2212': {
                this.currOperand = prevValue - currValue;
                break;
            } 
            case '\u00d7': {
                this.currOperand = prevValue * currValue;
                break;
            } 
            case '\u00f7': {
                this.currOperand = prevValue / currValue;
                break;
            } 
            case '%': {
                this.currOperand = prevValue / 100;
                break;
            }
            case '!': {
                this.currOperand = factorial(prevValue);
                break;
            }
            case '\u00B2': {
                this.currOperand = prevValue**2;
                break;
            }
            case '\u221A': {
                this.currOperand = Math.sqrt(prevValue);
                break;
            }
            default:
                return;
        }
        this.operator = undefined;
    }

}

function factorial(value){
    let temp = 1;
    for (let i = 2; i <= value; i++){
        temp *= i;
    }
    return temp;
}

const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const equalbtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const CEbtn = document.querySelector('[data-CE]');
const delBtn = document.querySelector('[data-delete]');
const prevOperandElement = document.querySelector('[data-prev-operand]'); 
const currOperandElement = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandElement, currOperandElement);
currOperandElement.innerText = '0';
numberBtn.forEach(btn => {
    btn.addEventListener('click', ()=>{
        calculator.appendNumber(btn.innerText.trim());
        calculator.updateDisplay();
    });
});

operatorBtn.forEach(btn => {
    btn.addEventListener('click', ()=>{
        calculator.chooseOperator(btn.innerText.trim());
        calculator.updateDisplay();
    });
});

equalbtn.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
});

clearBtn.addEventListener('click', (btn)=>{
    calculator.clear();
    calculator.updateDisplay();
});

CEbtn.addEventListener('click', (btn)=>{
    calculator.clearEntry();
    calculator.updateDisplay();
});

delBtn.addEventListener('click', (btn)=>{
    calculator.delete();
    calculator.updateDisplay();
});