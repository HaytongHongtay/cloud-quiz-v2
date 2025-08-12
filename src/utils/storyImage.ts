export async function makeStoryImage({ title, desc, emoji, palette, quizId }: {
    title: string; desc: string; emoji: string; palette: { bg: string; fg: string }; quizId: string;
  }): Promise<Blob> {
    const w = 1080, h = 1920;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d')!;
  
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#E0F2FE');
    grad.addColorStop(1, palette.bg);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
  
    function blob(x: number, y: number, r: number, a = 0.7) {
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    blob(200, 260, 180, 0.6); blob(360, 220, 140, 0.5); blob(800, 300, 180, 0.55);
    blob(900, 1480, 220, 0.45); blob(200, 1620, 200, 0.5);
  
    ctx.fillStyle = palette.fg; ctx.textAlign = 'center';
    ctx.font = '700 120px system-ui, -apple-system, Segoe UI, Inter, Arial';
    ctx.fillText(`${emoji} ${title}`, w/2, 640);
  
    const lines = wrapText(ctx, desc, w - 200, '400 48px system-ui');
    let y = 760; ctx.fillStyle = '#0f172a';
    for (const line of lines) { ctx.font = '400 48px system-ui'; ctx.fillText(line, w/2, y); y += 64; }
  
    ctx.font = '600 36px system-ui'; ctx.fillStyle = '#0369a1';
    ctx.fillText('#CloudType • ' + quizId, w/2, h - 100);
  
    return await new Promise((res) => canvas.toBlob(b => res(b!), 'image/png'));
  }
  
  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, font: string) {
    ctx.font = font; const words = text.split(' '); const lines: string[] = []; let current = '';
    for (const w of words) {
      const test = current ? current + ' ' + w : w;
      const { width } = ctx.measureText(test);
      if (width > maxWidth && current) { lines.push(current); current = w; } else { current = test; }
    }
    if (current) lines.push(current); return lines;
  }