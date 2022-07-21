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

const errors = {
 errorsMessages: [{ message: 'string', field: "youtubeUrl" }, { message: 'string', field: "name" }]
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
})

app.get('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(b => b.id === id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})

app.get('/bloggers', (req: Request, res: Response) => {
    res.send(bloggers)
})

app.post('/bloggers', (req: Request, res: Response) => {
    const id = +(new Date())
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    if ((typeof name || typeof youtubeUrl) !== "string") {
        res.status(400).send(errors)
    } else {
        const newBlogger = {
            id: id,
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        if (newBlogger) {
            res.status(201).send(newBlogger)
        } else {
            res.status(400).send(errors)
        }
    }
})

app.put('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    if ((typeof name || typeof youtubeUrl) === "undefined") {
        res.status(400).send(errors)
    } else {
        if ((typeof name || typeof youtubeUrl) !== "string") {
            res.status(400).send(errors)
        } else {
            const blogger = bloggers.find(b => b.id === id)
            if (blogger) {
                blogger.name = name
                blogger.youtubeUrl = youtubeUrl
                res.send(204)
            } else {
                res.status(400).send(errors)
            }
        }
    }
})

app.delete('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(b => b.id === id)
    if (typeof blogger === "undefined") {
        res.status(404).send(errors)
    } else {
        for (let i = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
            }
        }
        res.send(204)
    }
})


app.get('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const post = posts.find(p => p.id === id)
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts)
})

app.post('/posts', (req: Request, res: Response) => {
    const id = +(new Date())
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +(req.body.bloggerId)
    const blogger = bloggers.find(b => b.id === bloggerId)
    if (blogger) {
        const bloggerName = blogger.name
        if (typeof title !== "string" || typeof shortDescription !== "string" || typeof content !== "string" || typeof bloggerId !== "number") {
            res.status(400).send(errors)
        } else {
            const newPost = {
                id: id,
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                bloggerName: bloggerName
            }
            if (newPost) {
                posts.push(newPost)
                res.status(201).send(newPost)
            } else {
                res.status(400).send(errors)
            }
        }
    }


})

app.put('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = req.body.bloggerId
    console.log(typeof bloggerId)
    if ((typeof title || typeof shortDescription || typeof content || typeof bloggerId) === "undefined") {
        res.status(400).send(errors)
    } else {
        if ((typeof title || typeof shortDescription || typeof content) !== "string" || typeof bloggerId !== "number") {
            res.status(400).send(errors)
        } else {
            const post = posts.find(p => p.id === id)
            if (post) {
                post.title = title
                post.shortDescription = shortDescription
                post.content = content
                post.bloggerId = bloggerId
                res.send(204)
            } else {
                res.status(404).send(errors)
            }
        }
    }
})

app.delete('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const post = posts.find(p => p.id === id)
    if (typeof post === "undefined") {
        res.status(404).send(errors)
    } else {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
            }
        }
        res.send(204)
    }
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})