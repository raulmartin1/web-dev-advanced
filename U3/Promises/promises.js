function makePizza(toppings = []) {
 const pizzaPromise = new Promise(function(resolve, reject) {
 //reject() -> if something went wrong, we can reject this promise
 if (toppings.includes('pineapple')) {
 reject('Seriously? get out');
 }
 const amountOfTimeToBake = 1500 * toppings.length;
 //wait amountOfTimeToBake milliseconds for the pizza to be baked
 setTimeout(() => {
 //resolve() -> when you are ready, you can resolve this promise
 resolve(`Here is your pizza with: ${toppings.join(', ')}`);
 }, amountOfTimeToBake);
 });
 return pizzaPromise;
 }

    const pepperoniPromise = makePizza(['pepperoni']);
    console.log(pepperoniPromise);


    pepperoniPromise.then(function(pizza) {
    //this only runs when the promise is fulfilled
    console.log(pizza);
    });
    console.log('this is printed BEFORE the fulfilled promise');


    // 4. PROMISES and THENs can be chained
    makePizza(['peper'])
    .then(function(pizza) {
    console.log(pizza);
    return makePizza(['ham', 'cheese']);
    })
    .then(function(pizza) {
    console.log(pizza);
    return makePizza(['a', 'b', 'c']);
    })
    .then(function(pizza) {
    console.log(pizza);
    });

    // 5. CONCURRENTLY
    const pizzaPromise1 = makePizza(['b']);
    const pizzaPromise2 = makePizza(['n', 'm']);
    const dinnerPromise = Promise.all([pizzaPromise1, pizzaPromise2]);
    dinnerPromise.then(dinner => {
    const [pizza1, pizza2] = dinner;
    console.log('dinnerPromise: ', pizza1, pizza2);
    });

    // 6. get the fastest promise 
    const firstPizzaPromise = Promise.race([pizzaPromise1, pizzaPromise2]);
    firstPizzaPromise.then(pizza => {
    console.log('first pizza ready:', pizza);
    });


    // 7. catch() to handle REJECTED PROMISES
    makePizza(['cheese', 'pineapple']).then(pizza => {
    console.log(pizza);
    }).catch(err => { //here we handle the error of the PROMISE-REJECTED
    console.log(err);
    });
    makePizza(['k'])
    .then(function(pizza) {
    console.log(pizza);
    return makePizza(['pineapple']);
    })
    .then(function(pizza) { //REJECT! and the chain stops here
    console.log(pizza);
    return makePizza(['f', 'g']);
    })
    .then(function(pizza) {
    console.log(pizza);
    }).catch(err => { //One catch() for the chain
    console.log(err);
    });

    // 8. Promise.allSettled() to run promises concurrently and retrieve an ARRAY of objects
    // with the status and results of all the promises run.
    const p1 = makePizza(['pineapple']);
    const p2 = makePizza(['s']);
    const dinnerPromise2 = Promise.allSettled([p1, p2]);
    dinnerPromise2.then(results => {
    results.forEach(result => {
    console.log(result);
    console.log(result.status);
    });
    });

    // 9. Use of async – await instead of then():
    async function makeDinner() {
    const pizza = await makePizza(['h1']);
    console.log('a', pizza);
    }
    makeDinner();
    console.log('this is printed BEFORE the pizza with h1');

    // 10. Use of async – await for CONCURRENCY
    async function makeDinner2() {
    const p1 = makePizza(['pepperoni']);
    const p2 = makePizza(['cheese']);
    const ps = await Promise.all([p1, p2]);
    console.log('c', ps);
    };
    makeDinner2();

    // 11.  Use of async – await with ERROR HANDLING
    function handleError(err) {
    console.log(err);
    }
    async function go1() {
    //handle the error at the time you define the function
    const pizza = await makePizza(['pineapple']).catch(handleError);
    console.log(pizza); //in error, this retrieves "undefined"
    }
    go1();
    async function go2() {
    const pizza = await makePizza(['pineapple']);
    console.log(pizza);
    }
    //handle the error when you call the function
    go2().catch(handleError);
    //make a "safe function" with HIGHER ORDER FUNCTION
    function makeSafe(fn, handleError) {
    return function() {
    fn().catch(handleError);
    }
    }
    const safeGo = makeSafe(go2, handleError);
    safeGo();