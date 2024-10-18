// This file is used to declare prisma client, so it no need to call in every single file again
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;