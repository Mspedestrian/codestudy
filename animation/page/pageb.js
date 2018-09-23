class PageB {
    constructor(callback) {
        // alert('a');
        setTimeout(() => {
            console.log('ahahh')
            callback()
        }, 1000);
    }
}