export type Position = 'GK' | 'DEF' | 'MID' | 'FWD'
export type PlayerStatus = 'active' | 'alumni' | 'trial'
export type CompetitionStatus = 'upcoming' | 'ongoing' | 'completed'
export interface Player { id:string; slug:string; firstName:string; lastName:string; dateOfBirth:string; position:Position; positionText:string; jerseyNumber:number; preferredFoot:'Left'|'Right'; heightCm:number; weightKg:number; nationality:string; photoUrl:string; bio:string; highlightVideoUrl:string; ageGroup:string; status:PlayerStatus; isPublic:boolean }
export interface Competition { id:string; slug:string; name:string; season:string; type:'league'|'cup'|'tournament'; status:CompetitionStatus; startDate:string; endDate:string }
export interface Match { id:string; slug:string; competitionId:string; date:string; opponent:string; homeOrAway:'Home'|'Away'; scoreFor:number|null; scoreAgainst:number|null; youtubeUrl:string; report:string; venue:string }
export interface Post { id:string; slug:string; title:string; body:string; coverImageUrl:string; type:'news'|'report'; publishedAt:string; relatedMatchId?:string }
export interface Enquiry { id:string; name:string; email:string; phone:string; message:string; playerId?:string; status:'new'|'handled'; createdAt:string }
export interface TrialApplication { id:string; applicantName:string; dateOfBirth:string; position:Position; guardianName:string; contactEmail:string; contactPhone:string; message:string; status:'new'|'reviewing'|'invited'|'declined'; createdAt:string }
export interface AdminUser { id:string; name:string; email:string; role:'admin'|'coach'|'editor' }
export interface Coach { id:string; name:string; role:string; team:string; bio:string; photoUrl:string; isActive:boolean }
export interface GalleryVideo { id:string; albumId:string; title:string; url:string; thumbnailUrl:string; duration:string }
export interface ProjectSchema { entities:string[]; relationships:string[]; publicRoutes:string[]; adminSections:string[] }
export interface PlayerStat { playerId:string; matchId:string|null; season:string; appearances:number; goals:number; assists:number; minutes:number; yellowCards:number; redCards:number; cleanSheets:number; saves:number }
export interface GalleryAlbum { id:string; slug:string; title:string; date:string; coverImageUrl:string; imageCount:number }
export interface GalleryImage { id:string; albumId:string; url:string; caption:string }
export interface PlayerCompetition { playerId:string; competitionId:string }
export interface MatchPlayer { matchId:string; playerId:string; minutes:number; goals:number; assists:number }

export const playerImage = '/blaze-player.png'
export const photo = (seed:number) => `https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=900&q=80&sig=${seed}`
