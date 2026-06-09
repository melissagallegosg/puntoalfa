import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GSC_REFRESH_TOKEN!;
const PROPERTY      = process.env.GSC_PROPERTY!;

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type:    'refresh_token',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('No access token: ' + JSON.stringify(data));
  return data.access_token;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '28');

    const endDate   = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    const fmt = (d: Date) => d.toISOString().split('T')[0];

    const token = await getAccessToken();

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const base = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY)}/searchAnalytics/query`;

    // 1. Resumen general
    const summaryRes = await fetch(base, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        startDate: fmt(startDate),
        endDate:   fmt(endDate),
        dimensions: [],
      }),
    });
    const summary = await summaryRes.json();

    // 2. Top keywords
    const keywordsRes = await fetch(base, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        startDate:  fmt(startDate),
        endDate:    fmt(endDate),
        dimensions: ['query'],
        rowLimit:   10,
        orderBy:    [{ field: 'clicks', sortOrder: 'DESCENDING' }],
      }),
    });
    const keywords = await keywordsRes.json();

    // 3. Tendencia diaria
    const trendRes = await fetch(base, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        startDate:  fmt(startDate),
        endDate:    fmt(endDate),
        dimensions: ['date'],
        rowLimit:   90,
      }),
    });
    const trend = await trendRes.json();

    return NextResponse.json({
      summary: summary.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      keywords: keywords.rows || [],
      trend: trend.rows || [],
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 's-maxage=3600',
      }
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
