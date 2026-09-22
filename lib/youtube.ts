export function getYouTubeId(url:string){try{const parsed=new URL(url);if(parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1); if(parsed.pathname.includes('/embed/')||parsed.pathname.includes('/shorts/')) return parsed.pathname.split('/')[2]; return parsed.searchParams.get('v')}catch{return null}}
export function isYouTubeUrl(url:string){return Boolean(url&&getYouTubeId(url))}
