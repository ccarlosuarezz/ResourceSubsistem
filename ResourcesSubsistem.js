const select = document.getElementById('process');
const execButton = document.getElementById('exec_button');
// ------------
const controllerDisk = document.getElementById('controller_disk');
const controllerScreen = document.getElementById('controller_screen');
const controllerKeyboard = document.getElementById('controller_keyboard');
// ------------
const genericDriverDisk = document.getElementById('generic_driver_disk');
const genericDriverScreen = document.getElementById('generic_driver_screen');
const genericDriverKeyboard = document.getElementById('generic_driver_keyboard');
// ------------
const dmaData = document.getElementById('dma_data');

const COLOR_RECEIVING = '#FFD93D';
const COLOR_SENDING = '#4D96FF';
const COLOR_WAITING = '#FF6B6B';
const COLOR_VERIFY = '#F76E11';
const COLOR_WORKING = '#6BCB77';
const COLOR_END_JOB = '#C8C6C6';
const COLOR_EMPTY = '#FFFFFF';

const SEC_IN_MILISEC = 1000;

const DEFAULT_OPERATION = 'Ninguna';

const FILE = 'C:/Documentos/Suma.exe';
const STD_OUT_FILE = 'STD-OUT'
const STD_IN_FILE = 'STD-IN';

const INSTRUCTION_VERIFY_DEVICE_AVAILABILITY = 'VERIFY AVAILABILITY';
const INSTRUCTION_LOAD_FILE = 'LOAD FILE ['+FILE+']';//'LD_F[FILE]'
const INSTRUCTION_SHOW_STD_OUT = 'SHOW ['+STD_OUT_FILE+']';
const INSTRUCTION_GET_KEYBOARD_DATA = 'GET INPUT DATA';
const INSTRUCTION_GET_STD_IN = 'ST_IN_['+STD_IN_FILE+']';

const DEVICE_ADDRESS = 'SATA-1';
const MAX_POSITION_IN_DISK = 1000;
const INIT_MEMORY_POSITION = randomNumber(0, MAX_POSITION_IN_DISK);
const NUMBER_OF_WORDS = randomNumber(0, MAX_POSITION_IN_DISK-INIT_MEMORY_POSITION);

execButton.addEventListener('click', simulation);

let deviceList = [new Device('Disco', 0), new Device('Pantalla', 0), new Device('Teclado', 0)];
let dma = new DMA();

