class TestClass {
    constructor() {
        this.state = "In constructor";
    }
    changeState(state) {
        this.state = state;
    }
}
let testClass = new TestClass();
testClass.changeState("Not in constructor");