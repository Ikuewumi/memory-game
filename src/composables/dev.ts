import { z } from "astro/zod"
import { zUrlString } from "./engine"


export const urlString = z.string().url().transform(url => {
    return url.endsWith('/') ? url : `${url}/`
})

const link = "https://i.ibb.co/x7w12Vm/Untitled-2024-04-09-1938-1-1.jpg"


const getImageData = async (url:string, controller:AbortController = null) => {
    zUrlString.parse(url)
    const res = await fetch(url, {
        signal: controller?.signal ?? null
    })
    const blob = await res.blob()
    const bufferArray = await blob.arrayBuffer()    
    const buffer = Buffer.from(bufferArray)
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`

    return dataURL 
}


getImageData(link)
