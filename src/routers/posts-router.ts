import {Request,Response,Router} from "express";

export const postsRouter = Router({})

let posts = [
    {id: 1, title: 'Hello', shortDescription: 'It is me', content: 'Video', bloggerId: 0, bloggerName: 'Deniss'},
    {id: 2, title: 'Bue', shortDescription: 'It is not me', content: 'Stream', bloggerId: 1, bloggerName: 'Vadims'},
]

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if(typeof id !== 'number') {
        res.send(400)
        return
    }
    const post = posts.find(p => p.id === id)
    if (post) {
        res.status(200).send(post)
    }else {
        res.send(404)
    }
})
postsRouter.post('/',  (req: Request, res: Response) => {

    let errors = []

    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +req.body.bloggerId

    if (title === null || !title || typeof title !== 'string' || !title.trim() || title.length > 30) {
        errors.push({
            message: "string",
            field: "title"
        })
    }

    if (shortDescription ===null || !shortDescription || typeof shortDescription !== 'string' || !shortDescription.trim() || shortDescription.length > 100) {
        errors.push({
            message: "Invalid shortDescription",
            field: "shortDescription"
        })
    }

    if (content === null || !content || typeof content !== 'string' || !content.trim() || content.length > 1000) {
        errors.push({
            message: "Invalid content!",
            field: "content"
        })
    }

    // @ts-ignore
    if (!bloggers.find(blogger => blogger.id === bloggerId)) {
        errors.push({
            message: "Invalid bloggerId!",
            field: "bloggerId"
        })
    }


    if (errors.length > 0) {
        res.status(400).send({errorsMessages: errors})
    }

    const newPost = {
        bloggerId: +req.body.bloggerId,
        bloggerName: req.body.title,
        id: +(new Date()),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content
    }

    posts.push(newPost)
    res.status(201).send(newPost)

})
postsRouter.put('/:id',  (req: Request, res: Response) => {

    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +req.body.bloggerId

    let errors = []

    if (title === null || !title || typeof title !== 'string' || !title.trim() || title.length > 30) {
        errors.push({
            message: "string",
            field: "title"
        })
    }

    if (shortDescription ===null || !shortDescription || typeof shortDescription !== 'string' || !shortDescription.trim() || shortDescription.length > 100) {
        errors.push({
            message: "Invalid shortDescription",
            field: "shortDescription"
        })
    }

    if (content === null || !content || typeof content !== 'string' || !content.trim() || content.length > 1000) {
        errors.push({
            message: "Invalid content!",
            field: "content"
        })
    }

    // @ts-ignore
    if (!bloggers.find(blogger => blogger.id === bloggerId)) {
        errors.push({
            message: "Invalid bloggerId!",
            field: "bloggerId"
        })
    }

    if (errors.length > 0) {
        res.status(400).send({errorsMessages: errors})
    }

    const id = +req.params.id
    const post = posts.find(item => item.id === id)
    if (post) {
        post.title = title,
            post.shortDescription = shortDescription,
            post.content = content,
            post.bloggerId = bloggerId,
            res.status(204).send(posts)
    } else {
        res.send(404)
    }
})
postsRouter.delete('/:id',  (req: Request, res: Response) => {
    const id = +req.params.id

    if (!id) {
        res.status(404)
    }

    const newPosts = posts.filter(item => { return item.id !== id })

    if (newPosts.length < posts.length) {
        posts = newPosts
        res.send(204)
    } else {
        res.send(404)
    }
})