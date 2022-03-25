function translateToNewInstructionSpecific(instrucción) {
    let regEx = /\s* \s*/;
    let newInstructionList = instrucción.split(regEx);
    let newInstruction = [];
    for (let i = 0; i < newInstructionList.length; i++) {
        switch (newInstructionList[i]) {
            case 'VERIFY':
                newInstruction.push('VF_');
                break;
            case 'AVAILABILITY':
                newInstruction.push('AV_');
                break;
            case 'LOAD':
                newInstruction.push('LD_');
                break;
            case 'FILE':
                newInstruction.push('F_');
                break;
            case 'SHOW':
                newInstruction.push('SH_');
                break;
            case 'GET':
                newInstruction.push('GT_');
                break;
            case 'INPUT':
                newInstruction.push('IN_');
                break;
            case 'DATA':
                newInstruction.push('DT_');
                break;
            default:
                newInstruction.push(newInstructionList[i]);
                break;
        }
    }
    return newInstruction;
}

function translateToNewInstructionGeneric(instrucción) {
    let regEx = /\s*_\s*/;
    let newInstructionList = instrucción.split(regEx);
    let newInstruction = [];
    for (let i = 0; i < newInstructionList.length; i++) {
        switch (newInstructionList[i]) {
            case 'ST':
                newInstruction.push('STANDARD');
                break;
            case 'IN':
                newInstruction.push('INPUT');
                break;
            default:
                newInstruction.push(newInstructionList[i]);
                break;
        }
    }
    return newInstruction;
}