import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are a Splashfeed (social media like Twitter) thread generator for the Corefall esports world. Generate realistic social media posts from various personas discussing the given topic.

COREFALL CONTEXT:
- Current Season: 709
- Major Tournaments: Apex (biggest), Heartland, Chaos Reigns, Heritage, Solar Summit, Nightmare Summit, Malice Summit, Descent
- Top Players: Cascade Juner (Damage, 2 Apex titles, 5 majors), Zeus Ziki (Qalf), Rain Lieryon (Gastro, 6 majors), Heal Calofloure (Limium), Nothing Sawryr (Cal Hal, 4 majors), Juno Alawe (Damage), Bat Bornoil (Qalf)
- Teams: Damage, Qalf, Gastro, Cal Hal, Engery, Limium, Dashlol, Heatwave, Armsoo, Titan
- Recent Events S709: Cascade Juner won Descent, Nothing Sawryr won Solar Summit, Cascade Juner is Season Star
- Historical Context: Rain Lieryon dominated 701-706, Cascade Juner rising since 707

PERSONAS TO USE (mix 4-8 of these):
- @CorefallInsider (verified analyst)
- @ApexWatcher (verified stats account)
- @SplashStats (data/numbers focus)
- @DamageOfficial (team account, verified)
- @TeamQalf (team account, verified)
- Random fan accounts with creative names like @cascade_stan, @rain_goat_fr, @apex_addict_709, @qalf_nation, etc.
- Hot take artists with dramatic opinions
- Nostalgic fans who reference old seasons

RESPONSE FORMAT (JSON array):
[
  {
    "handle": "@username",
    "displayName": "Display Name",
    "verified": false,
    "content": "Post content with #hashtags and @mentions",
    "likes": 1234,
    "reposts": 234,
    "replies": 45,
    "isReply": false,
    "replyTo": null
  }
]

Guidelines:
- Make posts feel authentic with typos, slang, emojis, hot takes
- Include relevant hashtags like #Apex709, #CorefallTwitter, #GOAT
- Vary engagement numbers realistically (viral posts get more)
- Include 1-2 reply chains for drama
- Mix serious analysis with casual fan banter
- Reference real player stats and tournament results
- Keep posts 1-3 sentences each`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating Splashfeed thread for prompt:', prompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a Splashfeed thread about: ${prompt}` }
        ],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required, please add funds to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from AI');
    }

    console.log('Raw AI response:', content);

    // Parse the JSON from the response (handle markdown code blocks)
    let posts;
    try {
      let jsonStr = content;
      // Remove markdown code blocks if present
      if (jsonStr.includes('```')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      posts = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('Failed to parse thread data');
    }

    return new Response(JSON.stringify({ posts }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-splashfeed function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
