import {atom} from "nanostores"

export const imageData = atom(["", ""])
export const showImage = atom(false)
export const addNewImage = (src = "", alt = "") => imageData.set([src, alt])
