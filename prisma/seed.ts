import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse/sync";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

type DatasetT = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const read_csv = async (): Promise<DatasetT[]> => {
    try {
        const filePath = path.join(__dirname, "../csv_data/data.csv");
        const fileContent = await fs.readFile(filePath, "utf-8");
        const records = parse(fileContent, { delimiter: ",", from_line: 2 });
        console.log("Loaded data from CSV file ------------> ");
        return records;
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

const main = async () => {
  const data = await read_csv();
  for (let i = 0; i < data.length; i++) {
    const [day, age, gender, a, b, c, d, e, f] = data[i];
    const date = moment(day, "DD/MM/YYYY").toDate();
    await prisma.dataset
      .create({
        data: {
          day: date,
          age,
          gender,
          a: Number(a),
          b: Number(b),
          c: Number(c),
          d: Number(d),
          e: Number(e),
          f: Number(f),
        },
      })
      .catch((e) => {});
  }
  console.log("Data seeding completed");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
