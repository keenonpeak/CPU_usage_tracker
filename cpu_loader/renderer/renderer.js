let manipulaterTimer;
let btn30 = false;
let btn50 = false;
let btn70 = false;
let btn90 = false;

document.querySelector('#btn30').addEventListener('click', () => {
    if (btn30 == false) {
        btn30 = true;
        thirtyClicked();
    }
})

document.querySelector('#btn50').addEventListener('click', () => {
    if (btn50 == false) {
        btn50 = true;
        fiftyClicked();
    }
})

document.querySelector('#btn70').addEventListener('click', () => {
    if (btn70 == false) {
        btn70 = true;
        seventyClicked();
    }
})

document.querySelector('#btn90').addEventListener('click', () => {
    if (btn90 == false) {
        btn90 = true;
        nintyClicked();
    }
})

function thirtyClicked() {
    if (btn30 == true) {
        manipulaterTimer = setInterval(function () {
            api.getMEMusage().then(data => {
                console.log(`cpu stacks up to 30-40%`);
                setTimeout(function () {
                    clearInterval(manipulaterTimer);
                    btn30 = false;
                }, 30000)
            });
        }, 160)
    }
}

function fiftyClicked() {
    if (btn50 == true) {
        manipulaterTimer = setInterval(function () {
            api.getMEMusage().then(data => {
                console.log(`cpu stacks up to 50-60%`);
                setTimeout(function () { 
                    clearInterval(manipulaterTimer); 
                    btn50 = false;
                }, 30000)
            });
        }, 90)
    }
}

function seventyClicked() {
    if (btn70 == true) {
        manipulaterTimer = setInterval(function () {
            api.getMEMusage().then(data => {
                console.log(`cpu stacks up to 70-80%`);
                setTimeout(function () { 
                    clearInterval(manipulaterTimer);
                    btn70 = false; 
                }, 30000)
            });
        }, 70)
    }
}

function nintyClicked() {
    if (btn90) {
        manipulaterTimer = setInterval(function () {
            api.getMEMusage().then(data => {
                console.log(`cpu stacks up to 90-100%`);
                setTimeout(function () { 
                    clearInterval(manipulaterTimer); 
                    btn90 = false;
                }, 30000)
            });
        }, 60)
    }
}