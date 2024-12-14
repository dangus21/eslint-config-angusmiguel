"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _chunkCGB5W7N6cjs = require('../chunk-CGB5W7N6.cjs');var _chunk2AY3R7TXcjs = require('../chunk-2AY3R7TX.cjs');var _child_process = require('child_process'); var _child_process2 = _interopRequireDefault(_child_process);var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);jest.mock("prompts");jest.mock("fs",()=>({existsSync:jest.fn(),readdirSync:jest.fn(),readFileSync:jest.fn(),writeFileSync:jest.fn()}));jest.mock("child_process",()=>({spawnSync:jest.fn().mockReturnValue({status:0,stdout:Buffer.from("mock stdout"),stderr:Buffer.from("")})}));jest.mock("process",()=>({cwd:jest.fn(()=>"/mock/cwd"),env:{}}));describe("Config Generator Utils",()=>{describe("detectCurrentPackageManager",()=>{it("should detect pnpm",()=>{_fs2.default.existsSync.mockImplementation(t=>t.includes("pnpm-lock.yaml")),expect(_chunkCGB5W7N6cjs.b.call(void 0, )).toBe("pnpm")}),it("should detect yarn",()=>{_fs2.default.existsSync.mockImplementation(t=>t.includes("yarn.lock")),expect(_chunkCGB5W7N6cjs.b.call(void 0, )).toBe("yarn")}),it("should detect npm",()=>{_fs2.default.existsSync.mockImplementation(t=>t.includes("package-lock.json")),expect(_chunkCGB5W7N6cjs.b.call(void 0, )).toBe("npm")}),it("should default to npm when no lock file is found",()=>{_fs2.default.existsSync.mockReturnValue(!1),expect(_chunkCGB5W7N6cjs.b.call(void 0, )).toBe("npm")})}),describe("detectPackageManager",()=>{it("should return the specified package manager",()=>{expect(_chunkCGB5W7N6cjs.c.call(void 0, "yarn")).toBe("yarn")}),it('should detect current package manager when "current" is specified',()=>{_fs2.default.existsSync.mockImplementation(t=>t.includes("yarn.lock")),expect(_chunkCGB5W7N6cjs.c.call(void 0, "current")).toBe("yarn")}),it("should initialize npm if no package.json exists",()=>{_fs2.default.existsSync.mockReturnValue(!1),_fs2.default.readdirSync.mockReturnValue([]),_chunkCGB5W7N6cjs.c.call(void 0, "npm"),expect(_child_process2.default.spawnSync).toHaveBeenCalledWith("npm",["init","-y"],expect.any(Object))}),it("should initialize npm if no package.json exists",()=>{_fs2.default.existsSync.mockReturnValue(!1),_fs2.default.readdirSync.mockReturnValue([]),_chunkCGB5W7N6cjs.c.call(void 0, "npm"),expect(_child_process2.default.spawnSync).toHaveBeenCalledWith("npm",["init","-y"],expect.any(Object))})}),describe("buildPackageList",()=>{it("should build correct package list for ESLint and Prettier with NextJS and Tailwind",()=>{let t=_chunkCGB5W7N6cjs.d.call(void 0, ["eslint","prettier"],!0,!0);expect(t).toContain("prettier"),expect(t).toContain("prettier-plugin-tailwindcss"),expect(t).toContain("@next/eslint-plugin-next"),expect(t).toContain("eslint@8.57.1")}),it("should build correct package list for Biome without NextJS and Tailwind",()=>{let t=_chunkCGB5W7N6cjs.d.call(void 0, ["biomejs"],!1,!1);expect(t).toContain("@biomejs/biome@latest"),expect(t).not.toContain("prettier"),expect(t).not.toContain("@next/eslint-plugin-next")})}),describe("copyConfig",()=>{it("should write the correct ESLint config file",()=>{_chunkCGB5W7N6cjs.g.call(void 0, "eslint"),expect(_fs2.default.writeFileSync).toHaveBeenCalledWith(expect.stringContaining(".eslintrc.js"),expect.stringContaining("module.exports ="))}),it("should write the correct Prettier config file",()=>{_chunkCGB5W7N6cjs.g.call(void 0, "prettier"),expect(_fs2.default.writeFileSync).toHaveBeenCalledWith(expect.stringContaining(".prettierrc"),expect.stringContaining('"singleQuote": false'))}),it("should write the correct Biome config file",()=>{_chunkCGB5W7N6cjs.g.call(void 0, "biomejs"),expect(_fs2.default.writeFileSync).toHaveBeenCalledWith(expect.stringContaining("biome.json"),expect.stringContaining('"$schema":'))}),it("should write the correct EditorConfig file",()=>{_chunkCGB5W7N6cjs.g.call(void 0, "editorConfig"),expect(_fs2.default.writeFileSync).toHaveBeenCalledWith(expect.stringContaining(".editorConfig"),expect.stringContaining("root = true"))})}),describe("detectReactInPackageJson",()=>{it("should return true when React is in dependencies",()=>{_fs2.default.existsSync.mockReturnValue(!0),_fs2.default.readFileSync.mockReturnValue(JSON.stringify({dependencies:{react:"^17.0.2"}})),expect(_chunkCGB5W7N6cjs.f.call(void 0, )).toBe(!0)}),it("should return true when React is in devDependencies",()=>{_fs2.default.existsSync.mockReturnValue(!0),_fs2.default.readFileSync.mockReturnValue(JSON.stringify({devDependencies:{"react-dom":"^17.0.2"}})),expect(_chunkCGB5W7N6cjs.f.call(void 0, )).toBe(!0)}),it("should return false when React is not in package.json",()=>{_fs2.default.existsSync.mockReturnValue(!0),_fs2.default.readFileSync.mockReturnValue(JSON.stringify({dependencies:{lodash:"^4.17.21"}})),expect(_chunkCGB5W7N6cjs.f.call(void 0, )).toBe(!1)}),it("should return false when package.json does not exist",()=>{_fs2.default.existsSync.mockReturnValue(!1),expect(_chunkCGB5W7N6cjs.f.call(void 0, )).toBe(!1)})}),describe("installDeps",()=>{it("should call spawnSync with the correct package manager and arguments",()=>{_chunkCGB5W7N6cjs.e.call(void 0, {config:["eslint","prettier"],manager:"npm",withNextJS:!0,withTailwind:!0}),expect(_child_process2.default.spawnSync).toHaveBeenCalledWith("npm",["install",expect.stringContaining("eslint@8.57.1")],expect.any(Object))}),it('should use "add" for yarn',()=>{_chunkCGB5W7N6cjs.e.call(void 0, {config:["eslint"],manager:"yarn",withNextJS:!1,withTailwind:!1}),expect(_child_process2.default.spawnSync).toHaveBeenCalledWith("yarn",["add",expect.stringContaining("eslint@8.57.1")],expect.any(Object))}),it("should not actually run any commands",()=>{_chunkCGB5W7N6cjs.e.call(void 0, {config:["eslint"],manager:"npm",withNextJS:!1,withTailwind:!1}),expect(_child_process2.default.spawnSync).toHaveBeenCalled()})}),describe("No real operations",()=>{it("should not perform any real file system operations",()=>{_chunkCGB5W7N6cjs.g.call(void 0, "eslint"),expect(_fs2.default.writeFileSync).toHaveBeenCalled(),expect(_fs2.default.writeFileSync).not.toBe(_chunk2AY3R7TXcjs.a.call(void 0, "fs").writeFileSync)}),it("should not execute any real commands",()=>{_chunkCGB5W7N6cjs.e.call(void 0, {config:["eslint"],manager:"npm",withNextJS:!1,withTailwind:!1}),expect(_child_process2.default.spawnSync).toHaveBeenCalled(),expect(_child_process2.default.spawnSync).not.toBe(_chunk2AY3R7TXcjs.a.call(void 0, "child_process").spawnSync)}),it("should use mocked process.cwd()",()=>{expect(process.cwd()).toBe("/mock/cwd")})})});
//# sourceMappingURL=index.test.cjs.map