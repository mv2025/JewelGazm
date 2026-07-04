const fs = require('fs');
const readline = require('readline');

const transcriptPath = "C:\\Users\\mridu\\.gemini\\antigravity\\brain\\edd62c38-82d1-46ef-b370-73d7aed4508c\\.system_generated\\logs\\transcript_full.jsonl";
const targetPath = "c:\\Users\\mridu\\OneDrive\\Desktop\\Jewel-Web\\JewelleryStore\\frontend\\src\\components\\layout\\Header.tsx";

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const step = JSON.parse(line);
    if (step.tool_calls) {
      step.tool_calls.forEach(t => {
        if (t.name === 'write_to_file' && t.args && t.args.TargetFile && t.args.TargetFile.includes('Header.tsx')) {
          if (step.step_index < 100) {
            console.log("Found original Header.tsx in step:", step.step_index);
            fs.writeFileSync(targetPath, t.args.CodeContent, 'utf8');
            console.log("Successfully restored original Header.tsx!");
            process.exit(0);
          }
        }
      });
    }
  } catch (e) {
    // ignore
  }
});
