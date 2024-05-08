export const SetfileStorage = (payload)=>({
    type:"SET_FOLDER/FILE",
    payload:payload
})
export const AddfileStorage = (payload)=>({
    type:"ADD_FOLDER/FILE",
    payload:payload
})

export const DeletefileStorage = (payload)=>({
    type:"DELETE_FOLDER/FILE",
    payload:payload
})