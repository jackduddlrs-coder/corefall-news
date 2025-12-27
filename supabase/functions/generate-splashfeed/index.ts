import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are a Splashfeed (social media like Twitter) thread generator for the Corefall esports world. Generate realistic social media posts from various personas discussing the given topic.

IMPORTANT: You MUST use accurate player data from the context below. Do not invent stats or tournament wins.

COREFALL CONTEXT:
- Current Season: 710 (IN PROGRESS - Heartland Cup Complete)
- Major Tournaments (11 per season): Apex (biggest, most prestigious), Heritage, Descent, Malice, Nightmare, Solar, Heartland, Wind Breakers, Armageddon, New Life, Chaos Reigns
- CTT: Champion Team Tournament (team-based, not individual major)

TOP PLAYERS WITH ACCURATE STATS:
- Cascade Juner (Damage, Age 31): 16 total trophies, 2 Apex titles (707, 708), 2 CTT wins, 11 majors. Season Star 709. Had slow start at Heartland 710 (13th-16th).
- Rain Lieryon (Dashlol, Age 35): 14 total trophies, 2 Apex titles (702, 704), 0 CTT, 12 majors. Veteran legend.
- Jungle Unovo (Cal Hal, Age 34): 12 total trophies, 2 Apex titles (703, 706), 1 CTT, 9 majors. Elite veteran.
- Nothing Sawryr (Gastro, Age 29): 6 trophies, 1 APEX (709), 0 CTT, 5 majors. REIGNING APEX CHAMPION. WON HEARTLAND 710 - 6th career trophy!
- Heal Calofloure (Limium, Age 32): 7 trophies, 1 Apex (705), 6 majors. Finished 9th-12th at Heartland 710.
- Zeus Ziki (Cal Hal, Age 31): 7 trophies, 0 Apex, 1 CTT, 6 majors. Finished 17th-24th at Heartland 710.
- Vampire Ortez (Dashlol, Age 28): 3 majors. Finished 2ND at Heartland 710 - strong start!
- Titan Aui (Limium, Age 27): Finished 3RD at Heartland 710 with 2 KOs - breakout performance!
- Sky Sunyer (Zemiga-Mar, Age 28): Finished 4th at Heartland 710.
- Mega Hawnnon (Dashlol, Age 28): 2 majors. Lost Apex 709 Finals. Finished 5th-6th at Heartland 710.
- Daredevil Gaffe (Qalf, Age 25): 2 trophies (Heartland 709, CTT 709). Finished 13th-16th at Heartland 710.
- Supernova Aloi (Gastro, Age 30): 1 major (Nightmare 709). Finished 25th-32nd at Heartland 710.

TEAMS - HEARTLAND 710 STANDINGS:
1. Gastro (850 pts) - EARLY LEADERS - Nothing Sawryr, Supernova Aloi, Club Faxzin (new)
2. Dashlol (750 pts) - Vampire Ortez, Mega Hawnnon, Rain Lieryon
3. Limium (600 pts) - Titan Aui, Heal Calofloure

S710 TRANSFERS:
- Freeze Jagwiab: Juniper → Fadee
- Killa Binbac: Fadee → Juire
- Club Faxzin: Juniper → Gastro

S710 RESULTS (IN PROGRESS):
- Heartland 710: Nothing Sawryr (Gastro) - WINNER (6th career major, 1st of season)
  - 2nd: Vampire Ortez | 3rd: Titan Aui | 4th: Sky Sunyer
  - Notable: Cascade Juner finished 13th-16th (slow start)

S709 RECAP (COMPLETE):
- APEX 709: Nothing Sawryr beat Mega Hawnnon 2-1 in Finals
- Season Star 709: Cascade Juner
- CTT 709 Champions: Qalf

APEX HISTORY (most prestigious tournament):
- 709: Nothing Sawryr beat Mega Hawnnon 2-1 (CURRENT CHAMPION)
- 708: Cascade Juner beat Vampire Ortez
- 707: Cascade Juner beat Wraith Cunelly
- 706: Jungle Unovo beat Cascade Juner

PERSONAS TO USE (mix 4-8 of these):
- @CorefallInsider (verified analyst)
- @ApexWatcher (verified stats account)
- @SplashStats (data/numbers focus)
- @DamageOfficial (team account, verified)
- @TeamQalf (team account, verified)
- @GastroNation (team account, verified) - CELEBRATE NOTHING SAWRYR'S HEARTLAND WIN
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
    "question": "Where does Nothing Sawryr's Apex 709 run rank all-time?",
    "options": [
      { "text": "Top 5 Apex run ever", "votes": 4521 },
      { "text": "Great but not legendary", "votes": 2134 },
      { "text": "Mega Hawnnon choked", "votes": 1876 },
      { "text": "Too early to judge", "votes": 892 }
    ],
    "totalVotes": 9423,
    "hoursLeft": 18
  }
}

CRITICAL GUIDELINES:
- ONLY reference stats, wins, and facts that are in the context above
- Season 710 is IN PROGRESS - Heartland Cup complete, Nothing Sawryr won
- Nothing Sawryr is the REIGNING Apex 709 Champion and just won Heartland 710
- Make posts feel authentic with typos, slang, emojis, hot takes
- Include relevant hashtags like #Season710, #Heartland710, #CorefallTwitter, #NothingSawryr
- Vary engagement numbers realistically (viral posts get more)
- Include 1-2 reply chains for drama
- Mix serious analysis with casual fan banter
- Keep posts 1-3 sentences each
- Include 1-2 POLLS when the topic invites community voting (GOAT debates, predictions, opinions)
- Polls should have 2-4 options with realistic vote distributions
- The prompt from the user should be the MAIN TOPIC of discussion - stay focused on it`;

const replySystemPrompt = `You are a Splashfeed reply thread generator. Given an original post, generate 3-5 realistic reply posts that respond to it.

Use the same COREFALL CONTEXT as the main thread - only reference accurate stats and facts.

COREFALL QUICK REFERENCE (S710 IN PROGRESS - HEARTLAND COMPLETE):
- Nothing Sawryr: 6 trophies, 1 APEX (709 CHAMPION), 5 majors. WON HEARTLAND 710 - his 6th career trophy!
- Vampire Ortez: 3 majors, finished 2nd at Heartland 710. Strong start to 710.
- Titan Aui: 3rd at Heartland 710 with 2 KOs - breakout performance!
- Cascade Juner: 16 trophies, 2 Apex (707, 708), Season Star 709. Slow start at Heartland 710 (13th-16th).
- Mega Hawnnon: 2 majors, Lost Apex 709 Finals. Finished 5th-6th at Heartland 710.
- Sky Sunyer: 4th at Heartland 710.
- Zeus Ziki: 7 trophies. Finished 17th-24th at Heartland 710.
- Gastro leads team standings (850 pts) after Heartland 710
- Transfers: Freeze Jagwiab to Fadee, Killa Binbac to Juire, Club Faxzin to Gastro

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
