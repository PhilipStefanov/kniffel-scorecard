//only calculation logic
const Scoring = (() => {

    const UPPER_IDs = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    const LOWER_IDs = ['three-oak', 'four-oak', 'fullhouse', 'smallStreet',
                       'bigStreet', 'kniffel', 'chance'];

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

    function getLowerScore(player){
        return sum(LOWER_IDs, player.scores);
    }

    function hasBonus(player){
        if (getUpperScore(player) >= 63){
            return 35;
        } else return 0;
    }

    function totalUpper(player){
        return getUpperScore(player) + hasBonus(player);
    }

    function totalScore(player){
        return totalUpper(player) + getLowerScore(player);
    }

    function resolveValue(category, player){
        if (category.type === 'input'){
            return player.scores[category.id] ?? 0;
        } else {
            if (category.id === 'bonus') return hasBonus(player);
            if (category.id === 'gesamt') return getUpperScore(player);
            if (category.id === 'upper-total') return totalUpper(player);
            if (category.id === 'gesamtUnten') return getLowerScore(player);
            if (category.id === 'total') return totalScore(player);      
            
        }
        
    }

    function getAllowedValues(category){
        let allowed = [];


        if (category.section === 'upper'){
            const step = Number(category.val);
            for(let i=0; i<=5; i++){
                allowed.push(i*step);
            }
        }

        if (category.section === 'lower'){
            if (category.id === 'three-oak' || category.id === 'four-oak' || category.id === 'chance'){
                for (let i = 0; i <= 30; i++){
                    allowed.push(i);
                }
            }
            else if (category.id === 'fullhouse'){
                allowed.push(0);
                allowed.push(25);
            }
            else if (category.id === 'smallStreet'){
                allowed.push(0);
                allowed.push(30);
            }
            else if (category.id === 'bigStreet'){
                allowed.push(0);
                allowed.push(40);
            }
            else if (category.id === 'kniffel'){
                allowed.push(0);
                allowed.push(50);
            }
        }
        
        return allowed;

    }
         
    return { getUpperScore, hasBonus, totalUpper, resolveValue, getAllowedValues, getLowerScore, totalScore};
})();
 
