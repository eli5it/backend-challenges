import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get("/random", (req: Request, res: Response) => {
  const { min, max, quantity } = req.query;
  const minNum = typeof min === "string" ? parseInt(min) : undefined;
  const maxNum = typeof max === "string" ? parseInt(max) : undefined;
  const quantityNum =
    typeof quantity === "string" ? parseInt(quantity) : undefined;

  // validate min, max, quantity
  if (
    !minNum ||
    !maxNum ||
    !quantityNum ||
    isNaN(minNum) ||
    isNaN(maxNum) ||
    isNaN(quantityNum)
  ) {
    return res.json({
      message:
        "Min, max and quantity must be numeric, and quantity must be positive",
    });
  }
  const randomNums = [];

  for (let i = 0; i < quantityNum; i++) {
    const addFactor = maxNum - minNum + 1;
    randomNums.push(Math.floor(Math.random() * addFactor) + minNum);
  }

  res.json({ nums: randomNums });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