function simulation() {
    let optionSelected = select.options[select.selectedIndex].value;

    const sleep = (milliseconds) => {
        return new Promise((resolve) => {setTimeout(resolve, milliseconds)})
    }
    
    let device;

    const show = async() => {
        let instructionTranslated = [];
        let newInstruction = '';
        let randomDeviceState = 0;
        switch (optionSelected) {
            case 'disk':
                device = deviceList[0];
                receivingNotify(controllerDisk, RECEIVING_NOTIFY_GET_DISK)
                await sleep(3*SEC_IN_MILISEC);
                verifyDeviceAvailability(controllerDisk, device);
                await sleep(3*SEC_IN_MILISEC);
                sendInstruction(controllerDisk, INSTRUCTION_VERIFY_DEVICE_AVAILABILITY);
                await sleep(3*SEC_IN_MILISEC);
                receivingInstruction(genericDriverDisk);
                await sleep(2*SEC_IN_MILISEC);
                waitingDeviceAvailability(controllerDisk, device);
                translateInstruction(genericDriverDisk);
                await sleep(1*SEC_IN_MILISEC);
                instructionTranslated = translateToNewInstructionSpecific(INSTRUCTION_VERIFY_DEVICE_AVAILABILITY);
                showTranslateInstruction(genericDriverDisk, INSTRUCTION_VERIFY_DEVICE_AVAILABILITY, newInstruction);
                for (let i = 0; i < instructionTranslated.length; i++) {
                    newInstruction += instructionTranslated[i];
                    await sleep(1*SEC_IN_MILISEC);
                    showTranslateInstruction(genericDriverDisk, INSTRUCTION_VERIFY_DEVICE_AVAILABILITY, newInstruction);
                }
                await sleep(2*SEC_IN_MILISEC);
                sendInstruction(genericDriverDisk, newInstruction);
                await sleep(3*SEC_IN_MILISEC);
                randomDeviceState = randomNumber(0,1);
                if (randomDeviceState == 0) {
                    device.state = 0;
                    showDeviceState(genericDriverDisk, device.state);
                } else {
                    device.state = 1;
                    showDeviceState(genericDriverDisk, device.state);
                    await sleep(randomNumber(5, 10)*SEC_IN_MILISEC);
                    device.state = 0;
                    showDeviceState(genericDriverDisk, device.state);
                }
                await sleep(2*SEC_IN_MILISEC);
                receivingDevice(controllerDisk, device)
                endJob(genericDriverDisk)
                await sleep(3*SEC_IN_MILISEC);
                sendGetDisk(FILE);
                await sleep(3*SEC_IN_MILISEC);
                sendInstruction(controllerDisk, INSTRUCTION_LOAD_FILE);
                await sleep(3*SEC_IN_MILISEC);
                receivingInstruction(genericDriverDisk);
                await sleep(2*SEC_IN_MILISEC);
                showWaitingMessage(controllerDisk, WAITING_DATA);
                translateInstruction(genericDriverDisk);
                await sleep(1*SEC_IN_MILISEC);
                instructionTranslated = translateToNewInstructionSpecific(INSTRUCTION_LOAD_FILE);
                newInstruction = '';
                showTranslateInstruction(genericDriverDisk, INSTRUCTION_LOAD_FILE, newInstruction);
                for (let i = 0; i < instructionTranslated.length; i++) {
                    newInstruction += instructionTranslated[i];
                    await sleep(1*SEC_IN_MILISEC);
                    showTranslateInstruction(genericDriverDisk, INSTRUCTION_LOAD_FILE, newInstruction);
                }
                await sleep(2*SEC_IN_MILISEC);
                sendInstruction(genericDriverDisk, newInstruction);
                await sleep(3*SEC_IN_MILISEC);
                showWaitingMessage(genericDriverDisk, WAITING_DATA);
                await sleep(randomNumber(5,10)*SEC_IN_MILISEC);
                receivingNotify(genericDriverDisk, RECEIVING_NOTIFY_DATA_READY);
                await sleep(3*SEC_IN_MILISEC);
                receivingNotify(controllerDisk, RECEIVING_NOTIFY_DATA_READY);
                endJob(genericDriverDisk);
                await sleep(3*SEC_IN_MILISEC);
                loadingDataInDMA();
                await sleep(1*SEC_IN_MILISEC);
                loadDataInDMA(DEVICE_ADDRESS, 0, 0);
                await sleep(1*SEC_IN_MILISEC);
                loadDataInDMA(DEVICE_ADDRESS, INIT_MEMORY_POSITION, 0);
                await sleep(1*SEC_IN_MILISEC);
                loadDataInDMA(DEVICE_ADDRESS, INIT_MEMORY_POSITION, NUMBER_OF_WORDS);
                await sleep(1*SEC_IN_MILISEC);
                isLoadDataInDMA();
                await sleep(3*SEC_IN_MILISEC);
                notifyDataInDMA();
                await sleep(5*SEC_IN_MILISEC);
                receivingNotifyDataInMemory();
                await sleep(3*SEC_IN_MILISEC);
                cleaningDMA();
                await sleep(1*SEC_IN_MILISEC);
                loadDataInDMA('Ninguna', INIT_MEMORY_POSITION, NUMBER_OF_WORDS);
                await sleep(1*SEC_IN_MILISEC);
                loadDataInDMA('Ninguna', 0, NUMBER_OF_WORDS);
                await sleep(1*SEC_IN_MILISEC);
                loadDataInDMA('Ninguna', 0, 0);
                await sleep(1*SEC_IN_MILISEC);
                cleanDMA();
                await sleep(3*SEC_IN_MILISEC);
                endJob(controllerDisk);
                await sleep(1*SEC_IN_MILISEC);
                jobTerminated();
                break;
            case 'screen':
                device = deviceList[1];
                receivingNotify(controllerScreen, RECEIVING_NOTIFY_GET_SCREEN);
                await sleep(3*SEC_IN_MILISEC);
                verifyDeviceAvailability(controllerScreen, device);
                await sleep(3*SEC_IN_MILISEC);
                sendInstruction(controllerScreen, INSTRUCTION_VERIFY_DEVICE_AVAILABILITY);
                await sleep(3*SEC_IN_MILISEC);
                receivingInstruction(genericDriverScreen);
                await sleep(2*SEC_IN_MILISEC);
                waitingDeviceAvailability(controllerScreen, device);
                translateInstruction(genericDriverScreen);
                await sleep(1*SEC_IN_MILISEC);
                instructionTranslated = translateToNewInstructionSpecific(INSTRUCTION_VERIFY_DEVICE_AVAILABILITY);
                showTranslateInstruction(genericDriverScreen, INSTRUCTION_VERIFY_DEVICE_AVAILABILITY, newInstruction);
                for (let i = 0; i < instructionTranslated.length; i++) {
                    newInstruction += instructionTranslated[i];
                    await sleep(1*SEC_IN_MILISEC);
                    showTranslateInstruction(genericDriverScreen, INSTRUCTION_VERIFY_DEVICE_AVAILABILITY, newInstruction);
                }
                await sleep(2*SEC_IN_MILISEC);
                sendInstruction(genericDriverScreen, newInstruction);
                await sleep(3*SEC_IN_MILISEC);
                randomDeviceState = randomNumber(0,1);
                if (randomDeviceState == 0) {
                    device.state = 0;
                    showDeviceState(genericDriverScreen, device.state);
                } else {
                    device.state = 1;
                    showDeviceState(genericDriverScreen, device.state);
                    await sleep(randomNumber(5, 10)*SEC_IN_MILISEC);
                    device.state = 0;
                    showDeviceState(genericDriverScreen, device.state);
                }
                await sleep(2*SEC_IN_MILISEC);
                receivingDevice(controllerScreen, device)
                endJob(genericDriverScreen)
                await sleep(3*SEC_IN_MILISEC);
                notify(controllerScreen, NOTIFY_GET_STD_OUT);
                await sleep(3*SEC_IN_MILISEC);
                receivingNotify(controllerScreen, RECEIVING_NOTIFY_STD_OUT+'<strong>'+STD_OUT_FILE+'</strong>');
                await sleep(3*SEC_IN_MILISEC);
                sendInstruction(controllerScreen, INSTRUCTION_SHOW_STD_OUT)
                await sleep(3*SEC_IN_MILISEC);
                receivingInstruction(genericDriverScreen);
                await sleep(2*SEC_IN_MILISEC);
                showWaitingMessage(controllerScreen, WAITING_SHOW_STD_OUT);
                translateInstruction(genericDriverScreen);
                await sleep(1*SEC_IN_MILISEC);
                instructionTranslated = translateToNewInstructionSpecific(INSTRUCTION_SHOW_STD_OUT);
                newInstruction = '';
                showTranslateInstruction(genericDriverScreen, INSTRUCTION_SHOW_STD_OUT, newInstruction);
                for (let i = 0; i < instructionTranslated.length; i++) {
                    newInstruction += instructionTranslated[i];
                    await sleep(1*SEC_IN_MILISEC);
                    showTranslateInstruction(genericDriverScreen, INSTRUCTION_SHOW_STD_OUT, newInstruction);
                }
                await sleep(2*SEC_IN_MILISEC);
                sendInstruction(genericDriverScreen, newInstruction);
                await sleep(3*SEC_IN_MILISEC);
                showWaitingMessage(genericDriverScreen, WAITING_SHOW_STD_OUT);
                await sleep(4*SEC_IN_MILISEC);
                receivingNotify(genericDriverScreen, RECEIVING_NOTIFY_SHOW_STD_OUT);
                await sleep(3*SEC_IN_MILISEC);
                receivingNotify(controllerScreen, RECEIVING_NOTIFY_SHOW_STD_OUT);
                endJob(genericDriverScreen);
                await sleep(2*SEC_IN_MILISEC);
                notify(controllerScreen, NOTIFY_SHOW_STD_OUT);
                await sleep(3*SEC_IN_MILISEC);
                endJob(controllerScreen);
                await sleep(1*SEC_IN_MILISEC);
                jobTerminated();
                break;
            case 'keyboard':
                device = deviceList[2];
                receivingNotify(controllerKeyboard, RECEIVING_NOTIFY_GET_KEYBOARD);
                await sleep(3*SEC_IN_MILISEC);
                sendInstruction(controllerKeyboard, INSTRUCTION_GET_KEYBOARD_DATA);
                await sleep(3*SEC_IN_MILISEC);
                receivingInstruction(genericDriverKeyboard);
                await sleep(2*SEC_IN_MILISEC);
                showWaitingMessage(controllerKeyboard, WAITING_GET_KEYBOARD_DATA);
                translateInstruction(genericDriverKeyboard);
                await sleep(1*SEC_IN_MILISEC);
                instructionTranslated = translateToNewInstructionSpecific(INSTRUCTION_GET_KEYBOARD_DATA);
                showTranslateInstruction(genericDriverKeyboard, INSTRUCTION_GET_KEYBOARD_DATA, newInstruction);
                for (let i = 0; i < instructionTranslated.length; i++) {
                    newInstruction += instructionTranslated[i];
                    await sleep(1*SEC_IN_MILISEC);
                    showTranslateInstruction(genericDriverKeyboard, INSTRUCTION_GET_KEYBOARD_DATA, newInstruction);
                }
                await sleep(2*SEC_IN_MILISEC);
                sendInstruction(genericDriverKeyboard, newInstruction);
                await sleep(3*SEC_IN_MILISEC);
                randomDeviceState = randomNumber(0,1);
                if (randomDeviceState == 0) {
                    device.state = 0;
                    showDeviceState(genericDriverKeyboard, device.state);
                } else {
                    device.state = 1;
                    showDeviceState(genericDriverKeyboard, device.state);
                    await sleep(randomNumber(5, 10)*SEC_IN_MILISEC);
                    device.state = 0;
                    showDeviceState(genericDriverKeyboard, device.state);
                }
                await sleep(2*SEC_IN_MILISEC);
                showWaitingMessage(genericDriverKeyboard, WAITING_INPUT_DATA);
                await sleep(randomNumber(5, 10)*SEC_IN_MILISEC);
                receivingNotify(genericDriverKeyboard, RECEIVING_STD_IN);
                await sleep(3*SEC_IN_MILISEC);
                receivingNotify(genericDriverKeyboard, RECEIVING_INSTRUCTION+'<br><strong>'+INSTRUCTION_GET_STD_IN+'</strong>');
                await sleep(1*SEC_IN_MILISEC);
                newInstruction = '';
                instructionTranslated = translateToNewInstructionGeneric(INSTRUCTION_GET_STD_IN);
                showTranslateInstruction(genericDriverKeyboard, INSTRUCTION_GET_STD_IN, newInstruction);
                for (let i = 0; i < instructionTranslated.length; i++) {
                    newInstruction += instructionTranslated[i]+' ';
                    await sleep(1*SEC_IN_MILISEC);
                    showTranslateInstruction(genericDriverKeyboard, INSTRUCTION_GET_STD_IN, newInstruction);
                }
                await sleep(2*SEC_IN_MILISEC);
                sendInstruction(genericDriverKeyboard, newInstruction);
                await sleep(3*SEC_IN_MILISEC);
                receivingNotify(controllerKeyboard, RECEIVING_INSTRUCTION+'<br><strong>'+newInstruction)
                await sleep(3*SEC_IN_MILISEC);
                endJob(genericDriverKeyboard);
                sendInstruction(controllerKeyboard, newInstruction);
                await sleep(3*SEC_IN_MILISEC);
                endJob(controllerKeyboard);
                await sleep(1*SEC_IN_MILISEC);
                jobTerminated();
                break;
            default:
                break;
        }
    }
    show();
}

