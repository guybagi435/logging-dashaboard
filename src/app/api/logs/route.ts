import { NextResponse } from 'next/server';

function corsResponse(response: Response) {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const response = await fetch('https://njwinkshi5hyldkqq4srpuoxrm0weqer.lambda-url.us-east-1.on.aws', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(`body is ${JSON.stringify(body)}`)
    const data = await response.json();
    
    return corsResponse(new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));
  } catch (error) {
    console.error('API Error:', error);

    return corsResponse(new NextResponse(
      JSON.stringify({ error: 'Failed to fetch logs' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ));
  }
}