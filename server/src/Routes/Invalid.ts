import { Router } from "express"
import { logInvalid } from "../Middlewares/Logs"

export const invalid = Router()

invalid.get('/*', logInvalid, (req,res)=>{
    res.redirect('/')
})