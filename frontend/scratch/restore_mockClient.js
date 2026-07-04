const fs = require('fs');
const readline = require('readline');
const path = require('path');

const transcriptPath = "C:\\Users\\mridu\\.gemini\\antigravity\\brain\\edd62c38-82d1-46ef-b370-73d7aed4508c\\.system_generated\\logs\\transcript_full.jsonl";
const targetPath = "c:\\Users\\mridu\\OneDrive\\Desktop\\Jewel-Web\\JewelleryStore\\frontend\\src\\lib\\shopify\\mockClient.ts";

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const step = JSON.parse(line);
    if (step.step_index === 61) {
      console.log("Found step 61 in full transcript!");
      const toolCall = step.tool_calls.find(t => t.name === 'write_to_file');
      if (toolCall && toolCall.args && toolCall.args.CodeContent) {
        fs.writeFileSync(targetPath, toolCall.args.CodeContent, 'utf8');
        console.log("Successfully restored original mockClient.ts!");
        process.exit(0);
      } else {
        console.log("Could not find CodeContent in step 61 tool_calls.");
      }
    }
  } catch (e) {
    // ignore
  }
});
