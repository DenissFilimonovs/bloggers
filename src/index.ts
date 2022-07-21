import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser())

let bloggers = [
    {id: 1 , name: 'Deniss', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdQ'},
    {id: 2 , name: 'Vadims', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdL'},
    {id: 3 , name: 'Jurijs', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdK'},
]

let posts = [
    {
        id: 0,
        title: "deploy to heroku",
        shortDescription: "string",
        content: "string",
        bloggerId: 0,
        bloggerName: "Dimych"
    },
    {
        id: 1,
        title: "junior interview",
        shortDescription: "string",
        content: "string",
        bloggerId: 1,
        bloggerName: "Timur"
    }]

app.get('/bloggers', (req: Request, res: Response) => {
    res.send(bloggers)
})

app.post('/bloggers', (req: Request, res: Response) => {
    const body = req.body
    if (body) {
        bloggers.push({...body, id: bloggers.length})
        res.sendStatus(201)
    }
})

app.get(`/bloggers/:id`, (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(i => i.id === id)
    if (blogger) {
        res.sendStatus(200).send(blogger)
    }
})


app.put('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(i => i.id === id)
    if (blogger) {
        if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('youtubeUrl')) {
            blogger.name = req.body.title
            blogger.youtubeUrl = req.body.youtubeUrl
        } else {
            res.sendStatus(400)
        }
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

app.delete('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (id) {
        bloggers = bloggers.filter(i => i.id !== +req.params.id)
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

// Posts

app.get('/posts', (req: Request, res: Response) => {
    res.status(200).send(posts)
})

app.post('/posts', (req: Request, res: Response) => {
    const body = req.body
    if (body) {
        res.status(201).send({
            ...body,
            id: posts.length + 1,
            bloggerName: bloggers.find(i => i.id === body.bloggerId)?.name
        })
    } else {
        res.sendStatus(400)
    }
})

app.get('/posts:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const post = bloggers.find(i => i.id === id)
    if (post) {
        res.sendStatus(200).send(post)
    }
})


app.put('/posts:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const post = posts.find(i => i.id === id)
    if (post) {
        if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('shortDescription') && req.body.hasOwnProperty('content') && req.body.hasOwnProperty('bloggerId')) {
            post.title = req.body.title
            post.shortDescription = req.body.shortDescription
            post.content = req.body.content
            post.bloggerId = req.body.bloggerId
        } else {
            res.sendStatus(400)
        }
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

app.delete('/posts:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (id) {
        posts = posts.filter(i => i.id !== +req.params.id)
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})