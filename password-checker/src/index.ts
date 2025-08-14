import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

type PasswordResponse = {
  password: string;
  strength: string;
  suggestions: string[];
};

type RatingsObj = {
  uppercaseRating: number;
  lowercaseRating: number;
  specialCharRating: number;
  numberRating: number;
  lengthRating: number;
};

type SuggestionsObj = {
  [K in keyof RatingsObj]: string;
};

function generateSuggestions(ratings: RatingsObj): string[] {
  const suggestions: SuggestionsObj = {
    uppercaseRating: "Use additional uppercase characters",
    lowercaseRating: "Use additional uppercase characters",
    numberRating: "Use additional numbers",
    specialCharRating: "Use additional special characters",
    lengthRating: "Password should be more than 4 characters",
  };

  const arr = [];
  for (const [ratingName, ratingValue] of Object.entries(ratings)) {
    if (ratingValue < 1) {
      arr.push(suggestions[ratingName as keyof RatingsObj]);
    }
  }

  return arr;
}

const isNotAlphabeticChar = (char: string) => !/^[a-zA-Z]$/.test(char);
// Evaluate password length, use of upper and lower case letters, numbers, special characters, and common patterns (e.g., "1234", "password").
function validatePassword(password: string): PasswordResponse {
  const lengthRating = password.length > 8 ? 2 : password.length > 4 ? 1 : 0;
  let [uppercaseCount, lowercaseCount, numberCount, specialCharCount] = [
    0, 0, 0, 0,
  ];
  for (const char of password) {
    uppercaseCount += char.toLowerCase() !== char ? 1 : 0;
    lowercaseCount += char.toUpperCase() !== char ? 0 : 1;
    numberCount += !isNaN(Number(char)) ? 1 : 0;
    specialCharCount += isNotAlphabeticChar(char) ? 1 : 0;
  }
  const lowercaseRating = lowercaseCount > 3 ? 2 : lowercaseCount >= 1 ? 1 : 0;
  const uppercaseRating = uppercaseCount > 3 ? 2 : uppercaseCount >= 1 ? 1 : 0;
  const numberRating = numberCount > 3 ? 2 : numberCount >= 1 ? 1 : 0;
  const specialCharRating =
    specialCharCount > 3 ? 2 : specialCharCount >= 1 ? 1 : 0;

  const totalScore =
    lowercaseRating +
    uppercaseRating +
    lengthRating +
    numberRating +
    specialCharRating;

  const average = totalScore / 5;
  const strength = average >= 1.5 ? "strong" : average >= 1 ? "medium" : "weak";

  const suggestions = generateSuggestions({
    uppercaseRating,
    lowercaseRating,
    lengthRating,
    numberRating,
    specialCharRating,
  });

  return {
    password,
    strength,
    suggestions: suggestions,
  };
}
// Routes
app.post("/check-password", (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password || !(typeof password === "string")) {
    return res.status(400).json({
      message: "Please provide a password",
    });
  }

  const passwordRespose = validatePassword(password);

  return res.json({
    ...passwordRespose,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

export default app;
