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
        if (t.name === 'write_to_file' && t.args && t.args.TargetFile) {
          if (t.args.TargetFile.includes('homepage.json') && step.step_index < 100) {
            console.log("Found early homepage.json write in step:", step.step_index);
            fs.writeFileSync("c:\\Users\\mridu\\OneDrive\\Desktop\\Jewel-Web\\JewelleryStore\\frontend\\src\\content\\homepage_original.json", t.args.CodeContent, 'utf8');
          }
        }
      });
    }
  } catch (e) {
    // ignore
  }
});
