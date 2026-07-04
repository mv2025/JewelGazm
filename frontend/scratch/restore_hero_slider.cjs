const fs = require('fs');
const readline = require('readline');

const transcriptPath = "C:\\Users\\mridu\\.gemini\\antigravity\\brain\\edd62c38-82d1-46ef-b370-73d7aed4508c\\.system_generated\\logs\\transcript_full.jsonl";
const targetPath = "c:\\Users\\mridu\\OneDrive\\Desktop\\Jewel-Web\\JewelleryStore\\frontend\\src\\components\\sections\\HeroSliderSection.tsx";

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const step = JSON.parse(line);
    if (step.step_index === 139) {
      console.log("Found step 139 in full transcript!");
      const toolCall = step.tool_calls.find(t => t.name === 'write_to_file');
      if (toolCall && toolCall.args && toolCall.args.CodeContent) {
        fs.writeFileSync(targetPath, toolCall.args.CodeContent, 'utf8');
        console.log("Successfully restored original HeroSliderSection.tsx!");
        process.exit(0);
      }
    }
  } catch (e) {
    // ignore
  }
});
