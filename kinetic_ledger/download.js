const fs = require('fs');

async function downloadFile(url, dest) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
    const html = await response.text();
    fs.writeFileSync(dest, html);
    console.log(`Downloaded ${dest}`);
  } catch (error) {
    console.error(`Error downloading ${dest}:`, error);
  }
}

const files = [
  {
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzA0N2ZjYWU5NTM5MzQyN2Y5NjY4MjU3NzQ0NzM5YmM3EgsSBxCc1L7s3w8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MDgxMTQzMTIwMjI3NTE5NzU5&filename=&opi=89354086',
    dest: 'index.html'
  },
  {
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2QyZDQxNTRlNWM5NjQ2OTE4YjZlYzYyMzVjNjdkNDZlEgsSBxCc1L7s3w8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MDgxMTQzMTIwMjI3NTE5NzU5&filename=&opi=89354086',
    dest: 'dashboard.html'
  },
  {
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzk1OTkyYzU5NDgyNDRmMDE4ZTA2Y2JhYmQ1M2Q4ZmRjEgsSBxCc1L7s3w8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MDgxMTQzMTIwMjI3NTE5NzU5&filename=&opi=89354086',
    dest: 'admin.html'
  },
  {
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdiYzAxYmE4MzQ0NzQzZTZiZWU3ZDk3OTJjMTZjNDdjEgsSBxCc1L7s3w8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MDgxMTQzMTIwMjI3NTE5NzU5&filename=&opi=89354086',
    dest: 'members.html'
  }
];

async function main() {
  for (const file of files) {
    await downloadFile(file.url, file.dest);
  }
}

main();
