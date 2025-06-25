"use server";

import { db } from "@/lib/prisma";
import { subDays, isAfter, startOfDay } from "date-fns";

const ACCOUNT_ID = "41fd0c1b-119d-454a-a3d0-ec9cff4da52e";
const USER_ID = "6b5477d0-b152-44d9-b918-31dfabe20c3f";

// Category definitions
const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions() {
  try {
    // Get latest transaction date
    const lastTx = await db.transaction.findFirst({
      where: { accountId: ACCOUNT_ID },
      orderBy: { date: "desc" },
    });

    const lastDate = lastTx ? startOfDay(lastTx.date) : subDays(new Date(), 91);
    const today = startOfDay(new Date());
    let totalBalance = 0;
    const newTransactions = [];

    for (
      let d = subDays(today, 0);
      isAfter(d, lastDate);
      d = subDays(d, 1)
    ) {
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const tx = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
          date: d,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: d,
          updatedAt: d,
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        newTransactions.push(tx);
      }
    }

    if (newTransactions.length === 0) {
      return { success: true, message: "No new transactions to add." };
    }

    await db.$transaction(async (tx) => {
      await tx.transaction.createMany({ data: newTransactions });

      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: {
          balance: {
            increment: totalBalance,
          },
        },
      });
    });

    return {
      success: true,
      message: `Added ${newTransactions.length} new transactions.`,
    };
  } catch (error) {
    console.error("Error appending transactions:", error);
    return { success: false, error: error.message };
  }
}
