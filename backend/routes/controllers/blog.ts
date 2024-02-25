import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const blog=new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET: string,
    
    }
    Variables:{
      userId:string
    }
}>();

export const createBlog=blog.post("/",async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
  try{
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
    msg:"post created",
		id: post.id
	});
  } catch(err){
    c.status(500);
    return c.json({
      error:"Internal server error",
      err,
    })
  }
})

export const updateBlog=blog.put("/update", async (c)=>{
  const userId=c.get('userId');
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const body=await c.req.json();
  try{
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data:{
        title:body.title,
        content:body.content
      }
    
    });
    c.status(200);
    return c.json({
      msg:"post updated"
    })

    }
    catch(err){
      c.status(500);
      return c.json({
        error:"Internal server error"
      })
  }


});

export const getBlog=blog.get("/:id", async (c)=>{
  
    const id=c.req.param('id');
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    
    console.log("id",id);
    
        
    try{
    const blog=await prisma.post.findUnique({
      where:{
        id:id
      }
    })
    console.log(blog);
    
    return c.json(blog)
    
  }
  catch(err){
    c.status(500);
    return c.json({
      error:"Interval server error",
      err
    })
  }
})