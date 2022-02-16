const billSubtotalInput = document.getElementById('bill-amount-input');
const tipPercentCustom = document.getElementById('custom-tip-percent');
const tipPercentButtons = [document.getElementById('tip-20'), document.getElementById('tip-25'), document.getElementById('tip-30'), document.getElementById('tip-35')];
const tipTotalAmount = document.getElementById('tip-total-amount');
// const calcTipButton = document.getElementById('calc-tip-button');
const errorText = document.getElementById('error-text');

const maxTipPercent = 99;
let selectedTipAmount = "";

let selectedButton = null;

const calcInit = ()=>{
    selectedButton = tipPercentButtons[0];
    selectedTipAmount = "20";
    selectedButton.classList.add('tip-button-selected');
}

//Tip Percent Buttons Click Event
tipPercentButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
        if(selectedButton != null){
            selectedButton.classList.remove('tip-button-selected');
        }

        if(tipPercentCustom.value > 0) tipPercentCustom.value = "";

        selectedButton = button;
        button.classList.add('tip-button-selected');
        selectedTipAmount = e.target.id.split('-')[1];
        calculateTip();
    });
});

//Listens for input inside bill subtotal input
billSubtotalInput.addEventListener('input',()=>{
    let subtotal = billSubtotalInput.value;

    if(subtotal <= 0) subtotal = "";

    billSubtotalInput.value = subtotal;

    calculateTip();
});

//Listens for input inside the custom tip percent input.
tipPercentCustom.addEventListener('input',()=>{
    let currentCustom = tipPercentCustom.value;

    if(currentCustom <= 0) currentCustom = 1;
    
    if(currentCustom > maxTipPercent) currentCustom = maxTipPercent;

    if(selectedButton != null) {
        selectedButton.classList.remove('tip-button-selected');
        selectedButton = null;
    }

    selectedTipAmount = currentCustom;
    tipPercentCustom.value = currentCustom;

    calculateTip();
});

//Listens for click events on the calculate tip button
// calcTipButton.addEventListener('click', ()=>{
//     calculateTip();
// });

const calculateTip = ()=>{
    const billSubtotal = billSubtotalInput.value * 1;

    if(billSubtotal <= 0){
        updateErrorText("Bill subtotal can't be zero");
        return;
    }

    if(isNaN(billSubtotal)){
        updateErrorText("Bill subtotal must be a number");
        return;
    }

    if(selectedTipAmount == "" || selectedTipAmount <= 0){
        updateErrorText("Tip percent can't be zero");
        return;
    }

    toggleErrorText(false);

    convertedPercent = determinePercentDecimal(selectedTipAmount);
    
    totalTip = Math.round(((billSubtotal * convertedPercent) + Number.EPSILON) * 100) / 100;

    tipTotalAmount.innerText = `$${totalTip}`;
}

const updateErrorText = (error)=>{
    errorText.innerText = error;
    toggleErrorText(true);
}

const toggleErrorText = (textVisible)=>{
    if(textVisible){
        errorText.style.display = 'block'
        return;
    }

    errorText.style.display = 'none'
}

//Converts percent to a decimal
const determinePercentDecimal = (percent)=>{
    if(percent >= 10)return `.${percent}`;
    else return `.0${percent}`;
}

toggleErrorText(false);
calcInit();