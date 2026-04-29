//only calculation logic

function calculateTotal(state){
    let sum = 0;

    for (let key in state){
        sum += state[key]
    }

    return sum;
}

