let total = 0;

export async function POST() {
  total += 1;

  return new Response(
    JSON.stringify({ total }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
