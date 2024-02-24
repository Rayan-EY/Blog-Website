import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET: string,
  
  }
  Variables:{
    userId:string
  }
}>();

app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt || !jwt.startsWith('Bearer ')) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set("userId",payload.id)
	await next()
})

app.post('/api/v1/signup', async (c) => {
  
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	try {
    const data=await prisma.user.findFirst({
      where:{
        email:body.email
      }
      
    })
    if(data){
      c.status(403)
      return c.json({err:"User already exists, please signin"})
    }
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    const jwt=await sign({id:user.id}, c.env.JWT_SECRET);
	
		return c.json({msg:'jwt here',jwt})
	} catch(e) {
		c.status(500)
    return c.json({err:"Internal server error"})
	}
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

  const body=await c.req.json();
  try {
    const data=await prisma.user.findUnique({
      where:{
        email:body.email
      }
      
    })
    if(!data){
      c.status(403)
      return c.json({err:"User does not exist"})
    }
    console.log(data.id);
    
    const jwt=await sign({id:data.id},c.env.JWT_SECRET)
    console.log(jwt);
    

    c.status(200)
    return c.json({msg:"Signed in ",jwt})
  } catch (error) {
    c.status(500)
    return c.json({err:"Internal server error",error})
  }

})
app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono! blog post')
})

app.put('/api/v1/blog', (c) => {
  console.log(c.get('userId'));
  
  return c.text('Hello Hono! blog put')
})

app.get('/api/v1/blog/:id', (c) => {
  const id=c.req.param;
  return c.text('Hello Hono! blog')
})

export default app
