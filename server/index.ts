import { createServer } from 'vite';
import path from 'path';

const PORT = parseInt(process.env.PORT || '5000', 10);

async function startServer() {
  // Use Vite's built-in dev server directly with proper config
  const vite = await createServer({
    root: path.resolve(process.cwd(), 'client'),
    server: {
      port: PORT,
      host: '0.0.0.0',
      strictPort: true,
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