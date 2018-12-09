const initialStateContact = {
    searchtext:'',
    movies:[],
    maxpage:1
}

export const searchReducer = (state=initialStateContact, action={})=>{
    console.log(action, 'aas');
    switch(action.type){
        case "Search_Change" :
        return Object.assign({},state,{searchtext:action.payload});
        case "Initial_State" :
        return Object.assign({},state,{searchtext:action.payload});
        case "API_Call" :
        return Object.assign({},state,{movies:action.payload1,maxpage:action.payload2});
        default:
        return state
    }   
}