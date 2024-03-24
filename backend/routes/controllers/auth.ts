import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput, signupInput } from "rayan_npm";


export const auth=new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET: string,
    
    }
    Variables:{
      userId:string
    }
  }>();

export const signin=auth.post("/signin",async (c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    const body=await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
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

export const signup=auth.post("/signup",async (c) => {
  
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const body = await c.req.json();
      const { success } = signupInput.safeParse(body);
	  if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	  }
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
  