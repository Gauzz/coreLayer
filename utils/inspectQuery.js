const {ERRORS} = require("../config/constants");
const BadRequestError = require("../handlers/error/badRequestError");

const inspectQuery = (query) => {
    let select = null;
    if(query.select){
        if(query.select === ''){
            throw new BadRequestError(ERRORS.INVALID_SELECT_FIELD);
        }
        select = query.select.replace(',',' ');
        delete query.select;
    }
    
    for(let key in query){
        try { 
            let rangeObject = JSON.parse(query[key]);
            delete query[key];
            query[key] = {};
            for(let condition in rangeObject){                
                switch(condition){
                    case '!=' : query[key]['$ne'] = rangeObject[condition];
                                break;
                    case '<' : query[key]['$lt'] = rangeObject[condition];
                                break;
                    case '>' : query[key]['$gt'] = rangeObject[condition];
                                break;
                    case '<=' : query[key]['$lte'] = rangeObject[condition];
                                break;
                    case '>=' : query[key]['$gte'] = rangeObject[condition];
                                break;
                }
            }
        }catch(c){
            // Do Nothing
        }
    }
    return {query, select}
};

module.exports = {
    inspectQuery
};