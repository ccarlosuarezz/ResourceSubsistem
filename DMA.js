class DMA {

    constructor() {
        this.deviceDirection = 'Ninguna';
        this.initialMemoryPosition = 0;
        this.numberOfWords = 0;
    }

    setDMA(deviceDirection, initialMemoryPosition, numberOfWords) {
        this.deviceDirection = deviceDirection;
        this.initialMemoryPosition = initialMemoryPosition;
        this.numberOfWords = numberOfWords;
    }
}