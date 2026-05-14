const fs = require('fs');
const files = ['app/page.tsx', 'app/dashboard/page.tsx', 'app/admin/page.tsx', 'app/members/page.tsx'];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<div dangerouslySetInnerHTML/g, '<div className="contents w-full h-full" suppressHydrationWarning dangerouslySetInnerHTML');
  fs.writeFileSync(file, content);
}
console.log('Fixed alignment.');
