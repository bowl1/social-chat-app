const fs = require("fs");

// 手动为每个模块添加方法（可编辑）
const moduleMethods = {
  "App": ["render()", "handleClick()"],
  "Header": ["renderHeader()"],
  "Footer": ["renderFooter()"],
  "Utils": ["formatDate()"],
};

// 读取 Dependency Cruiser 的依赖关系数据
const dependencies = JSON.parse(fs.readFileSync("dependencies.json", "utf-8"));

let uml = "@startuml\n";

// 添加模块和方法
dependencies.modules.forEach((module) => {
  const moduleName = module.source.replace(/^src\//, "").replace(/\//g, "_");

  uml += `class "${moduleName}" {\n`;
  if (moduleMethods[moduleName]) {
    moduleMethods[moduleName].forEach((method) => {
      uml += `  + ${method}\n`;
    });
  }
  uml += `}\n`;

  // 添加依赖关系
  module.dependencies.forEach((dependency) => {
    const dependencyName = dependency.resolved.replace(/^src\//, "").replace(/\//g, "_");
    uml += `"${moduleName}" --> "${dependencyName}"\n`;
  });
});

uml += "@enduml";

// 输出 PlantUML 文件
fs.writeFileSync("diagram.puml", uml);
console.log("PlantUML diagram saved to diagram.puml");