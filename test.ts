var firstDate = new Date(Date.now());

console.log(firstDate);

setTimeout( () => {
    var secondDate = new Date(Date.now());
    console.log(secondDate);

    var timeDiff = (secondDate.getTime() - firstDate.getTime()) / 1000;
    console.log(timeDiff);
    
}, 2000)