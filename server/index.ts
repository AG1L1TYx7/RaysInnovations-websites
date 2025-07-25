import { createServer } from 'vite';
import path from 'path';

const PORT = parseInt(process.env.PORT || '5000', 10);

async function startServer() {
  // Use Vite's built-in dev server directly with proper config
  const vite = await createServer({
    root: path.resolve(process.cwd(), 'client'),
    server: {
      port: PORT,
      host: true,
      strictPort: true,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '5c5fff5d-b160-4e5c-a653-7a793fa483d2-00-3i1ern9mvw8v4.picard.replit.dev'
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'client/src'),
        '@assets': path.resolve(process.cwd(), 'attached_assets'),
        '@shared': path.resolve(process.cwd(), 'shared'),
      },
    },
  });

  await vite.listen();
  console.log(`🚀 Vite dev server running on http://0.0.0.0:${PORT}`);
}

startServer().catch(console.error);