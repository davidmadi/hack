export default function itemsReducer(state=[], action){
  if (action.type == "FIRSTLISTITEMS")
  {
    return action.listsubitems;
  }
  else if (action.type == "ITEMCHANGE"){
    const allWithoutIt = state.filter(i => i.id != action.item.id);
    const newArray = allWithoutIt.concat(allWithoutIt, [action.item]);
    return newArray;
  }

  return state;
}