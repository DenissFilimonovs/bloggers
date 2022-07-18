import express, {Request,Response} from "express";
import cors from 'cors'
import bodyParser from "body-parser";
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
    let name = req.body.name;
    if(!name) {
        res.status(400).send({
            errorsMessages: [{
                message: "Incorrect name",
                field: "youtubeUrl"
            },{
                message: "Incorrect name",
                field: "name"
            }]
        })
        return;
    }
    const newBlogger = {
        id: Number(new Date()),
        name: "somename",
        youtubeUrl: "someUrl"
    }
    bloggers.push(newBlogger)
    res.status(201).send(newBlogger)
})

app.put('bloggers/:id',(req:Request,res:Response) => {
    let name = req.body.name
    if(!name) {
        res.status(400).send({
            errorsMessages:[{
                message: 'Incorect title',
                field: 'youtubeUrl'
            },{
                message: "Incorrect name",
                field: "name"
            }]
        })
        return
    }
    const id = +req.params.id;
    const blogger = bloggers.find(b=>b.id===id)
    if(blogger) {
        blogger.name = 'new+ name';
        blogger.youtubeUrl = "https://someurl.com"
        res.status(204).send(blogger)
    }else {
        res.send(404)
    }
})

app.delete('/bloggers/:bloggerId',(req:Request,res:Response) => {
    const id = +req.params.bloggerId
    const newBlogger = bloggers.filter(b=>b.id !== id)
    if(newBlogger.length < bloggers.length) {
        bloggers = newBlogger
        res.send(204)
    }else {
        res.send(404)
    }
})

app.get('/posts', (req:Request,res:Response) => {
    res.send(posts)
})

app.get('/posts/:postsId', (req:Request,res:Response) => {
    const id = +req.params.postsId
    const post = posts.find(p=>p.id === id)
    if(post) {
        res.status(200).send(post)
    }else{
        res.send(404)
    }
})

app.post('/posts',(req:Request,res:Response) => {
    let title = req.body.title;
    if(!title || typeof title !=='string' || !title.trim() || title.length>31) {
        res.status(400).send({
            errorsMessages: [{
                message: "Incorrect name",
                field: "youtubeUrl"
            }, {
                message: "Incorrect name",
                field: "name"
            }]
        })
        return;
    }
    const newPost = {
        id: Number(new Date()),
        title: 'title',
        shortDescription:'No video anymore',
        content:'valid',
        bloggerId: Number(new Date()),
        bloggerName:'Vasja'
    }
    posts.push(newPost)
    res.status(201).send(newPost)
})
app.put('posts/:id',(req:Request,res:Response) => {
    let title = req.body.title
    if(!title || typeof title !=='string' || !title.trim() || title.length<31) {
        res.status(400).send({
            errorsMessages:[{
                message: "Incorrect name",
                field: "youtubeUrl"
            },{
                message: "Incorrect name",
                field: "name"
            }]
        })
        return
    }
    const id = +req.params.id;
    const post = posts.find(b=>b.id===id)
    if(post) {
        post.title = title;
        res.status(204).send(post)
    }else {
        res.send(404)
    }
})
app.delete('/posts/:postId',(req:Request,res:Response) => {
    const id = +req.params.postId
    const newPost = posts.filter(p=>p.id !== id)
    if(newPost.length < posts.length) {
        posts = newPost
        res.send(204)
    }else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})