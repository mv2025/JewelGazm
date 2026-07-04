const fs = require('fs');
const readline = require('readline');

const transcriptPath = "C:\\Users\\mridu\\.gemini\\antigravity\\brain\\edd62c38-82d1-46ef-b370-73d7aed4508c\\.system_generated\\logs\\transcript_full.jsonl";

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const step = JSON.parse(line);
    if (step.tool_calls) {
      step.tool_calls.forEach(t => {
        if (t.args && t.args.TargetFile && t.args.TargetFile.includes('Header.tsx')) {
          console.log("Step index:", step.step_index, "Tool name:", t.name);
        }
      });
    }
  } catch (e) {
    // ignore
  }
});