function receivingNotify(component, notification) {
    printOperation(component, COLOR_RECEIVING, notification);
}

function sendGetDisk(file) {
    printOperation(controllerDisk, COLOR_SENDING, SEND_GET_DISK+'<strong>'+file+'</strong>');
}

function verifyDeviceAvailability(component, device) {
    printOperation(component, COLOR_VERIFY, VERIFY_DEVICE_AVAILABILITY+'<strong>'+device.name);
}

function receivingInstruction(component) {
    printOperation(component, COLOR_RECEIVING, RECEIVING_INSTRUCTION);
}

function translateInstruction(component) {
    printOperation(component, COLOR_WORKING, TRANSLATE_INSTRUCTION);
}

function showTranslateInstruction(component, inputInstruction, outputInstruction) {
    printOperation(component, COLOR_WORKING, TRANSLATE_INSTRUCTION+'<br><strong>'+inputInstruction+'</strong><br>...<br><strong>'+outputInstruction+'</strong>');
}

function waitingDeviceAvailability(component, device) {
    printOperation(component, COLOR_WAITING, WAITING_DEVICE_AVAILABILITY+'<strong>'+device.name+'</strong>');
}

function showWaitingMessage(component, waitingMessage) {
    printOperation(component, COLOR_WAITING, waitingMessage);
}

