import type { ReadmePreview } from "../../types/tools.types";

export function generateReadmeMarkdown(data: ReadmePreview): string {
  let markdown = `# ${data.projectName}\n\n`;

  markdown += `## Description\n${data.description}\n\n`;

  markdown += `## Technologies\n${data.technologies
    .map((t) => `- ${t}`)
    .join("\n")}\n\n`;

  if (data.features && data.features.length) {
    markdown += `## Features\n${data.features
      .map((f) => `- ${f}`)
      .join("\n")}\n\n`;
  }

  markdown += `## Installation\n\`\`\`\n${data.installation}\n\`\`\`\n\n`;

  markdown += `## Usage\n\`\`\`\n${data.usage}\n\`\`\`\n\n`;

  if (data.examples) {
    markdown += `## Examples\n\`\`\`\n${data.examples}\n\`\`\`\n\n`;
  }

  if (data.license) {
    markdown += `## License\n${data.license}\n`;
  }

  return markdown;
}
