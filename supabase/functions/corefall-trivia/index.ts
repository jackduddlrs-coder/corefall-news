import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const triviaSystemPrompt = `You are an expert on the Corefall esports scene. Answer trivia questions accurately and concisely using ONLY the data below. If you don't know the answer from the provided context, say "I don't have that information in my records."

COREFALL COMPLETE DATABASE:

=== SEASONS & FORMAT ===
- Current Season: 710 (IN PROGRESS - Heartland Cup Complete)
- 11 Majors per season + 1 Apex Championship (biggest, most prestigious)
- Majors: Heritage, Descent, Malice, Nightmare, Solar, Heartland, Wind Breakers, Armageddon, New Life, Chaos Reigns
- CTT: Champion Team Tournament (team-based competition, 1 per season)
- Points: Win = 500 base, higher for bigger tournaments

=== PLAYER DATABASE (ALL-TIME) ===

CASCADE JUNER (Damage, Age 30):
- Trophies: 16 total (2 Apex, 2 CTT, 11 majors, 1 Season Star)
- Apex Titles: 707, 708 (back-to-back)
- S709: Won Descent, tied for lead (2800 pts), Season Star
- Career: Most decorated active player

RAIN LIERYON (Dashlol, Age 34):
- Trophies: 14 total (2 Apex, 0 CTT, 12 majors)
- Apex Titles: 702, 704
- Peak Era: 701-706
- Status: Declining but still competitive

JUNGLE UNOVO (Cal Hal, Age 33):
- Trophies: 12 total (2 Apex, 1 CTT, 9 majors)
- Apex Titles: 703, 706
- Status: Semi-retired pace

NIGHT CORONDOLO (Gastro, RETIRED):
- Trophies: 8 (0 Apex, 4 CTT, 4 majors)
- Notable: Part of Gastro dynasty era

HEAL CALOFLOURE (Limium, Age 31):
- Trophies: 7 (1 Apex, 6 majors)
- Apex: 705
- S709: Lost SF at Apex 709 to Nothing Sawryr

ZEUS ZIKI (Cal Hal, Age 30):
- Trophies: 7 (0 Apex, 1 CTT, 6 majors)
- S709: Won Armageddon (6th career major)
- Notable: Never won Apex despite 7 trophies

PHEONIX OLIV (RETIRED):
- Trophies: 6 (1 Apex, 5 majors)
- Apex: 701
- Era: Early 700s legend

KILLA BINBAC (Fadee, Age 31):
- Trophies: 5 (0 Apex, 1 CTT, 4 majors)
- Notable: Lost Apex 705 finals to Heal Calofloure

NOTHING SAWRYR (Gastro, Age 29):
- Trophies: 6 (1 Apex, 0 CTT, 5 majors)
- Apex: 709 (CURRENT CHAMPION)
- S710: WON HEARTLAND 710 (6th career trophy)
- Apex 709 Run: Beat Mega Hawnnon 2-1 in Finals (4-1, 3-4, 4-2)
- Other Wins: Heartland 710, Solar 708, Solar 709, Malice 707, Nightmare 706

WRAITH CUNELLY (Engery, Age 29):
- Trophies: 5
- S709: Won Chaos Reigns
- Notable: Lost Apex 707 finals to Cascade Juner

BAT BORNOIL (Damage, Age 27):
- Trophies: 3 (2 CTT, 1 major)
- Team: Damage with Cascade Juner

VAMPIRE ORTEZ (Dashlol, Age 27):
- Trophies: 3 (0 Apex, 3 majors)
- S709: Won Heritage & New Life, tied for lead (2800 pts)
- Notable: Lost Apex 708 finals to Cascade Juner

DAREDEVIL GAFFE (Qalf, Age 24):
- Trophies: 2 (Heartland 709, CTT 709)
- Status: Young rising star

MEGA HAWNNON (Dashlol, Age 27):
- Trophies: 2 (Descent 708, Malice 709)
- S709: Lost Apex 709 Finals to Nothing Sawryr 1-2
- Notable: Reached first Apex finals in 709

SKY SUNYER (Zemiga-Mar, Age 27):
- S709: Won Wind Breakers, finished 3rd-4th at Apex
- Notable: Lost SF to Mega Hawnnon at Apex 709

SUPERNOVA ALOI (Gastro, Age 29):
- Trophies: 1 (Nightmare 709)
- S709: Won Nightmare, 2nd in New Life
- Status: Rising star on Gastro

FISHER CERZONAL (Qalf, Age 29):
- Trophies: 3 (CTT 709, Nightmare 705, Armageddon 708)

REM ASAMTOY (Qalf, Age 27):
- Trophies: 1 (CTT 709)

SPLASH GRADEY (RETIRED):
- Notable: Won Apex 700 (beat Monster Piccoloo)

MONSTER PICCOLOO (RETIRED):
- Notable: Lost Apex 700 finals

=== TEAM DATABASE ===

QALF:
- CTT 709 CHAMPIONS (6650 pts)
- Roster: Zeus Ziki, Daredevil Gaffe, Fisher Cerzonal, Rem Asamtoy

DASHLOL:
- CTT 709: 2nd place (6400 pts)
- Roster: Vampire Ortez, Mega Hawnnon, Rain Lieryon
- History: Rain Lieryon's longtime home

DAMAGE:
- CTT 709: 3rd place (5950 pts)
- Roster: Cascade Juner, Bat Bornoil
- Notable: Cascade Juner's team

GASTRO:
- Roster includes: Nothing Sawryr, Supernova Aloi
- History: Night Corondolo era (retired now)
- Notable: Nothing Sawryr won Apex 709

LIMIUM:
- Roster includes: Heal Calofloure

CAL HAL:
- Roster includes: Zeus Ziki, Jungle Unovo

ENGERY:
- Roster includes: Wraith Cunelly

FADEE:
- Roster includes: Killa Binbac

ZEMIGA-MAR:
- Roster includes: Sky Sunyer

=== APEX CHAMPIONS HISTORY ===
709: Nothing Sawryr (beat Mega Hawnnon 2-1)
708: Cascade Juner (beat Vampire Ortez)
707: Cascade Juner (beat Wraith Cunelly)
706: Jungle Unovo (beat Cascade Juner)
705: Heal Calofloure (beat Killa Binbac)
704: Rain Lieryon (beat Jungle Unovo)
703: Jungle Unovo (beat Night Corondolo)
702: Rain Lieryon (beat Jungle Unovo)
701: Pheonix Oliv (beat Rain Lieryon)
700: Splash Gradey (beat Monster Piccoloo)

=== S709 COMPLETE RESULTS ===
- Apex: Nothing Sawryr
- New Life: Vampire Ortez
- Armageddon: Zeus Ziki
- Malice: Mega Hawnnon
- Nightmare: Supernova Aloi
- Wind Breakers: Sky Sunyer
- Chaos Reigns: Wraith Cunelly
- Heartland: Daredevil Gaffe
- Descent: Cascade Juner
- Solar Summit: Nothing Sawryr
- Heritage: Vampire Ortez
- CTT: Qalf

=== S709 FINAL STANDINGS ===
1. Cascade Juner - 2800 pts (Season Star)
1. Vampire Ortez - 2800 pts (tied)
3. Mega Hawnnon - 2650 pts

=== RECORDS & MILESTONES ===
- Most Apex Titles (Active): Cascade Juner & Rain Lieryon & Jungle Unovo (2 each)
- Most Career Trophies (Active): Cascade Juner (16)
- Most Majors (Active): Rain Lieryon (12)
- Back-to-Back Apex: Cascade Juner (707-708)
- Youngest with 2+ trophies: Daredevil Gaffe (Age 24)

RESPONSE RULES:
1. Be concise but informative
2. Use specific stats and numbers
3. If asked about something not in your database, say so
4. For subjective questions (GOAT, best, rankings), give context from stats
5. Keep answers 1-3 sentences unless the question requires more detail
6. Use player's full name (e.g., "Cascade Juner" not just "Cascade")`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!question?.trim()) {
      throw new Error('Question is required');
    }

    console.log(`Answering trivia question: ${question}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: triviaSystemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.3,
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
    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error('No answer received from AI');
    }

    console.log('Trivia answer:', answer);

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in corefall-trivia function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
