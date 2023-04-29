const { Fields, PrismaClient } = require("@prisma/client");

(async function generateFields() {
  const prisma = new PrismaClient();
  const fields = ["React", "Vue", "Angular", "Django", "Springboot"];

  await Promise.all(
    fields.map(async (field) => {
      const isExists = Boolean(
        await prisma.fields.findFirst({ where: { fieldName: field } })
      );
      if (isExists) return;
      const newField: typeof Fields | any = { fieldName: field };
      await prisma.fields.create({ data: newField });
    })
  );
})();
