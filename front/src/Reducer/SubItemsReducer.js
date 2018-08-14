function initialState(){
  return {
    listsubitems : []
  }
}

export default function itemsReducer(state=initialState(), action){
  if (action.type === "FIRSTLISTITEMS")
  {
    state = {listsubitems : action.listsubitems}
  }
  else if (action.type === "ITEMCHANGE"){
    const allWithoutIt = state.filter(i => i.id !== action.subitem.id);
    const newArray = allWithoutIt.concat([action.subitem]);
    state = {listsubitems : newArray}
  }

  return state;
}