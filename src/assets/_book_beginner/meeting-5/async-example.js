function task1() {
    for(let i = 0; i < 100; i++) {
        console.log("Doing task 1...");
    }
    console.log("Finished task 1");
}

function task2() {
    for(let i = 0; i < 100; i++) {
        console.log("Doing task 2...");
    }
    console.log("Finished task 2");
}
 
function task3() {
    for(let i = 0; i < 100; i++) {
        console.log("Doing task 3...");
    }
    console.log("Finished task 3");
}

function synchronous() {
    task1();
    task2();
    task3();
}

function asynchronous() {
    console.log("Task 1 Test");
    setTimeout(() => { task1(); console.log("Task 1 is Done"); }, 51);
    console.log("Task 1 Test Finished");
    console.log("Task 2 Test");
    setTimeout(() => { task2(); console.log("Task 2 is Done"); }, 50);
    console.log("Task 1 Test Finished");
    console.log("Task 3 Test");
    setTimeout(() => { task3(); console.log("Task 3 is Done"); }, 50);
    console.log("Task 3 Test Finished");
}
asynchronous();
