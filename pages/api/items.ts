import type { NextApiRequest, NextApiResponse } from "next";
import { items } from "../../common/fixture";
import { IItemsGetRequest, IItemsGetResponse } from "../../common/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IItemsGetResponse>
) {
  const body: IItemsGetRequest = req.query;
  const { query } = body;

  // fake loading
  await new Promise((r) => setTimeout(r, 1000 * (Math.random() + 1)));

  res.status(200).json({
    items: items.filter((i) => {
      if (!query) return true;
      const querySafe = query.toLowerCase();
      const titleSafe = i.title.toLowerCase();
      return titleSafe.includes(querySafe);
    }),
  });
}
