import { existsSync } from "node:fs"
import { opendir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

/** @typedef {{name: string, images: Set<string>}} ImagesObject */


/**
 * @typedef {Object} Question
 * @property {string} question - The question content.
 * @property {string} answer - The answer to the question.
 * @property {string} [text] - Additional text content (optional).
 * @property {string} [image] - URL of an image associated with the question (optional).
 */

/**
 * @typedef {Object} Metadata
 * @property {string} title - The title of the cuiz.
 * @property {string} [image] - URL of an image associated with the cuiz (optional).
 * @property {string} description - Description of the cuiz.
 * @property {string} author - The author of the cuiz.
 * @property {string} course - The course or category to which the cuiz belongs.
 * @property {"easy" | "medium" | "hard"} difficulty - The difficulty level of the cuiz.
 */

/**
 * @typedef {Object} Data
 * @property {string} [text] - Additional text content (optional).
 * @property {string} [image] - URL of an image associated with the cuiz (optional).
 * @property {Question[]} questions - Array of questions in the cuiz.
 */

/**
 * @typedef {Data & Metadata} Quiz
 */


/**
 *  @typedef {Record<string, string>} ImageFileContents
 *
 */



/**
 * @param {string} url
 * @returns {string}
 */
const parseURL = (url) => (url.endsWith('/') ? url : `${url}/`)


/**
 * @param {string} url
 * @param {AbortController} controller
 * @returns {Promise<string>}
 *
 */
const getImageData = async (url, controller) => {
    const res = await fetch(url, {
        signal: controller?.signal ?? null
    })
    const blob = await res.blob()
    const bufferArray = await blob.arrayBuffer()
    const buffer = Buffer.from(bufferArray)
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`

    return dataURL
}



/**
 * @param {string} relativeUrl
 * @returns {Promise<string[]>}
 */
const getSourceFiles = async (relativeUrl) => {
    const dir = await opendir(path.resolve(relativeUrl));

    /** @type {string[]} */
    const files = []

    for await (const entry of dir) {
        const isValid = entry.isFile() && entry.name.endsWith('.json')
        if (isValid) files.push(entry.name)
    }

    return files
}



/**
 * @param {string} fileName
 *
 */
const getImagePathsFromJSON = async (fileName) => {
    /** @type {ImagesObject} */
    const output = {
        name: fileName,
        images: new Set()
    }

    const file = await readFile(fileName, { encoding: "utf8" })


    /** @type {Quiz} json */
    const json = JSON.parse(file)

    if ("image" in json) output.images.add(parseURL(json.image))

    json.questions.forEach(question => {
        if ("image" in question) output.images.add(parseURL(question.image))
    })



    return output



}




/**
 *@param {string} filePath
 *@param {string} cacheDirectory
 *@returns {string} cacheFileName
 */
const getCacheFileName = (filePath, cacheDirectory) => {

    const file = path.parse(filePath)
    const fileName = `${file.name.toLowerCase().replace(" ", "-")}${file.ext}`
    const cacheFileName = path.resolve(cacheDirectory, fileName)

    return cacheFileName

}


/**
 *  @param {string} cacheFileName
 *  @param {ImagesObject} imagesData
 */
const modifyCache = async (cacheFileName, imagesData) => {
    const cacheExists = existsSync(cacheFileName)

    /** @type {Record<string, string>} */
    const outputFile = {}

    /** @type {Promise<any>[]} */
    const promises = []

    if (!cacheExists) {
        imagesData.images.forEach(image => {
            const imagePromise = getImageData(image).then(url => outputFile[image] = url)
            promises.push(imagePromise)
        })

    } else {
        const currentImages = await readFile(cacheFileName, { encoding: "utf-8" })

        /** @type {ImageFileContents} */
        const imageFileContents = JSON.parse(currentImages)
        
        imagesData.images.forEach(image => {
            if (image in imageFileContents) {
                console.info("cache hit!")
                outputFile[image] = imageFileContents[image]
            } else {
                const imagePromise = getImageData(image).then(url => outputFile[image] = url)
                promises.push(imagePromise)
            }
        })
    }

    if (promises.length) await Promise.all(promises)
    return writeFile(cacheFileName, JSON.stringify(outputFile, null) + "\n", { encoding: 'utf8' })
}




const runJob = async () => {
    const RELATIVE_PATH = "./src/content/quiz/"
    const CACHE_RELATIVE_PATH = "./public/images/"
    const fileNames = await getSourceFiles(RELATIVE_PATH);

    /** @type {Promise<ImagesObject>[]} */
    const jsonPromises = fileNames.map(file => {
        return new Promise((resolve, reject) => {
            const fileName = path.resolve(RELATIVE_PATH, file)
            return getImagePathsFromJSON(fileName).then(resolve).catch(reject)
        })
    })

    const filesArray = await Promise.all(jsonPromises)
    console.log(filesArray)
    filesArray.forEach((file) => {
        const cacheFileName = getCacheFileName(file.name, CACHE_RELATIVE_PATH)
        modifyCache(cacheFileName, file)
    })

}





runJob()

