function initialState(){
  return {
    itemsList : []
  }
}

export default function itemsReducer(state = initialState(), action){
  if (action.type === "FIRSTLISTITEMS")
  {
    state = {itemsList : action.itemsList};
  }
  else if (action.type === "ITEMCHANGE"){
    const allWithoutIt = state.filter(i => i.id !== action.item.id);
    const newArray = allWithoutIt.concat([action.item]);
    state = {itemsList : newArray};
  }

  return state;
}