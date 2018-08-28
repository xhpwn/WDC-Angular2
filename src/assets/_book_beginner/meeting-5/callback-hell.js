function task4(callback) {
    setTimeout(() => {
        callback();
        console.log('callback 1 done!');
    }, 1000);
}
function task5(callback) {
    setTimeout(() => {
        callback();
        console.log('callback 2 done!');
    }, 500);
}
function task6(callback) {
    setTimeout(() => {
        callback();
        console.log('callback 3 done!');
    }, 800);
}
function sequential() {
    task4(() => {
        task5(() => {
            task6(() => {
                console.log('LAST ONE!');
            });
        });
    });
}
function promiseTask(task) {
    return new Promise((resolve) => {
        task(resolve);
    }, 200);
}
function sequentialPromises() {
    promiseTask(task4).then(() => promiseTask(task5)).then(() => promiseTask(task6)).then(() => console.log('ALL DONE!'));
}
function add() {
    let form = document.forms[0];
    let num1 = form.querySelector('input[name="num1"]').value;
    let num2 = form.querySelector('input[name="num2"]').value;
    fetch(`add?num1=${num1}&num2=${num2}`).then((result) =>{
        return result.json();
    }).then((data) => console.log(data.result));
}
//sequential();
sequentialPromises();
