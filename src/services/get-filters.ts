import { prisma } from "../config/db";

const getDistinct = async (column: any) => {
  const data = await prisma.dataset.findMany({
    select: {
      [column]: true,
    },
    where: {},
    distinct: [column],
  });
  return data.map((item) => item[column]);
};

const getLargestSmallestDate = async () => {
  const data = await prisma.dataset.findMany({
    select: {
      day: true,
    },
    where: {},
    distinct: ["day"],
  });
  return {
    start: data[0].day.toString(),
    end: data[data.length - 1].day.toString(),
  };
};

export const getFilters = async () => {
  const response: {
    ageGroup?: string[];
    gender?: string[];
    date?: {
      start: string;
      end: string;
    };
  } = {};

  try {
    response.ageGroup = ["none", ...(await getDistinct("age"))];
    response.gender = ['none',...(await getDistinct("gender"))];
    response.date = await getLargestSmallestDate();
    return response;
  } catch (error) {
    console.log(error);
    return {}
  }
};
