import type { JestConfigWithTsJest }  from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  rootDir: "tests",
  bail: true,
  moduleFileExtensions: ["js", "json", "ts"],
  moduleDirectories: ["node_modules", "<rootDir>/../"],
  testRegex: "^.+(tests|Tests|spec)\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  testEnvironment: "node"
};

export default jestConfig;
