import { Router } from 'express';

const router = Router()

router.get('/user', (req, res)=>{
    res.send('Bienvenido a user Routes')
})


export default router
