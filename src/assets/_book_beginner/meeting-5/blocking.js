function clickFunctionBlocking() { //while this method is being executed, you can't interact with the UI!
    for (let i = 0; i < 2000; i++) {
        console.log("Doing work...");
    }
    for (let i = 0; i < 2000; i++) {
        console.log("Doing work...");
    }
    for (let i = 0; i < 2000; i++) {
        console.log("Doing work...");
    }
}
function clickFunctionNonBlocking() {
    setTimeout(() => {
        for (let i = 0; i < 2000; i++) {
            console.log("Doing work in the background...");
        }
    }, 0);
    setTimeout(() => {
        for (let i = 0; i < 2000; i++) {
            console.log("Doing work in the background...");
        }
    }, 0);
    setTimeout(() => {
        for (let i = 0; i < 2000; i++) {
            console.log("Doing work in the background...");
        }
    }, 0);
}