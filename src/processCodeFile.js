import fs from "fs/promises";

// 主函数：使用链式调用
async function generateWuxiaCodeComments(code, runnable) {
  try {
    return await runnable.invoke({ code });
  } catch (error) {
    console.error("生成注释出错：", error);
    throw error;
  }
}

export async function processCodeFile(filePath, runnable) {
  try {
    // 读取文件内容
    const code = await fs.readFile(filePath, "utf-8");

    // 生成武侠风格注释
    const annotatedCode = await generateWuxiaCodeComments(code, runnable);

    // 将结果写回文件
    await fs.writeFile(filePath, annotatedCode, "utf-8");

    console.log("生成注释成功：", filePath);
  } catch (error) {
    console.error(`生成注释出错：${filePath}:`, error);
    throw error;
  }
}

export function cli() {
  // 获取实际的命令行参数，跳过 node 和 npm run 相关的参数
  const args = process.argv.slice(2);
  const whichChain = args[0];
  const filePath = args[1];

  if (!whichChain) {
    console.error("请提供一个Chain序号，1～3");
    process.exit(1);
  }

  if (!filePath) {
    console.error("请提供一个文件路径作为参数");
    process.exit(1);
  }

  return { whichChain, filePath };
}
