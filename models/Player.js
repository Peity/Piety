const { Prisma } = require("@prisma/client")
const { prisma } = require("../server")




exports.findPlayer = async function findPlayer(username) {
     return await prisma.$queryRaw(
        Prisma.sql`select * from player where id = 1`
    )
}

