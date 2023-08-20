import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
const router = Router();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECREAT = "Super Secret";
const prisma = new PrismaClient();

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}


function generateAuthToken(tokenId: number) : string {
    const jwtPayload = { tokenId };
    return jwt.sign(jwtPayload, JWT_SECREAT, {
        algorithm: "HS256",
        noTimestamp:true
    })
}

//create a user if it doesn't exist
// generate the emailToken and send it to their email

router.post("/login", async (req, res) => {
    const { email } = req.body;

    const emailToken = generateEmailToken();
    const expiration = new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000);

    try {
        const createdToken = await prisma.token.create({
            data: {
                type: "EMAIL",
                emailToken,
                expiration,
                user: {
                    connectOrCreate: {
                        where: { email },
                        create: {email}
                    },
                }
            }
        })

        console.log('token', createdToken);
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(400).json({ error: "Couldn't start the authentication process" });
    }

})

// Verify Email token
// and Generate a Longlived JWT auth token

router.post('/authenticate', async (req, res) => {
    const { email, emailToken } = req.body;
  
    const dbEmailToken = await prisma.token.findUnique({
      where: {
        emailToken,
      },
      include: {
        user: true,
      },
    });
  
    if (!dbEmailToken || !dbEmailToken.valid) {
      return res.sendStatus(401);
    }

    if (dbEmailToken.expiration < new Date()) {
        return res.status(401).json({ error: 'Token expired!' });
      }
    
      if (dbEmailToken?.user?.email !== email) {
        return res.sendStatus(401);
    }
    
    // Here we know the user is the owner of the email
    // now generate the api token

    // Here we validated that the user is the owner of the email

  // generate an API token
  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );
  const apiToken = await prisma.token.create({
    data: {
      type: 'API',
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });
    
    
     // Invalidate the email
  await prisma.token.update({
    where: { id: dbEmailToken.id },
    data: { valid: false },
  });
    
    //generate the JWT token
    const authToken = generateAuthToken(apiToken.id);

    res.json({ authToken });
})



export default router;