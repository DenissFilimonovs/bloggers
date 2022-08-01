import express, {Request, Response} from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import {type} from "os";

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})
let bloggers = [
    {id: 1, name: 'Deniss', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdQ'},
    {id: 2, name: 'Vadims', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdL'},
    {id: 3, name: 'Jurijs', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdK'},
]
let posts = [
    {id: 1, title: 'Hello', shortDescription: 'It is me', content: 'Video', bloggerId: 0, bloggerName: 'Deniss'},
    {id: 2, title: 'Bue', shortDescription: 'It is not me', content: 'Stream', bloggerId: 0, bloggerName: 'Vadims'},
]
app.use(parserMiddleware)
app.use(cors())


app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World!!!'
    res.send(helloMessage)
})

app.get('/bloggers', (req: Request, res: Response) => {
    res.send(bloggers)
})
app.get('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(p => p.id === id)
    if (blogger) {
        res.status(200).send(blogger)
    }else {
        res.send(404)
    }
})
app.post('/bloggers',  (req: Request, res: Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    const regEx = new RegExp('^https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')


    let errors = []
    const authorized = req.headers;
    if (!authorized) {
        res.status(401).send("unAthourized");
        return;
    }

    if (!name || typeof name !== 'string' || !name.trim() || name.length > 15) {
        errors.push({
            message: "Incorrect name",
            field: "name"
        })
    }

    if (!youtubeUrl || typeof youtubeUrl !== 'string' || !youtubeUrl.trim() || youtubeUrl.length > 100  ) {
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
app.put('/bloggers/:id', (req: Request, res: Response) => {
    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl

    const regEx = new RegExp('^https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    const found = regEx.test(youtubeUrl)

    let errors = []
    const authorized = req.headers;
    if (!authorized) {
        res.status(401).send("unAthourized");
        return;
    }

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
app.delete('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    if (!id) {
        res.status(404)
    }
    const authorized = req.headers;
    if (!authorized) {
        res.status(401).send("unAthourized");
        return;
    }

    const newBloggers = bloggers.filter(item => { return item.id !== id })

    if (newBloggers.length < bloggers.length) {
        bloggers = newBloggers
        res.send(204)
    } else {
        res.send(404)
    }
})

app.get('/posts', (req: Request, res: Response) => {
    res.status(200).send(posts)
})
app.get('/posts/:id', (req: Request, res: Response) => {
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
app.post('/posts',  (req: Request, res: Response) => {

    let errors = []

    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +req.body.bloggerId
    const authorized = req.headers;
    if (!authorized) {
        res.status(401).send("unAthourized");
        return;
    }

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
app.put('/posts/:id',  (req: Request, res: Response) => {

    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +req.body.bloggerId

    let errors = []
    const authorized = req.headers;
    if (!authorized) {
        res.status(401).send("unAthourized");
        return;
    }

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
app.delete('/posts/:id',  (req: Request, res: Response) => {
    const id = +req.params.id
    const authorized = req.headers;
    if (!authorized) {
        res.status(401).send("unAthourized");
        return;
    }

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

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })