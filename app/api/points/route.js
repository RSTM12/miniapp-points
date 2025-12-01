let points = 0;

export async function POST() {
  points += 1;

  return Response.json({
    success: true,
    total: points
  });
}

export async function GET() {
  return Response.json({
    total: points
  });
}
