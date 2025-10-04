import { serverSupabaseClient } from "#supabase/server";

import shuffle from 'lodash/shuffle.js';
import chunk from 'lodash/chunk.js';

export default defineEventHandler(async (event) => {
  console.warn("Running match up API");

  const client = await serverSupabaseClient(event);
  const teamOptions = await client.from('game-teams').select('*');

  const sportOptions = await client.from('game-sports').select('*');


  // FIXME I hate this code, but it does work...
  // Work out a less janky implementation later
  // In particular we should probs be doing DB view stuff elsewhere,
  // instead of looking through JS arrays manually like this
  const randomisedTeamOptions = shuffle(teamOptions.data);
  const pairedOff = chunk(randomisedTeamOptions, 2);

  // TODO PROPERLY HANDLE ODD TEAM NUMBER CASE
  const byeTeam = pairedOff.find(p => p.length === 1);
  const bye = byeTeam ? { name: byeTeam[0].name, nativeSport: sportOptions.data.find(s => byeTeam[0].sport === s.id) } : null;
  //console.log("Bye granted to: %o", bye)

  const matchUps = pairedOff
    .filter(p => p.length === 2)
    .map(([t1, t2]) => ({
    teamOne: {
      name: t1.name,
      nativeSport: sportOptions.data.find(s => t1.sport === s.id).name
    },
    teamTwo: {
      name: t2.name,
      nativeSport: sportOptions.data.find(s => t2.sport === s.id).name
    },
    sport: shuffle(sportOptions.data)[0].name
  }))

  return { matchUps, bye };
})
