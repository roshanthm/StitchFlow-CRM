const fs = require('fs');

const files = [
  { src: '../kinetic-ledger/index.html', dest: 'app/page.tsx' },
  { src: '../kinetic-ledger/dashboard.html', dest: 'app/dashboard/page.tsx' },
  { src: '../kinetic-ledger/admin.html', dest: 'app/admin/page.tsx' },
  { src: '../kinetic-ledger/members.html', dest: 'app/members/page.tsx' }
];

let headContent = '';
let bodyClasses = '';

for (const { src, dest } of files) {
  if (!fs.existsSync(src)) continue;
  const html = fs.readFileSync(src, 'utf-8');
  
  if (!headContent) {
    const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
    if (headMatch) headContent = headMatch[1];
    
    const bodyMatch = html.match(/<body([^>]*)>/i);
    if (bodyMatch) {
      const classMatch = bodyMatch[1].match(/class="([^"]+)"/i);
      if (classMatch) bodyClasses = classMatch[1];
    }
  }

  const bodyInnerMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyInnerMatch) continue;
  let bodyInner = bodyInnerMatch[1];
  
  if (dest === 'app/page.tsx') {
    bodyInner = bodyInner.replace(/<form[\s\S]*?>/i, '<form action="/dashboard">');
  } else {
    // Basic navigation replacement:
    // We replace href="#" with proper routes based on text if possible, but for simplicity,
    // let's just make the Dashboard link point to /dashboard, Admin to /admin, Members to /members
    bodyInner = bodyInner.replace(/href="#"/g, 'href="/dashboard"');
  }
  
  const destDir = dest.split('/').slice(0, -1).join('/');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  const component = `
export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: \`${bodyInner.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />;
}
`;
  fs.writeFileSync(dest, component);
}

const newLayout = `
export const metadata = { title: 'Kinetic Ledger' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head dangerouslySetInnerHTML={{ __html: \`${headContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
      <body className="${bodyClasses}">
        {children}
      </body>
    </html>
  );
}
`;
fs.writeFileSync('app/layout.tsx', newLayout);

console.log("Conversion complete!");
