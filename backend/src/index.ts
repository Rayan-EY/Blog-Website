import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { auth } from '../routes/controllers/auth';
import { blog } from '../routes/controllers/blog';


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

app.route('/api/v1/',auth);

app.route('/api/v1/blog', blog);


export default app



