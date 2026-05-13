//only calculation logic

const IDs = ['ones', 'twos', 'threes'];


const Scoring = (() => {

    const UPPER_IDs = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

    function sum(ids, scores){
        let s = 0;

        ids.forEach(id => {
            s += scores[id] ?? 0;
        });

        return s;
    }

    function getUpperScore(player){
        return sum(UPPER_IDs, player.scores);
    }

    function hasBonus(player){
        if (getUpperScore(player) >= 63){
            return 35;
        } else return 0;
    }

    function totalUpper(player){
        return getUpperScore(player) + hasBonus(player);
    }
         
    return { getUpperScore, hasBonus, totalUpper };
})();
 
