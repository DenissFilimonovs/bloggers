import express, {Request,Response} from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import {type} from "os";
const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})
let bloggers = [
    {id: 1 , name: 'Deniss', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdQ'},
    {id: 2 , name: 'Vadims', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdL'},
    {id: 3 , name: 'Jurijs', youtubeUrl: 'https://www.youtube.com/channel/UCU0dumcch7RNqHPMQaVsfdK'},
]
let posts = [
    {id:1, title:'Hello', shortDescription:'It is me', content:'Video', bloggerId: 0, bloggerName:'Deniss'},
    {id:2, title:'Bue', shortDescription:'It is not me', content:'Stream', bloggerId: 0, bloggerName:'Vadims'},
    {id:3, title:'I go out', shortDescription:'No video anymore', content:'Video', bloggerId: 0, bloggerName:'Jurijs'},
]

const errors = {
    title: "incorrect title",
    message: 'Message with error explanation for certain field',
    field: 'What field/property of input model has error'
}

app.use(parserMiddleware)
app.use(cors())


app.get('/', (req:Request, res:Response) => {
    let helloMessage = 'Hello World!!!'
    res.send(helloMessage)
})

app.get('/bloggers', (req:Request,res:Response) => {
    res.send(bloggers)
})

app.get('/bloggers/:bloggerId', (req:Request,res:Response) => {
    const id = +req.params.bloggerId
    const blogger = bloggers.find(b=>b.id === id)
    if(blogger) {
        res.status(200).send(blogger)
    }else{
        res.send(404)
    }
})

app.post('/bloggers',(req:Request,res:Response) => {
    const id = +(new Date())
    let name = req.body.name;
    let youtubeUrl = req.body.youtubeUrl
    if(!name || typeof name !=='string'|| typeof youtubeUrl !== 'string' || !youtubeUrl) {
        res.status(400).send(errors)
    }else
        {
            const newBlogger = {
                id: Number(new Date()),
                name: name,
                youtubeUrl: youtubeUrl
            }
            bloggers.push(newBlogger)
            if (newBlogger) {
                res.status(201).send(newBlogger)
            } else {
                res.status(400).send(errors) //tut
            }
        }
})

app.put('/bloggers/:id',(req:Request,res:Response) => {
    const id = +req.params.id
    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl
    if(typeof name === 'undefined' && typeof name !== 'string' || typeof youtubeUrl === 'undefined' && typeof youtubeUrl !== 'string') {
        res.status(400).send(errors)
    }else
        {
            const blogger = bloggers.find(b => b.id === id)
            if (blogger) {
                blogger.name = name;
                blogger.youtubeUrl = youtubeUrl;
                res.status(204).send(blogger)
            } else {
                res.status(400).send() //tut
            }
        }
})

app.delete('/bloggers/:id',(req:Request,res:Response) => {
    const id = +req.params.id
    const newBlogger = bloggers.find(b=>b.id===id)
    if(typeof newBlogger === 'undefined') {
        res.status(404).send(errors)
    }else {
        for(let i=0; i<bloggers.length;i++) {
            if(bloggers[i].id === id) {
                bloggers.splice(i,1)
            }
        }
        res.send(204)
    }
})

app.get('/posts', (req:Request,res:Response) => {
    res.send(posts)
})

app.get('/posts/:Id', (req:Request,res:Response) => {
    const id = +req.params.postsId
    const post = posts.find(p=>p.id === id)
    if(post) {
        res.status(200).send(post)
    }else{
        res.send(404)
    }
})

app.post('/posts',(req:Request,res:Response) => {
    let id = Number((new Date()))
    let title = req.body.title;
    let shortDescription = req.body.shortDescription
    let content = req.body.content
    let bloggerId = Number(req.body.bloggerId)
    let blogger = bloggers.find(b=>b.id===bloggerId)
    if(blogger) {
        let bloggerName = blogger.name
        if (typeof title !== 'string' || typeof shortDescription !== 'string' || typeof content !== 'string' || typeof bloggerId !== 'number') {
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
app.put('/posts/:id',(req:Request,res:Response) => {
    let id = Number(req.params.id)
    let title = req.body.title
    let shortDescription = req.body.shortDescription
    let content = req.body.content
    let bloggerId = req.body.bloggerId
    let bloggerName = req.body.bloggerName
/*
    const trimmedTitle = title?.trim();
    const trimmedshortDescription = shortDescription?.trim()
    const trimmedcontent = content?.trim()
    const trimmedbloggerId = bloggerId?.trim()
    const trimmedbloggerName = bloggerName?.trim()

    const errors = []*/

    if(typeof title === 'undefined' || typeof title !== 'string')

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

app.delete('/posts/:id',(req:Request,res:Response) => {
    const id = Number(req.params.id)
    const newPost = posts.find(p=>p.id===id)
    if(typeof newPost === 'undefined') {
        res.status(404).send(errors)
    }else {
        for(let i=0;i<posts.length;i++) {
        if(posts[i].id === id) {
        posts.splice(i,1)
        }
        }
        res.send(204)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})