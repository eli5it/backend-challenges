import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const isPalindrome = (s: string) => {
  const formattedString = s.trim().toLowerCase();
  return formattedString === formattedString.split("").reverse().join("");
};

app.post("/check", (req: Request, res: Response) => {
  const { value } = req.body;

  if (!value || typeof value !== "string") {
    return res.status(400).json({
      message: "Please provide a value",
    });
  }

  return res.json({
    isPalindrome: isPalindrome(value),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
