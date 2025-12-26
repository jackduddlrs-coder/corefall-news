import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are a Splashfeed (social media like Twitter) thread generator for the Corefall esports world. Generate realistic social media posts from various personas discussing the given topic.

IMPORTANT: You MUST use accurate player data from the context below. Do not invent stats or tournament wins.

COREFALL CONTEXT:
- Current Season: 709 (COMPLETE)
- Major Tournaments (11 per season): Apex (biggest, most prestigious), Heritage, Descent, Malice, Nightmare, Solar, Heartland, Wind Breakers, Armageddon, New Life, Chaos Reigns
- CTT: Champion Team Tournament (team-based, not individual major)

TOP PLAYERS WITH ACCURATE STATS:
- Cascade Juner (Damage, Age 30): 16 total trophies, 2 Apex titles (707, 708), 2 CTT wins, 11 majors. Season Star 709. Won Descent 709. Tied for S709 lead with 2800 pts.
- Rain Lieryon (Dashlol, Age 34): 14 total trophies, 2 Apex titles (702, 704), 0 CTT, 12 majors. Dominated 701-706 era. Declining but still competitive in 709.
- Jungle Unovo (Cal Hal, Age 33): 12 total trophies, 2 Apex titles (703, 706), 1 CTT, 9 majors. Elite veteran, retired-ish pace.
- Night Corondolo (retired): 8 trophies, 0 Apex, 4 CTT, 4 majors. Gastro dynasty member.
- Heal Calofloure (Limium, Age 31): 7 trophies, 1 Apex (705), 6 majors. Consistent elite player. Lost SF at Apex 709.
- Zeus Ziki (Cal Hal, Age 30): 7 trophies, 0 Apex, 1 CTT, 6 majors. Won Armageddon 709 for 6th career major.
- Pheonix Oliv (retired): 6 trophies, 1 Apex (701), 5 majors. Early 700s legend.
- Killa Binbac (Fadee, Age 31): 5 trophies, 0 Apex, 1 CTT, 4 majors.
- Nothing Sawryr (Gastro, Age 28): 5 trophies, 1 APEX (709), 0 CTT, 4 majors. WON APEX 709 defeating Mega Hawnnon 2-1 in Finals. Also won Solar 708, Solar 709, Malice 707, Nightmare 706.
- Wraith Cunelly (Engery, Age 29): 5 trophies. Won Chaos Reigns 709.
- Bat Bornoil (Damage, Age 27): 3 trophies, 2 CTT, 1 major.
- Vampire Ortez (Dashlol, Age 27): 3 majors (Heritage 709, New Life 709). Won New Life 709 for 3rd career major. Tied for S709 lead with 2800 pts. Lost Apex 708 finals.
- Daredevil Gaffe (Qalf, Age 24): 2 trophies (Heartland 709, CTT 709). Young rising star.
- Mega Hawnnon (Dashlol, Age 27): 2 majors (Descent 708, Malice 709). LOST APEX 709 FINALS to Nothing Sawryr 1-2.
- Sky Sunyer (Zemiga-Mar, Age 27): Strong Apex 709 run, finished 3rd-4th. Lost SF to Mega Hawnnon.
- Supernova Aloi (Gastro, Age 29): 1 major (Nightmare 709). Won S709's Nightmare. Finished 2nd in New Life 709. Rising star on Gastro.
- Fisher Cerzonal (Qalf, Age 29): 3 trophies (CTT 709, Nightmare 705, Armageddon 708). Part of Qalf's CTT winning team.
- Rem Asamtoy (Qalf, Age 27): 1 trophy (CTT 709). Part of Qalf's CTT winning team.

TEAMS - CTT 709 FINAL STANDINGS:
1. Qalf (6650 pts) - CTT 709 CHAMPIONS - Zeus Ziki, Daredevil Gaffe, Fisher Cerzonal, Rem Asamtoy
2. Dashlol (6400 pts) - Vampire Ortez, Mega Hawnnon, Rain Lieryon
3. Damage (5950 pts) - Cascade Juner, Bat Bornoil

S709 RESULTS (SEASON COMPLETE - ALL 11 majors + Apex):
- APEX 709: Nothing Sawryr (Gastro) - CHAMPION (1st APEX title, 5th career trophy). Beat Mega Hawnnon 2-1 (4-1, 3-4, 4-2) in Finals
  - SF: Nothing Sawryr beat Heal Calofloure 4-1
  - SF: Mega Hawnnon beat Sky Sunyer 4-2
  - Group A Winner: Nothing Sawryr | Group B Winner: Mega Hawnnon
