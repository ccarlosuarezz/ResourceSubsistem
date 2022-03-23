const select = document.getElementById('process');
const execButton = document.getElementById('exec_button');
const driverList = document.getElementById('driver_list');
const controllerList = document.getElementById('controller_list');
const dmaList = document.getElementById('dma_list');

execButton.addEventListener('click', simulation);

function simulation() {
    let optionSelected = select.options[select.selectedIndex].value;
    switch (optionSelected) {
        case 'disk':
            //Aqui deben ir las operaciones a realizar con la lectura de disco y llenar las tablas cada cieto tiempo
            newOperation(operationInDisk, 2000);
            break;
        case 'screen':
            //Aqui deben ir las operaciones a realizar con mostrar en pantalla y llenar las tablas cada cieto tiempo
            newOperation(operationInScreen, 2000);
            break;
        case 'keyboard':
            //Aqui deben ir las operaciones a realizar con obtener entradas de teclado y llenar las tablas cada cieto tiempo
            newOperation(operationInKeyboard, 2000);
            break;
        default:
            break;
    }
}

function operationInDisk() {
    console.log('Operation In Disk');
}

function operationInScreen() {
    console.log('Operation In Screen');
}

function operationInKeyboard() {
    console.log('Operation In Keyboard');
}

function newOperation(operationCallBack, time) {
    const sleep = (milliseconds) => {
        return new Promise((resolve) => {setTimeout(resolve, milliseconds)})
    }
    const show = async() => {
        for (let i = 0; i < 5; i++) {
            await sleep(time);
            operationCallBack();
        }
    }
    show();
}