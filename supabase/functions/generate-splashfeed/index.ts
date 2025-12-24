import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are a Splashfeed (social media like Twitter) thread generator for the Corefall esports world. Generate realistic social media posts from various personas discussing the given topic.

IMPORTANT: You MUST use accurate player data from the context below. Do not invent stats or tournament wins.

COREFALL CONTEXT:
- Current Season: 709
- Major Tournaments (11 per season): Apex (biggest, most prestigious), Heritage, Descent, Malice, Nightmare, Solar, Heartland, Wind Breakers, Armageddon, New Life, Chaos Reigns
- CTT: Champion Team Tournament (team-based, not individual major)

TOP PLAYERS WITH ACCURATE STATS:
- Cascade Juner (Damage, Age 30): 15 total trophies, 2 Apex titles (707, 708), 2 CTT wins, 11 majors. Current Season Star 707 & 708. Won Descent 709. Rising superstar since 707.
- Rain Lieryon (Dashlol, Age 34): 14 total trophies, 2 Apex titles (702, 704), 0 CTT, 12 majors. Dominated 701-706 era. Declining but still top 25 in 709.
- Jungle Unovo (Cal Hal, Age 33): 12 total trophies, 2 Apex titles (703, 706), 1 CTT, 9 majors. Elite veteran, retired-ish pace.
- Night Corondolo (retired): 8 trophies, 0 Apex, 4 CTT, 4 majors. Gastro dynasty member.
- Heal Calofloure (Limium, Age 31): 7 trophies, 1 Apex (705), 6 majors. Consistent elite player.
- Zeus Ziki (Cal Hal, Age 30): 6 trophies, 0 Apex, 1 CTT, 5 majors. Season Star 708.
- Pheonix Oliv (retired): 6 trophies, 1 Apex (701), 5 majors. Early 700s legend.
- Killa Binbac (Qalf, Age 31): 5 trophies, 0 Apex, 1 CTT, 4 majors.
- Nothing Sawryr (Gastro, Age 28): 4 trophies, 0 Apex, 0 CTT, 4 majors (Solar 708, 709, Malice 707, Nightmare 706). Rising star, ranked #2 in S709.
- Wraith Cunelly (Engery, Age 29): 5 trophies. Won Chaos Reigns 709.
- Bat Bornoil (Damage, Age 27): 3 trophies, 2 CTT, 1 major.
- Vampire Ortez (Dashlol, Age 27): 2 majors. Lost Apex 708 finals.
- Daredevil Gaffe (Qalf, Age 24): 1 major (Heartland 709). Young rising star ranked #4 in S709.
- Mega Hawnnon (Dashlol, Age 27): 1 major. Ranked #3 in S709.

TEAMS (S709 standings order):
1. Damage (3850 pts) - Cascade Juner, Bat Bornoil
2. Qalf (3200 pts) - Daredevil Gaffe, Rem Asamtoy, Fisher Cerzonal
3. Dashlol (2950 pts) - Mega Hawnnon, Vampire Ortez, Rain Lieryon
4. Gastro (2800 pts) - Nothing Sawryr, Supernova Aloi
5. Engery (2250 pts) - Wraith Cunelly, Game Darwonn
6. Limium (2200 pts) - Heal Calofloure, Titan Aui
7. Cal Hal (1950 pts) - Zeus Ziki, Cross Exzona

S709 RECENT EVENTS:
- Cascade Juner won Descent 709
- Nothing Sawryr won Solar Summit 709
- Vampire Ortez won Heritage 709
- Daredevil Gaffe won Heartland 709
- Wraith Cunelly won Chaos Reigns 709
- Cascade Juner leads standings with 1650 pts, Nothing Sawryr 2nd with 1550 pts

APEX HISTORY (most prestigious tournament):
- 708: Cascade Juner beat Vampire Ortez
- 707: Cascade Juner beat Wraith Cunelly
- 706: Jungle Unovo beat Cascade Juner
- 705: Heal Calofloure beat Killa Binbac
- 704: Rain Lieryon beat Jungle Unovo
- 703: Jungle Unovo beat Night Corondolo
- 702: Rain Lieryon beat Jungle Unovo
- 701: Pheonix Oliv beat Rain Lieryon
- 700: Splash Gradey beat Monster Piccoloo

PERSONAS TO USE (mix 4-8 of these):
- @CorefallInsider (verified analyst)
- @ApexWatcher (verified stats account)
- @SplashStats (data/numbers focus)
- @DamageOfficial (team account, verified)
- @TeamQalf (team account, verified)
- @GastroNation (team account)
- Random fan accounts with creative names based on the topic
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
    "replyTo": null,
    "poll": null
  }
]

POLL FORMAT (include 1-2 polls per thread when the topic suits debate/voting):
{
  "poll": {
    "question": "Who wins Apex 709?",
    "options": [
      { "text": "Cascade Juner", "votes": 4521 },
      { "text": "Nothing Sawryr", "votes": 2134 },
      { "text": "Vampire Ortez", "votes": 1876 },
      { "text": "Dark horse pick", "votes": 892 }
    ],
    "totalVotes": 9423,
    "hoursLeft": 18
  }
}

CRITICAL GUIDELINES:
- ONLY reference stats, wins, and facts that are in the context above
- Make posts feel authentic with typos, slang, emojis, hot takes
- Include relevant hashtags like #Apex709, #CorefallTwitter, #GOAT
- Vary engagement numbers realistically (viral posts get more)
- Include 1-2 reply chains for drama
- Mix serious analysis with casual fan banter
- Keep posts 1-3 sentences each
- Include 1-2 POLLS when the topic invites community voting (GOAT debates, predictions, opinions)
- Polls should have 2-4 options with realistic vote distributions
- The prompt from the user should be the MAIN TOPIC of discussion - stay focused on it`;

const replySystemPrompt = `You are a Splashfeed reply thread generator. Given an original post, generate 3-5 realistic reply posts that respond to it.

Use the same COREFALL CONTEXT as the main thread - only reference accurate stats and facts.

COREFALL QUICK REFERENCE:
- Cascade Juner: 15 trophies, 2 Apex (707, 708), current #1
- Rain Lieryon: 14 trophies, 2 Apex (702, 704), declining
- Nothing Sawryr: 4 trophies, #2 in S709, rising star
- Jungle Unovo: 12 trophies, 2 Apex (703, 706)
- Current Season: 709

RESPONSE FORMAT (JSON array):
[
  {
    "handle": "@username",
    "displayName": "Display Name",
    "verified": false,
    "content": "Reply content",
    "likes": 234,
    "reposts": 12,
    "replies": 5,
    "isReply": true,
    "replyTo": "@originalHandle",
    "poll": null
  }
]

Make replies feel authentic - some agreeing, some disagreeing, some joking. Mix fan accounts with analyst accounts.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, generateReplies, originalPost } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const isReplyGeneration = generateReplies && originalPost;
    
    console.log(isReplyGeneration 
      ? `Generating replies to post by ${originalPost.handle}` 
      : `Generating Splashfeed thread for prompt: ${prompt}`
    );

    const messages = isReplyGeneration 
      ? [
          { role: 'system', content: replySystemPrompt },
          { role: 'user', content: `Generate replies to this post:\n\nFrom: ${originalPost.displayName} (${originalPost.handle})\nContent: "${originalPost.content}"` }
        ]
      : [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a Splashfeed thread about: ${prompt}` }
        ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
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
