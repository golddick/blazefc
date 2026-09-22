import { players, competitions, matches, posts, enquiries, trials, albums, adminUsers } from './mock-data'
export async function getPlayers(){return players}
export async function getPlayerBySlug(slug:string){return players.find(p=>p.slug===slug)}
export async function getCompetitions(){return competitions}
export async function getMatches(){return matches}
export async function getPosts(){return posts}
export async function getEnquiries(){return enquiries}
export async function getTrials(){return trials}
export async function getAlbums(){return albums}
export async function getAdminUsers(){return adminUsers}
