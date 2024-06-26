import { z, defineCollection, reference } from 'astro:content';

const extras = defineCollection({
    type: "data",
    schema: z.object({
        message: z.string(),
        featuredQuizzes: z.array(reference("quiz")).min(3)
    })
})

const author = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        image: z.string().url(),
        description: z.string().min(30),
        links: z.object({
            email: z.string().email().optional(),
            github: z.string().url().optional(),
            twitter: z.string().url().optional(),
            linkedin: z.string().url().optional(),
        })
    })
})

const course = defineCollection({
    type: "data",
    schema: z.object({
        title: z.string(),
        description: z.string().min(30),
        icon: z.string(),
        iconSize: z.number(),
        series: z.array(reference("course")).optional()
    })
})

const metadata = z.object({
    title: z.string(),
    description: z.string(),
    author: reference("author"),
    course: reference("course"),
})

const series = defineCollection({
    type: "data",
    schema: metadata.merge(
        z.object({
            quizzes: z.array(reference("quiz")).min(2)
        })
    )
})





const question = z.object({
    question: z.string(),
    answer: z.string(),
    text: z.string().optional(),
    image: z.string().url().optional()
})




const quiz = defineCollection({
    type: "data",
    schema: metadata.merge(
        z.object({
            image: z.string().url().optional(),
            difficulty: z.enum(["easy", "medium", "hard"]),
            text: z.string().optional(),
            questions: z.array(question).min(1),
            date: z.string(),
            type: z.enum(["dcq", "multiple"]).optional()
        })
    )
})





export const collections = {
    quiz,
    author,
    series,
    course,
    extras
}
