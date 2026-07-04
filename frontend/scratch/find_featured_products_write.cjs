const fs = require('fs');
const readline = require('readline');

const transcriptPath = "C:\\Users\\mridu\\.gemini\\antigravity\\brain\\edd62c38-82d1-46ef-b370-73d7aed4508c\\.system_generated\\logs\\transcript_full.jsonl";
const targetPath = "c:\\Users\\mridu\\OneDrive\\Desktop\\Jewel-Web\\JewelleryStore\\frontend\\src\\components\\sections\\FeaturedProductsSection.tsx";

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const step = JSON.parse(line);
    if (step.tool_calls) {
      step.tool_calls.forEach(t => {
        if (t.name === 'write_to_file' && t.args && t.args.TargetFile && t.args.TargetFile.includes('FeaturedProductsSection.tsx')) {
          if (t.args.CodeContent.includes('Signature Masterpieces') || t.args.CodeContent.includes('Solitaire')) {
            console.log("Found original FeaturedProductsSection.tsx in step:", step.step_index);
            fs.writeFileSync(targetPath, t.args.CodeContent, 'utf8');
            console.log("Successfully restored original FeaturedProductsSection.tsx!");
            process.exit(0);
          }
        }
      });
    }
  } catch (e) {
    // ignore
  }
});
