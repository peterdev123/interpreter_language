export enum TokenType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  IDENTIFIER = "IDENTIFIER",
  KEYWORD = "KEYWORD",
  SYMBOL = "SYMBOL",
  OPERATOR = "OPERATOR",
  BOOLEAN = "BOOLEAN",
  EOF = "EOF"
}

export interface Token {
  type: TokenType;
  value: string;
}

const keywords = new Set([
  "SUGOD", "KATAPUSAN", "MUGNA", "IPAKITA", "DAWAT", "KUNG", "ALANG", "PUNDOK",
  "UG", "O", "DILI"
]);

export class Lexer {
  private pos = 0;
  private tokens: Token[] = [];
  private code: string;

  constructor(code: string) {
    this.code = code.trim();
  }

  tokenize(): Token[] {
    let i = 0;
    while (i < this.code.length) {
      let char = this.code[i];

      // Skip spaces and newlines
      if (char === " " || char === "\n" || char === "\t" || char === "\r") {
        i++;
        continue;
      }

      // Handle keywords and identifiers
      if (/[A-Z_]/.test(char)) {
        let word = "";
        while (/[A-Z_]/.test(this.code[i]) && i < this.code.length) {
          word += this.code[i];
          i++;
        }

        // Handle "IPAKITA:" (colon is part of the syntax)
        if (this.code[i] === ":") {
          word += ":";
          i++; // Move past the colon
        }

        // If it's a keyword, store it as a KEYWORD token
        if (keywords.has(word.replace(":", ""))) {
          this.tokens.push({ type: TokenType.KEYWORD, value: word.replace(":", "") });
        } else {
          this.tokens.push({ type: TokenType.IDENTIFIER, value: word });
        }
        continue;
      }

      // Handle numbers
      if (/\d/.test(char)) {
        let num = "";
        while (/\d/.test(this.code[i]) && i < this.code.length) {
          num += this.code[i];
          i++;
        }
        this.tokens.push({ type: TokenType.NUMBER, value: num });
        continue;
      }

      // Handle string literals
      if (char === '"') {
        let str = "";
        i++; // Skip the opening quote
        while (this.code[i] !== '"' && i < this.code.length) {
          str += this.code[i];
          i++;
        }
        i++; // Skip the closing quote
        this.tokens.push({ type: TokenType.STRING, value: str });
        continue;
      }

      // Handle operators and symbols
      if ("+-*/%&><=!,".includes(char)) {
        this.tokens.push({ type: TokenType.OPERATOR, value: char });
        i++;
        continue;
      }

      // Handle unknown characters
      console.error(`Unknown character: ${char}`);
      i++;
    }

    this.tokens.push({ type: TokenType.EOF, value: "" });
    return this.tokens;
  }
}