- New Life 709: Vampire Ortez (Dashlol) - WINNER (3rd career major)
- Armageddon 709: Zeus Ziki (Cal Hal) - WINNER (6th career major)
- Malice Cup 709: Mega Hawnnon (Dashlol) - WINNER (2nd career major)
- Nightmare 709: Supernova Aloi (Gastro) - WINNER (1st career major)
- Wind Breakers 709: Sky Sunyer (Zemiga-Mar) - WINNER
- Chaos Reigns 709: Wraith Cunelly (Engery) - WINNER
- Heartland 709: Daredevil Gaffe (Qalf) - WINNER
- Descent 709: Cascade Juner (Damage) - WINNER
- Solar Summit 709: Nothing Sawryr (Gastro) - WINNER
- Heritage 709: Vampire Ortez (Dashlol) - WINNER

S709 FINAL INDIVIDUAL STANDINGS:
1. Cascade Juner (Damage) - 2800 pts (TIED FOR SEASON LEAD)
1. Vampire Ortez (Dashlol) - 2800 pts (TIED FOR SEASON LEAD)
3. Mega Hawnnon (Dashlol) - 2650 pts
Season Star: Cascade Juner

APEX 709 BRACKET:
- Finals: Nothing Sawryr (Gastro) 2-1 Mega Hawnnon (Dashlol) [4-1, 3-4, 4-2]
- SF: Nothing Sawryr 4-1 Heal Calofloure | Mega Hawnnon 4-2 Sky Sunyer
- Group A: Nothing Sawryr won | Sky Sunyer qualified via losers
- Group B: Mega Hawnnon won | Heal Calofloure qualified via losers

APEX HISTORY (most prestigious tournament):
- 709: Nothing Sawryr beat Mega Hawnnon 2-1 (LATEST CHAMPION)
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
- @GastroNation (team account, verified) - CELEBRATE NOTHING SAWRYR'S APEX WIN
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
- Nothing Sawryr WON Apex 709 - this is the biggest news!
- Make posts feel authentic with typos, slang, emojis, hot takes
- Include relevant hashtags like #Apex709, #CorefallTwitter, #GOAT, #NothingSawryr
- Vary engagement numbers realistically (viral posts get more)
- Include 1-2 reply chains for drama
- Mix serious analysis with casual fan banter
- Keep posts 1-3 sentences each
- Include 1-2 POLLS when the topic invites community voting (GOAT debates, predictions, opinions)
- Polls should have 2-4 options with realistic vote distributions
- The prompt from the user should be the MAIN TOPIC of discussion - stay focused on it`;

const replySystemPrompt = `You are a Splashfeed reply thread generator. Given an original post, generate 3-5 realistic reply posts that respond to it.

Use the same COREFALL CONTEXT as the main thread - only reference accurate stats and facts.

COREFALL QUICK REFERENCE (S709 COMPLETE - APEX 709 FINISHED):
- Nothing Sawryr: 5 trophies, 1 APEX (709 CHAMPION - beat Mega Hawnnon 2-1 in Finals), 4 majors. First Apex title! Gastro's new star.
- Mega Hawnnon: 2 majors, LOST Apex 709 Finals to Nothing Sawryr 1-2. Dashlol player.
- Cascade Juner: 16 trophies, 2 Apex (707, 708), Season Star 709, tied for S709 lead with 2800 pts
- Vampire Ortez: 3 majors, won New Life 709 (3rd career major), tied for S709 lead with 2800 pts
- Zeus Ziki: 7 trophies, won Armageddon 709 (6th career major)
- Sky Sunyer: Strong Apex 709 run, finished 3rd-4th. Lost SF to Mega Hawnnon.
- Heal Calofloure: 7 trophies, 1 Apex (705). Lost SF to Nothing Sawryr at Apex 709.
- Supernova Aloi: 1 major (Nightmare 709), finished 2nd in New Life 709
- Rain Lieryon: 14 trophies, 2 Apex (702, 704), declining
- Jungle Unovo: 12 trophies, 2 Apex (703, 706)
- CTT 709: Qalf WINS (6650 pts), Dashlol 2nd (6400), Damage 3rd (5950)
- Season 709 COMPLETE: All 11 majors + Apex finished. Nothing Sawryr is Apex 709 Champion!

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
