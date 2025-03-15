import * as fs from "fs";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

const filename = process.argv[2];

if (!filename) {
  console.error("Usage: npx ts-node src/main.ts <filename>");
  process.exit(1);
}

// Check if the file exists
if (!fs.existsSync(filename)) {
  console.error(`Error: File not found - ${filename}`);
  process.exit(1);
}

console.log(`Reading file: ${filename}`);

const code = fs.readFileSync(filename, "utf-8");
console.log("Source code:", code);

const lexer = new Lexer(code);
const tokens = lexer.tokenize();
console.log("Tokens:", tokens);

const parser = new Parser(tokens);
const ast = parser.parse();
console.log("AST:", JSON.stringify(ast, null, 2));

const interpreter = new Interpreter(ast);
console.log("Running interpreter...");
interpreter.run();
console.log("Interpreter finished.");