function receivingDevice(component, device) {
    printOperation(component, COLOR_RECEIVING, '<strong>'+device.name+'</strong>'+RECEIVING_DEVICE);
}

function sendInstruction(component, instruction) {
    printOperation(component, COLOR_SENDING, SEND_INSTRUCTION+'<strong>'+instruction+'</strong>');
}

function showDeviceState(component, state) {
    if (state == 0) {
        printOperation(component, COLOR_RECEIVING, DEVICE_AVAILABLE)
    } else {
        printOperation(component, COLOR_WAITING, DEVICE_OCCUPIED)
    }
}

function loadingDataInDMA() {
    printOperation(controllerDisk, COLOR_WORKING, LOAD_DATA_DMA);
}

function notify(component, notificación) {
    printOperation(component, COLOR_SENDING, notificación);
}

function loadDataInDMA(deviceAddress, initialPositionInMemory, numberOfWords) {
    dma.setDMA(deviceAddress, initialPositionInMemory, numberOfWords);
    printOperation(dmaData, COLOR_EMPTY, '<strong>Dirección del dispositivo: </strong>'+dma.deviceDirection+'<br><strong>Posición inicial de memoria: </strong>'+dma.initialMemoryPosition+'<br><strong>Número de palabras: </strong>'+dma.numberOfWords)
}

function isLoadDataInDMA() {
    printOperation(controllerDisk, COLOR_END_JOB, IS_LOAD_DATA);
}

function notifyDataInDMA() {
    printOperation(controllerDisk, COLOR_SENDING, NOTIFY_DATA_IN_DMA);
}

function receivingNotifyDataInMemory() {
    printOperation(controllerDisk, COLOR_RECEIVING, RECEIVING_NOTIFY_DATA_IN_MEMORY);
}

function cleaningDMA() {
    printOperation(controllerDisk, COLOR_WORKING, CLEANING_DMA);
}

function cleanDMA() {
    printOperation(controllerDisk, COLOR_END_JOB, CLEAN_DMA)
}

function endJob(component) {
    printOperation(component, COLOR_EMPTY, DEFAULT_OPERATION);
}

function printOperation(component, color, message) {
    component.style.background = color;
    component.innerHTML = message;
}

function jobTerminated() {
    window.alert('El subsistema ha terminado su trabajo');
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}