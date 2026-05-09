//only calculation logic

const IDs = ['ones', 'twos'];

export function sum(ids, scores){
    let s = 0;

    ids.forEach(id => {
        s += scores[id] ?? 0;
    });

    return s;
}