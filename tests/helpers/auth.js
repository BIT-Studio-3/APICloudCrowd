import request from 'supertest';
import app from '../../app.js';
import prisma from '../../prisma/client.js';

export const setupTestAuth = async () => {
    await prisma.user.deleteMany();
    
    await request(app).post("/api/auth/register").send({
        firstName: "John",
        lastName: "Doe",
        emailAddress: "johndoe@example.com",
        password: "janedoe123",
        role: "NORMAL",
    });

    const res = (await request(app).post("/api/auth/login")).send({
        emailAddress: "johndoe@example.com",
        password: "janedoe123",
    });

    return res.body.token;
};

export const cleanupDatabase = async () => {
    await prisma.user.deleteMany();
};

export const disconnectPrisma = async () => {
    await prisma.$disconnect();
};

