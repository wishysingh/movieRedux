const initialStateContact = {
  movies:[]
}

export const detailsReducer = (state=initialStateContact, action={})=>{
  switch(action.type){
      case "API_Call" :
      return Object.assign({},state,{movies:action.payload});
      default:
      return state
  }
}
