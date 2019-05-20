
const initialState={

}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_MUSIC': 
            return {
                ...action.allMusic,
            };

        default: 
            return state;    

    }

}