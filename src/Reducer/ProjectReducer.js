let initalState = {
  file_folder: [],
};

export const ProjectReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SET_FOLDER/FILE":
      return {
        ...state,
        file_folder: action.payload,
      };
    case "ADD_FOLDER/FILE":
      return {
        ...state,
        file_folder: [...state.file_folder, action.payload],
      };
    case "DELETE_FOLDER/FILE":
      let arr = state.file_folder.filter(i=>{
        return i.id!==action.payload
      })
      return{
        ...state,
        file_folder:arr
      }
    default:
      return state;
  }
};
