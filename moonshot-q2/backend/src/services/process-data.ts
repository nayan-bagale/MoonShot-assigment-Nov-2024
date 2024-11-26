import { prisma } from "../config/db";

export interface Filters {
  ageGroup: "15-25" | ">25" | "none";
  gender: "Male" | "Female" | "none";
  dateRange: string;
  feature: string;
}

interface DateRange {
  start: string;
  end: string;
}

interface Totals {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export const getData = async (
  ageGroup: Filters["ageGroup"],
  gender: Filters["gender"],
  dateRange: string,
  feature: string
): Promise<any> => {

  if (!ageGroup && !gender && !dateRange && feature) {
    const data = await prisma.dataset.findMany({
      select: {
        day: true,
        [feature.toLowerCase()]: true,
      },
    });

    return data;
  }

  if (!ageGroup && !gender && !dateRange) {
    try {
      const data = await prisma.dataset.findMany({
        select: {
          a: true,
          b: true,
          c: true,
          d: true,
          e: true,
          f: true,
          day: true,
          gender: true,
          age: true,
        },
      });

      // Initialize an object to store the sums
      const totals: Totals = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };

      // Loop through each object in the array and sum the values
      data.forEach((item) => {
        totals.a += item.a || 0;
        totals.b += item.b || 0;
        totals.c += item.c || 0;
        totals.d += item.d || 0;
        totals.e += item.e || 0;
        totals.f += item.f || 0;
      });

      return totals;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const whereArr = [];

  if (gender !== "none") whereArr.push({ gender });
  if (ageGroup !== "none")
    whereArr.push({ age: ageGroup === "15-25" ? "15-25" : ">25" });

  const dayRange = JSON.parse(dateRange) as DateRange;
  if (Object.keys(dayRange).length) {
    whereArr.push({ day: { gte: dayRange.start, lte: dayRange.end } });
  }
  
   if (feature){
    const data = await prisma.dataset.findMany({
      select: {
        day: true,
        [feature.toLowerCase()]: true,
      },
      where: {
        AND: whereArr,
      }
    });

    return data;
  }

  const selectArr:any = feature
    ? {
        day: true,
        [feature.toLowerCase()]: true,
      }
    : {
        a: true,
        b: true,
        c: true,
        d: true,
        e: true,
        f: true,
        day: true,
        gender: true,
        age: true,
      };

  try {
    const data = await prisma.dataset.findMany({
      select: selectArr,
      where: {
        AND: whereArr,
      },
    });

    // Initialize an object to store the sums
    const totals: Totals = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };

    // Loop through each object in the array and sum the values
    data.forEach((item) => {
      totals.a += item.a || 0;
      totals.b += item.b || 0;
      totals.c += item.c || 0;
      totals.d += item.d || 0;
      totals.e += item.e || 0;
      totals.f += item.f || 0;
    });

    return totals;
  } catch (e) {
    console.error(e);
    return null;
  }
};
