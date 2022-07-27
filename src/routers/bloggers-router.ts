import {Request, Response, Router} from "express";

export const bloggersRouter = Router({})

let bloggers = [
    {id: 1, name: 'Deniss', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdQ'},
    {id: 2, name: 'Vadims', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdL'},
    {id: 3, name: 'Jurijs', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdK'},
]

bloggersRouter.get('/', (req: Request, res: Response) => {
    res.send(bloggers)
})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(p => p.id === id)
    if (blogger) {
        res.status(200).send(blogger)
    }else {
        res.send(404)
    }
})
bloggersRouter.post('/',  (req: Request, res: Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    const regEx = new RegExp('^https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    const found = regEx.test(youtubeUrl)

    let errors = []

    if (!name || typeof name !== 'string' || !name.trim() || name.length > 15) {
        errors.push({
            message: "Incorrect name",
            field: "name"
        })
    }

    if (!youtubeUrl || typeof youtubeUrl !== 'string' || !youtubeUrl.trim() || youtubeUrl.length > 100 || !found) {
        errors.push({
            message: "Incorrect youtubeUrl",
            field: "youtubeUrl"
        })
    }

    if (errors.length >0) {
        res.status(400).send({errorsMessages: errors})
    } else {
        const newBlogger = {
            id: +(new Date()),
            name: req.body.name,
            youtubeUrl: req.body.youtubeUrl
        }
        bloggers.push(newBlogger)
        res.status(201).send(newBlogger)
    }
})
bloggersRouter.put('/:id', (req: Request, res: Response) => {
    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl

    const regEx = new RegExp('^https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    const found = regEx.test(youtubeUrl)

    let errors = []

    if (!name || typeof name !== 'string' || !name.trim() || name.length > 15) {
        errors.push({
            message: "Incorrect name",
            field: "name"
        })
    }

    if (!youtubeUrl || typeof youtubeUrl !== 'string' || !youtubeUrl.trim() || youtubeUrl.length > 100 || !found) {
        errors.push({
            message: "Incorrect youtubeUrl",
            field: "youtubeUrl"
        })
    }

    if (errors.length >0) {
        res.status(400).send({errorsMessages: errors})
    } else {
        const id = +req.params.id
        const blogger = bloggers.find(item => item.id === id)
        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            res.status(204).send(bloggers)
        } else {
            res.send(404)
        }
    }
})
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    if (!id) {
        res.status(404)
    }

    const newBloggers = bloggers.filter(item => { return item.id !== id })

    if (newBloggers.length < bloggers.length) {
        bloggers = newBloggers
        res.send(204)
    } else {
        res.send(404)
    }
})
