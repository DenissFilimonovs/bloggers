import express, {Request, Response} from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import {type} from "os";
import {bloggersRouter} from "./routers/bloggers-router";
import {postsRouter} from "./routers/posts-router";

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})


app.use(parserMiddleware)
app.use(cors())
app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)


app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World!!!'
    res.send(helloMessage)
})




    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })